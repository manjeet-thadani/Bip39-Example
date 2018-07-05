const express = require("express");
const router = express.Router();

const homeRouter = require("./home");
const bip39Router = require("./bip39");

router.use("/", homeRouter);
router.use("/generate/bip-39", bip39Router);

module.exports = router;
