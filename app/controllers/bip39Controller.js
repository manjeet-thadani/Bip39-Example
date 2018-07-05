const bip39Helper = require("../helpers/bip39Helper");
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

module.exports = { generateSeed };
