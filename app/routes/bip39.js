const express = require("express");
const bip39Controller = require("../controllers/bip39Controller");
const router = express.Router();

router.post("/", bip39Controller.generateSeed);

module.exports = router;
