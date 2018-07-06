const express = require("express");
const bitcoin = require("bitcoinjs-lib");
const ethUtil = require("ethereumjs-util");
const router = express.Router();

const homeRouter = require("./home");
const bipRouter = require("./bip");

router.use("/", homeRouter);
router.use("/bip", bipRouter);

// router.get("/", function(req, res, next) {
//   var seed =
//     "586eeb515606b7cd65b9eca8939f8fbbcfd2470aacf646f6cf8b95c895dcada1d701a67d0817a0ce2bc1c834f6c2273001ebd3883c7ae18f7ef4561ba40e8017";

//   var coin_type = "60";

//   // CREATE MASTER NODE
//   var master_node = bitcoin.HDNode.fromSeedHex(seed);
//   var master_xprv = master_node.toBase58();
//   var master_xpub = master_node.neutered().toBase58();

//   var change_node = master_node.derivePath("m/44'/60'/0'/0");
//   var change_node_xprv = change_node.toBase58();

//   var inex_node_1 = change_node.derive(0);
//   var keyPair = inex_node_1.keyPair;

//   var pubkey = keyPair.getPublicKeyBuffer().toString("hex");

//   try {
//     if (coin_type == 60) {
//       var privKeyBuffer = keyPair.d.toBuffer(32);
//       privkey = privKeyBuffer.toString("hex");
//       var addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
//       var hexAddress = addressBuffer.toString("hex");
//       var checksumAddress = ethUtil.toChecksumAddress(hexAddress);
//       address = ethUtil.addHexPrefix(checksumAddress);
//       privkey = ethUtil.addHexPrefix(privkey);
//       pubkey = ethUtil.addHexPrefix(pubkey);

//       console.log(address, privkey, pubkey);
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   // //console.log(change_node_xprv);

//   res.send("ss");
// });
module.exports = router;
