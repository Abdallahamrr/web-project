const express = require("express");
const { addToFavourites, getMyFavourites } = require("./favourite.controller");
const router = express.Router();

router.post("/add-to-favourites", addToFavourites);
router.get("/get-my-favourites", getMyFavourites);

module.exports = router;
