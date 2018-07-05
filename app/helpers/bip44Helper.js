const hdkey = require("hdkey");

const generateAddressess = function(
  seed,
  account_deviation_path,
  change_deviation_path
) {
  var response = { addresses: [] };

  var root_key = hdkey.fromMasterSeed(new Buffer(seed, "hex"));
  var account_node = root_key.derive(account_deviation_path);
  var change_node = root_key.derive(change_deviation_path);

  response.account_node_xprv = account_node.privateExtendedKey;
  response.account_node_xpub = account_node.publicExtendedKey;
  response.change_node_xprv = change_node.privateExtendedKey;
  response.change_node_xpub = change_node.publicExtendedKey;

  for (let i = 0; i < 20; i++) {
    let address_index = {};
    var address_index_deviation_path = change_deviation_path + "/" + i;
    var index_node = root_key.derive(address_index_deviation_path);

    debugger;
    address_index.address_index_deviation_path = address_index_deviation_path;
    address_index.public_key = "0x" + index_node.publicKey.toString("hex");
    address_index.private_key = "0x" + index_node.privateKey.toString("hex");

    response.addresses.push(address_index);
  }
  return response;
};

module.exports = {
  generateAddressess
};
