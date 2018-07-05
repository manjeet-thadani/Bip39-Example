const bip39 = require("bip39");
const hdkey = require("hdkey");

const generateSeed = function(entropy_length, mnemonics, passphrase) {
  var response = {
    mnemonics: "",
    seed: "",
    entropy: "",
    root_key_xprv: "",
    root_key_xpub: ""
  };

  response.mnemonics =
    mnemonics.length == 0 ? bip39.generateMnemonic(entropy_length) : mnemonics;

  response.seed = bip39.mnemonicToSeedHex(response.mnemonics, passphrase);
  response.entropy = bip39.mnemonicToEntropy(response.mnemonics);

  var root_key = hdkey.fromMasterSeed(new Buffer(response.seed, "hex"));

  response.root_key_xprv = root_key.privateExtendedKey;
  response.root_key_xpub = root_key.publicExtendedKey;

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
