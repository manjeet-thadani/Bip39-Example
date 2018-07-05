const bip44Helper = require("../helpers/bip44Helper");

const generateAddressess = function(req, res, next) {
  var response = bip44Helper.generateAddressess(
    req.body.seed,
    req.body.account_deviation_path,
    req.body.change_deviation_path
  );
  res.json(response);
};

module.exports = { generateAddressess };
