var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameTrigger = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + gamePattern[gamePattern.length - 1]).fadeOut(100, function () {
        playSound(this.id);
        $(this).fadeIn(100);
    })
    $("h1").text("Level " + level);

    level++;

}

$(document).keydown(function startTheGame() {
    gameTrigger++;
    if (gameTrigger === 1) {
        nextSequence();
    }

});


$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    var selectedColor = userClickedPattern[userClickedPattern.length - 1];
    playSound(selectedColor);
    animatePress(selectedColor);
    checkAnswer()
})


function playSound(name) {
    switch (name) {
        case 'red':
            var redAudio = new Audio('sounds/red.mp3');
            redAudio.play();
            break;
        case 'blue':
            var blueAudio = new Audio('sounds/blue.mp3');
            blueAudio.play();
            break;
        case 'green':
            var greenAudio = new Audio('sounds/green.mp3');
            greenAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio('sounds/yellow.mp3');
            yellowAudio.play();
            break;
    }
}

function animatePress(currentColour) {
    var clickedButtonEffect = $("." + currentColour);
    clickedButtonEffect.addClass("pressed");
    setTimeout(function () {
        clickedButtonEffect.removeClass("pressed");
    }, 100);
}

function checkAnswer() {

    if (gamePattern[userClickedPattern.length - 1].includes(userClickedPattern[userClickedPattern.length - 1]) == true) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        var gameOverAudio = new Audio('sounds/wrong.mp3');
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    gameTrigger = 0;
    userClickedPattern = [];
}
