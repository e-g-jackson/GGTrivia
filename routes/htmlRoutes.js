var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Load quiz page
  app.get("/quiz", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  // Load leaderboard page
  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });

  // Submit Page
  app.get("/submit", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/submit.html"));
  });
  
  // Instructions
  app.get("/instructions", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/instructions.html"))
  });

  //Instructions Page
  app.get("/instructions", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/instructions.html"));
  });
};