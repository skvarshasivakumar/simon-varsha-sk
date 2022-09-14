var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;
$(document).keydown(function()
{
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playsound("wrong");
    // var aud=new Audio("sounds/wrong.mp3")
    // aud.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4)
  randomChosenColour =  buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}
function playsound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play()
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
