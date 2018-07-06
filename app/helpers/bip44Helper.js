const bitcoin = require("bitcoinjs-lib");
const ethUtil = require("ethereumjs-util");

const generateAddressess = function(
  seed,
  account_deviation_path,
  change_deviation_path,
  coin_type
) {
  var response = { addresses: [] };

  var master_node = bitcoin.HDNode.fromSeedHex(seed);
  var account_node = master_node.derivePath(account_deviation_path);
  var change_node = master_node.derivePath(change_deviation_path);

  response.account_node_xprv = account_node.toBase58();
  response.account_node_xpub = account_node.neutered().toBase58();
  response.change_node_xprv = change_node.toBase58();
  response.change_node_xpub = change_node.neutered().toBase58();

  response.bip32_deviation_path = change_deviation_path;

  for (let i = 0; i < 20; i++) {
    let address_index = {};
    address_index.deviation_path = change_deviation_path + "/" + i;
    var index_node = change_node.derive(i);

    var public_key = index_node.getPublicKeyBuffer().toString("hex");
    var private_key = index_node.keyPair.toWIF();
    var wallet_address = index_node.getAddress();

    if (coin_type == 60) {
      var private_key_buffer = index_node.keyPair.d.toBuffer(32);
      private_key = "0x" + private_key_buffer.toString("hex");
      public_key = "0x" + public_key;

      // Returns the ethereum address of a given private key
      wallet_address =
        "0x" + ethUtil.privateToAddress(private_key_buffer).toString("hex");
    }

    address_index.public_key = public_key;
    address_index.private_key = private_key;
    address_index.wallet_address = wallet_address;

    response.addresses.push(address_index);
  }

  return response;
};

module.exports = {
  generateAddressess
};
