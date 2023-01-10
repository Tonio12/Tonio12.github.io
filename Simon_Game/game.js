var buttonColor = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = new Boolean(false);



$('.btn').on('click', function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress('#'+userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

if(started == false){
    //$("body").one("keydown", nextSequence);
    $("#level-title").on("click", nextSequence);
    started = true;
}


function nextSequence(){
    var randomNumber = randomNumber = Math.round(Math.random()*3) ;
    randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    

    $('h1').text('Level '+level);
    level++;
    $('#'+randomChosenColor).fadeOut('fast', function(){
        playSound(randomChosenColor);
        animatePress(randomChosenColor);
        $('#'+randomChosenColor).fadeIn('fast');
    });
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();

}

function animatePress(currentColour){
    $(currentColour).addClass('pressed');
    setTimeout(function(){
        $(currentColour).removeClass('pressed')
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern = [];
        }
    }
    else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over'); 
        },200);

        $('h1').text('Game Over, Click Here To Restart');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}