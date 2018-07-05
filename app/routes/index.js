const express = require("express");
const router = express.Router();

const homeRouter = require("./home");
const bip39Router = require("./bip39");
const bip44Router = require("./bip44");

router.use("/", homeRouter);
router.use("/generate/seeds", bip39Router);
router.use("/generate/addresses", bip44Router);

module.exports = router;
