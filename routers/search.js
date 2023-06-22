const express = require("express");
const router = express.Router();

const searchController = require("../controllers/search");


router.post("/search-character", searchController.search_character);
 
module.exports = router;
