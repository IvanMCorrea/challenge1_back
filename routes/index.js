const express = require("express");
const leaderboardController = require("../controllers/leaderboard.controller");
const router = express.Router();

router.get("/leaderboard/scrapper", leaderboardController.scrapper);
router.get("/leaderboard/getLeaderboard", leaderboardController.getLeaderboard);

module.exports = router;
