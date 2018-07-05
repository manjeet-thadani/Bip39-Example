const express = require("express");
const bip44Controller = require("../controllers/bip44Controller");
const router = express.Router();

router.post("/", bip44Controller.generateAddressess);

module.exports = router;
