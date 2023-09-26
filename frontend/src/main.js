import { getHighscore, newPlayer, updateHighscore, getHighscoreForPlayer } from "./modules/backendService.js";
import { displayHighscore } from "./modules/displayHighscore.js";
import _ from 'underscore';


const rpsArr = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let playerName = '';

const welcomePlayer = document.querySelector('#welcomePlayer');

const btnChoices = document.querySelector('#player');
const formNameOfPlayer = document.querySelector('#playerForm');
const gameContainer = document.querySelector('#gameContainer');
const h2ChoiceInfo = document.createElement('h2');
const h3Points = document.createElement('h3');
const btnStartNewGame = document.createElement('button');
let handleButtonClick;

const questionImg = document.querySelector('#questionmark');


getHighscore().then(displayHighscore);



formNameOfPlayer.addEventListener('submit', async event => {
    event.preventDefault();
    playerName = document.querySelector('#playerName').value;

    if (playerName == '') {
        alert('You must write your name to be able to play');
    }
    else {
        const h3Name = document.createElement('h3');
        formNameOfPlayer.style.visibility = 'hidden';
        h3Name.innerText = `Hello ${playerName}, let's play the rock paper scissors game!`;
        welcomePlayer.append(h3Name);

        const rpsImages = btnChoices.querySelectorAll('.rps');
        rpsImages.forEach(image => {
            image.style.pointerEvents = 'auto';
        });

    
        handleButtonClick = (event) => {
            event.preventDefault();
          
            if (event.target.id === 'rock' || event.target.id === 'paper' || event.target.id === 'scissors') {
              const choiceOfPlayer = event.target.id;
              play(choiceOfPlayer);
            }
          };
          
          btnChoices.addEventListener('click', handleButtonClick);






    }
});

let randomRps = null;
function generateRandomRps() {
    const shuffledRpsArr = _.shuffle(rpsArr);
    randomRps = shuffledRpsArr[0];
}


//the game algorithm
//randomize the computers choice (rock,paper,scissors) using shuffle from underscore
//checking if player's choice is same as the computer's random choice, if so then it's a tie
//if the player wins the round then the score is increasing by 1 every time
//and it displays info about it
//if the computer wins the round then the game ends 
function play(choiceOfPlayer) {
    generateRandomRps();

    if (randomRps == 'rock')
    {
        const imgUrl = new URL('./img/rock.png', import.meta.url);
        questionImg.src = imgUrl.href;
    }
    else if (randomRps == 'paper')
    {
        const imgUrl = new URL('./img/paper.png', import.meta.url);
        questionImg.src = imgUrl.href;
    }
    else
    {
        const imgUrl = new URL('./img/scissors.png', import.meta.url);
        questionImg.src = imgUrl.href;
    }
    

    if (choiceOfPlayer === randomRps) {

        h2ChoiceInfo.innerText = `It's a tie. You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
        h3Points.innerText = `Your score so far is: ${playerScore}`;
        gameContainer.append(h2ChoiceInfo, h3Points);
    }
    else if (choiceOfPlayer === "rock" && randomRps === "scissors" ||
        choiceOfPlayer === "scissors" && randomRps === "paper" ||
        choiceOfPlayer === "paper" && randomRps === "rock") {
        //Player wins 
        playerScore++;

        h2ChoiceInfo.innerText = `You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
        h3Points.innerText = `You won this round and got 1 more point. Your score so far is: ${playerScore}`;
        gameContainer.append(h2ChoiceInfo, h3Points);
    }
    else {
        
        h2ChoiceInfo.innerText = '';
        h3Points.innerText = '';
        h2ChoiceInfo.innerText = `You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
        h3Points.innerText = `Computer won. Game over! Start the game again! You got ${playerScore} points`;
        gameContainer.append(h2ChoiceInfo, h3Points);

        //disabling the imgs when the game ends
        const rpsImages = btnChoices.querySelectorAll('.rps');
        rpsImages.forEach(image => {
            image.style.pointerEvents = 'none';
        });


        //computer wins
        //so the game must end here       
        endGame();
    }
}



//end game means that the computer won the round the game is over
//checking if the player has already had a highscore before
//if the current score is greater than the previous highscore then it updates the highscore
//if it is the first time the player plays
//then a new object with the name and the score add to the json file in backend
//Also it shows a start new game button and resets everything
async function endGame() {
    const player = {
        name: playerName,
        score: playerScore
    };

    const previousHighscore = await getHighscoreForPlayer(playerName);

    if (previousHighscore != undefined) {
        if (playerScore > previousHighscore.score) {
            await updateHighscore(player);
            const pNewHighscore = document.createElement('p');
            pNewHighscore.innerText = 'Well done! New Highscore updated!';
            gameContainer.append(pNewHighscore);
        }
    } else {
        newPlayer(player);
    }

    btnChoices.removeEventListener('click', handleButtonClick);
    btnStartNewGame.innerText = 'Start new game';
    gameContainer.append(btnStartNewGame);
    btnStartNewGame.addEventListener('click', event => {
        resetGame();
    });
}



//reseting the playerScore to 0
//also reseting the containers so that nothing from previous game is visible
function resetGame() {
    getHighscore().then(displayHighscore);
    h2ChoiceInfo.innerText = '';
    h3Points.innerText = '';
    btnStartNewGame.innerText = '';
    gameContainer.innerHTML = '';
    playerName.innerText = '';
    welcomePlayer.innerText = '';
    formNameOfPlayer.style.visibility = '';
    const imgUrl = new URL('./img/questionMark.png', import.meta.url);
    questionImg.src = imgUrl.href;
    playerScore = 0;
    formNameOfPlayer.reset();
}


