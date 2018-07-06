const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const generateSeed = function(entropy_length, mnemonics, passphrase) {
  var response = {
    mnemonics: "",
    seed: "",
    entropy: "",
    root_key_xprv: "",
    root_key_xpub: ""
  };

  // GENERATING MNEMONICS IF REQUIRED
  response.mnemonics =
    mnemonics.length == 0 ? bip39.generateMnemonic(entropy_length) : mnemonics;

  // GENERATE SEED (128 BITS) FROM MNEMONICS
  response.seed = bip39.mnemonicToSeedHex(response.mnemonics, passphrase);
  response.entropy = bip39.mnemonicToEntropy(response.mnemonics);

  var master_node = bitcoin.HDNode.fromSeedHex(response.seed);

  response.root_key_xprv = master_node.toBase58();
  response.root_key_xpub = master_node.neutered().toBase58();

  return response;
};

const validateMnemonic = function(mnemonic, length) {
  if (
    bip39.validateMnemonic(mnemonic) &&
    mnemonic.split(" ").length == (length + length / 32) / 11
  )
    return true;
  return false;
};

module.exports = {
  generateSeed,
  validateMnemonic
};
