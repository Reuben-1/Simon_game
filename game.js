var buttonColors = ["blue", "green", "yellow", "red"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;


$(document).on("keypress", function(){
   if (started == false){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
   }  
});

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);
})

  


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/'+ name +'.mp3');
    audio.play();
}

function animatePress(currentColour){
   $('#'+currentColour).addClass('pressed');
   setTimeout(function (){
    $('#'+currentColour).removeClass('pressed');
   },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        playSound('wrong');
        $('body').addClass('game-over')
        setTimeout(function (){
            $('body').removeClass('game-over');
           },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}