var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    $("#nextBtn").attr("id", "qSubmit");
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n === 1 && !validateForm()) {
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value === "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//saving data

$(document).on("click", "#qSubmit", function(event){
  event.preventDefault();
});

//on mouseup, grabs data, alerts
$(document).on("mouseup", "#qSubmit", function(){
  dataGrabber();
  alert("Your question has been added to a pool of submitted questions.");
});

//empty qObj variable
var qObj = {
  question: null,
  option1: null,
  option2: null,
  option3: null,
  option4: null,
  correctAnswer: null,
  category: "misc."
};

var dataGrabber= function(){
  //captures values
  var q = $("#question").val();
  var o4 = $("#option4").val();
  var o1 = $("#option1").val();
  var o2 = $("#option2").val();
  var o3 = $("#option3").val();

  qObj.question = q;
  qObj.option4 = o4;
  qObj.correctAnswer = o4;
  qObj.option1 = o1;
  qObj.option2 = o2;
  qObj.option3 = o3;
  
  //qObj is now ready for POSTing
  $.post("/api/post/submitted", qObj, function(data, status){
    console.log(data);
    console.log(status);
  }, "json");
};