const bip39Helper = require("../helpers/bip39Helper");
const bip44Helper = require("../helpers/bip44Helper");
const bip39 = require("bip39");

const generateSeed = function(req, res, next) {
  var response = { error: "", data: "" };
  var entropy_length = Number(req.body.entropy_length);
  var bip39_mnemonics = req.body.bip39_mnemonics;
  var bip39_passphrase = req.body.bip39_passphrase;

  if (
    (bip39_mnemonics.length > 0 &&
      bip39Helper.validateMnemonic(bip39_mnemonics, entropy_length)) ||
    bip39_mnemonics.length == 0
  )
    response.data = bip39Helper.generateSeed(
      entropy_length,
      bip39_mnemonics,
      bip39_passphrase
    );
  else response.error = "Invalid mnemonic";
  res.json(response);
};

const generateAddressess = function(req, res, next) {
  var response = bip44Helper.generateAddressess(
    req.body.seed,
    req.body.account_deviation_path,
    req.body.change_deviation_path,
    req.body.coin_type
  );
  res.json(response);
};

const generateMnemonic = function(req, res, next) {
  var mnemonic = bip39.generateMnemonic(req.body.entropy_length);
  res.json({ mnemonic: mnemonic });
};

const validateMnemonic = function(req, res, next) {
  var result = bip39.validateMnemonic(req.body.mnemonic);
  res.json({ result: result });
};

module.exports = {
  generateSeed,
  generateMnemonic,
  validateMnemonic,
  generateAddressess
};
