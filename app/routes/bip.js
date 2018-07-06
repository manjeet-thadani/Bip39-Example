const express = require("express");
const bipController = require("../controllers/bipController");
const router = express.Router();

router.post("/generate/seeds", bipController.generateSeed);

router.post("/generate/mnemonic/new", bipController.generateMnemonic);

router.post("/generate/mnemonic/verify", bipController.validateMnemonic);

router.post("/generate/addresses", bipController.generateAddressess);
module.exports = router;
