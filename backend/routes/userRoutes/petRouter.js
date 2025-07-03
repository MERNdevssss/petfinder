const express = require("express");
const router = express.Router();
const { getPetInfo } = require("../../controllers/petInfoController");
const { restrictToLoggedInUserOnly } = require("../../middlewares/auth");

// GET /pets/:category?size=&foodType=&search=
router.get("/:category", getPetInfo);

module.exports = router;
