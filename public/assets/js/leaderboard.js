
$(document).ready(function(){
  
  var leaderboard = $("tbody");
  var rank = 1;

  

  getLeaderboard();

  function createLeaderboardRow(leaderboardData) {
    var newTr = $("<tr>");
    newTr.data("leaderboard", leaderboardData);
    newTr.append("<td>" + rank + "</td>");
    newTr.append("<td>" + leaderboardData.score + "</td>");
    newTr.append("<td>" + leaderboardData.name + "</td>");
    rank++;
    return newTr;
  }


  function getLeaderboard() {
    $.get("/api/leaderboard", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createLeaderboardRow(data[i]));
      }
      renderLeaderboard(rowsToAdd);
    });
  }
  
  function renderLeaderboard(rows) {
    if (rows.length) {
      leaderboard.prepend(rows);
    } else {
      console.log("Something has gone terribly wrong!");
    }
  }

});