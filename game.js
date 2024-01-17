var buttonColor=["green","red","yellow","blue"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
     $("#level-title").text("level "+level);

     nextSequence();

     started=true;
    }
});

$(".btn").click(function(){

    var userClickedButton=$(this).attr("id");
    userClickedPattern.push(userClickedButton);
    playSound(userClickedButton);
    animatePress(userClickedButton);
    console.log(userClickedButton);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(name){
 
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");  
    },100);
}
function playSound(Button){
    var audio=new Audio("sounds/"+Button+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}