var points = 0;//start with 0 points.
var trivia; //global variable for specific trivia question
var usedQ = [];



$("#circleTimer").circletimer({
  onComplete: function() {
    answerColor();
    setTimeout(game.over, 3000);
  },
  timeout: 10000
});

//main game function
var game = {
  questionPicker: function (){
    $.ajax({
      url: "/api/question",
      method: "GET"
    }).then(function(data){
      trivia = data[0];
      game.select();
    });
  },
  select: function(){
    if(usedQ.length === 0){
      game.display();
    } else if (usedQ.length > 0){
      for(var i = 0; i <= usedQ.length; i++){
        if(trivia.id === usedQ[i]){
          game.questionPicker();
        } else if (trivia.id !== usedQ[i] && i === usedQ.length) {
          game.display();
        }
      }
    }   
  },
  display: function(){
    $("#circleTimer").circletimer("start");
    var qTitle = $("#qTitle");
    var a1 = $("#a1");
    var a2 = $("#a2");
    var a3 = $("#a3");
    var a4 = $("#a4");

    $(qTitle).empty();
    $(a1).empty();
    $(a2).empty();
    $(a3).empty();
    $(a4).empty();
 
    $(qTitle).append(trivia.question);
    $(a1).append("<i class=\"fas fa-check\" id=\"check1\"></i><i class=\"fas fa-times\" id=\"x1\"></i>" + trivia.option1);
    $(a2).append("<i class=\"fas fa-check\" id=\"check2\"></i><i class=\"fas fa-times\" id=\"x2\"></i>" + trivia.option2);
    $(a3).append("<i class=\"fas fa-check\" id=\"check3\"></i><i class=\"fas fa-times\" id=\"x3\"></i>" + trivia.option3);
    $(a4).append("<i class=\"fas fa-check\" id=\"check4\"></i><i class=\"fas fa-times\" id=\"x4\"></i>" + trivia.option4);
  },
  verify: function(playerAns){
    var actualAnswer = trivia.correctAnswer;
    usedQ.push(trivia.id);
    if (actualAnswer !== playerAns){
      game.over();
    } else {
      points++;
      clearCss();
      game.questionPicker();
    }
  },
  over: function(){
    var nameInput = $("#usernameSubmit");

    $("#mainDiv").empty();
    $("#questionDiv").hide();
    $("#gameOver").show();
    $("#displayScore").text("Your final score was: " + points);
    
    $(nameInput).click(function(){
      event.preventDefault();
      game.handleUsernameSubmit();
    });
  },
  handleUsernameSubmit : function() {
    var nameInput = $("#usernameInput");
    var name = nameInput.val().trim();
    if (!name) {
      return;
    }
    game.insertUsername({
      name: name,
      score: points
    });
  },
  insertUsername: function(leaderboardData) {
    console.log(leaderboardData);
    $.post("/api/post/leaderboard", leaderboardData, function(data, status){
      console.log(data);
      console.log(status);
    }, "json").then(function(){
      window.location.replace("/leaderboard");
    });
  }
};

//Starts game
$(document).ready(function(){
  game.questionPicker();
});


//Aeron's stuff
$("#option1").on("click", function(){
  $("#option1").css("font-size", "24px");
  $("#circleTimer").circletimer("stop");
  answerColor();
  if ($("#a1").text().trim() === trivia.correctAnswer) {
    $("#check1").show();
  } else {
    $("#x1").show();
  }
  var playerAns = $(this).text().trim();
  setTimeout(function(){
    startExit();
  },2500);
  setTimeout(function(){
    game.verify(playerAns);
  },3510);
});
$("#option2").on("click", function(){
  $("#option2").css("font-size", "24px");
  $("#circleTimer").circletimer("stop");
  answerColor();
  if ($("#a2").text().trim() === trivia.correctAnswer) {
    $("#check2").show();
  } else {
    $("#x2").show();
  }
  var playerAns = $(this).text().trim();
  setTimeout(function(){
    startExit();
  },2500);
  setTimeout(function(){
    game.verify(playerAns);
  },3510);
});
$("#option3").on("click", function(){
  $("#option3").css("font-size", "24px");
  $("#circleTimer").circletimer("stop");
  answerColor();
  if ($("#a3").text().trim() === trivia.correctAnswer) {
    $("#check3").show();
  } else {
    $("#x3").show();
  }
  var playerAns = $(this).text().trim();
  setTimeout(function(){
    startExit();
  },2500);
  setTimeout(function(){
    game.verify(playerAns);
  },3510);
});
$("#option4").on("click", function(){
  $("#option4").css("font-size", "24px");
  $("#circleTimer").circletimer("stop");
  answerColor();
  if ($("#a4").text().trim() === trivia.correctAnswer) {
    $("#check4").show();
  } else {
    $("#x4").show();
  }
  var playerAns = $(this).text().trim();
  setTimeout(function(){
    startExit();
  },2500);
  setTimeout(function(){
    game.verify(playerAns);
  },3510);
});

function answerColor(){
  if ($("#option1").text().trim() === trivia.correctAnswer) {
    $("#option1").css("color", "green");
  } else {
    $("#option1").css("color", "red");
  }

  if ($("#option2").text().trim() === trivia.correctAnswer) {
    $("#option2").css("color", "green");
  } else {
    $("#option2").css("color", "red");
  }

  if ($("#option3").text().trim() === trivia.correctAnswer) {
    $("#option3").css("color", "green");
  } else {
    $("#option3").css("color", "red");
  }

  if ($("#option4").text().trim() === trivia.correctAnswer) {
    $("#option4").css("color", "green");
  } else {
    $("#option4").css("color", "red");
  } 
}

function clearCss(){
  $("#x1").hide();
  $("#x2").hide();
  $("#x3").hide();
  $("#x4").hide();
  $("#check1").hide();
  $("#check2").hide();
  $("#check3").hide();
  $("#check4").hide();
  $(".buttonOptions").css("color", "gray");
  $(".buttonOptions").css("font-size", "18px");
  $(".buttonOptions").css("background color", "white");
  $("#option1").removeClass("animated flipOutX");
  $("#option2").removeClass("animated flipOutX");
  $("#option3").removeClass("animated flipOutX");
  $("#option4").removeClass("animated flipOutX");
  $("#circleTimer").removeClass("animated fadeOut duration-1s");
  $("#qTitle").removeClass("animated fadeOut duration-1s");
  setTimeout(animations, 1);
}
function animations(){
  $("#option1").addClass("animated flipInX delay-1s");
  $("#option2").addClass("animated flipInX delay-1s");
  $("#option3").addClass("animated flipInX delay-1s");
  $("#option4").addClass("animated flipInX delay-1s"); 
  $("#circleTimer").addClass("animated fadeIn duration-1s");
  $("#qTitle").addClass("animated fadeIn duration-1s");
}
function startExit() {
  $("#option1").removeClass("animated flipInX delay-1s");
  $("#option2").removeClass("animated flipInX delay-1s");
  $("#option3").removeClass("animated flipInX delay-1s");
  $("#option4").removeClass("animated flipInX delay-1s");
  $("#circleTimer").removeClass("animated fadeIn duration-1s");
  $("#qTitle").removeClass("animated fadeIn duration-1s");
  setTimeout(exitAni, 1);
}
function exitAni(){
  $("#option1").addClass("animated flipOutX");
  $("#option2").addClass("animated flipOutX");
  $("#option3").addClass("animated flipOutX");
  $("#option4").addClass("animated flipOutX");
  $("#circleTimer").addClass("animated fadeOut duration-1s");
  $("#qTitle").addClass("animated fadeOut duration-1s");
}


