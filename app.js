// call randomColor
randomColor();
// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector("#message"),
    hint = document.querySelector(".hint");


// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function(e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener("click", function() {
    let guess = +guessInput.value;
    console.log(guess);

    // validate input
    if (guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, `red`)
        giveHint("");
    } else {
        if (guess === winningNum) {
            // remove hint
            giveHint("");
            // call gameOver function
            gameOver(true, `${winningNum} is correct. You win!`);
            // change text color
            message.style.color = "green";
            // create confetti setting
            if (guessesLeft > 0 && guess === winningNum) {
                let confettiSettings = {
                    "target": "my-canvas",
                    "max": "100",
                    "size": "1",
                    "animate": true,
                    "props": ["circle", "square", "triangle", "line"],
                    "colors": [
                        [165, 104, 246],
                        [230, 61, 135],
                        [0, 199, 228],
                        [253, 214, 126]
                    ],
                    "clock": "35"
                };
                // assign confetti variable
                let confetti = new ConfettiGenerator(confettiSettings);
                // render confetti
                confetti.render();
            }

        } else {
            // wrong number guessed substract 1
            if (guessesLeft) {
                guessesLeft--;
            }
            if (guessesLeft === 0) {
                // remove hint
                giveHint("");
                // call gameOver function
                gameOver(false, `Game over, you lost! The correct number was ${winningNum}`);
                // change bg color when user loses
                document.querySelector("body").style.backgroundColor = "#F4D03F";
            } else {
                // give hint
                if (guess < winningNum) {
                    giveHint("Guess is lower than than winning number");
                    console.log("Guess Less");
                } else if (guess > winningNum) {
                    giveHint("Guess is higher than the winning number");
                    console.log("Guess More");
                }
                // guesses left, game continues
                // change border color
                guessInput.style.borderColor = "red";
                // clear input
                guessInput.value = "";
                // set message
                setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, `red`);
            }

        }
    }
});

// setting function setMessage
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// setting function giveHint
function giveHint(msg) {
    hint.style.color = "#3498DB";
    hint.textContent = msg;
};

// setting function gameOver
function gameOver(won, msg) {
    let color;
    won === true ? color = "green" : color = "red";
    // disable input
    guessInput.disabled = true;
    // change button color to make it visible
    guessBtn.style.color = "white";
    // change border color
    guessInput.style.borderColor = color;
    // change button color
    guessBtn.style.backgroundColor = color;
    // change message color
    message.style.color = color;
    setMessage(msg);
    // play again
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";

}

// creating function getWinningNum
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// create random heading colors
function randomColor() {
    setInterval(function() { document.querySelector("h1").style.color = '#' + Math.floor(Math.random() * 16777215).toString(16); }, 10000);
};