var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("h1").text("level " + level); // level 0?
        nextSequence();
        started=true;
}
})

$(".btn").on("click", function(){
    var userChosenColour=$(this).attr("id");  // this ki jagaha btn?
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern)

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

// check answer
function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        console.log("success");
        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}

function nextSequence(){

    userClickedPattern=[];

    level++;

    $("h1").text("level "+level)
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // animatePress(userClickedPattern);

}

// nextSequence();

function playSound(name){
    
    var audio=new Audio("sounds/"+name+".mp3");
    // var audio=new Audio("sounds/red.mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function startOver(){

    level=0;
    gamePattern=[];
    started=false;
}