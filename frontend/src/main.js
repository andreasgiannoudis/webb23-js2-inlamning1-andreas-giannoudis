import { getHighscore, newPlayer, updateHighscore, getHighscoreForPlayer } from "./modules/backendService.js";
import { displayHighscore } from "./modules/display.js";
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
const computerImg = document.querySelector('#computerImg');


formNameOfPlayer.addEventListener('submit', async event=>{
    event.preventDefault();
    formNameOfPlayer.style.visibility = 'hidden';
    playerName = document.querySelector('#playerName').value;
    const h3Name = document.createElement('h3');
    h3Name.innerText = `Hello ${playerName}, let's play the rock paper scissors game!`;
    welcomePlayer.append(h3Name);

    btnChoices.addEventListener('click', event=>{
        if (event.target.id === "rock"){
            play('rock');
        }
        else if (event.target.id === "paper")
        {
            play('paper');
        }
        else if (event.target.id === "scissors")
        {
            play('scissors');
        }
    })
    
    

    
});




//the game algorithm
//randomize the computers choice (rock,paper,scissors) using shuffle from underscore
//checking if player's choice is same as the computer's random choice, if so then it's a tie
//if the player wins the round then the score is increasing by 1 every time
//and it displays info about it
//if the computer wins the round then the game ends 
function play(choiceOfPlayer)
{
    const shuffledRpsArr = _.shuffle(rpsArr);
    const randomRps = shuffledRpsArr[0];
    console.log('Computer chose ' + randomRps);
    console.log('Player chose ' + choiceOfPlayer);

    if (randomRps === 'rock')
        computerImg.src = './img/rock.png';
    else if (randomRps === 'paper')
        computerImg.src = './img/paper.png';
    else
        computerImg.src = './img/scissors.png';
    
    if (choiceOfPlayer === randomRps)
    {
        h2ChoiceInfo.innerHTML=''; 
        h3Points.innerHTML='';   
        h2ChoiceInfo.innerText = `It's a tie. You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
        h3Points.innerText = `Your score so far is: ${playerScore}`;
        //gameContainer.append(h2ChoiceInfo, h3Points);
    }
    else if(choiceOfPlayer === "rock" && randomRps=== "scissors" ||
    choiceOfPlayer === "scissors" && randomRps=== "paper" ||
    choiceOfPlayer=== "paper" && randomRps === "rock")
    {
        //Player wins 
        h2ChoiceInfo.innerHTML=''; 
        h3Points.innerHTML=''; 
        playerScore++;
        h2ChoiceInfo.innerText = `You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
        h3Points.innerText = `You won this round and got 1 more point. Your score so far is: ${playerScore}`;
        //gameContainer.append(h2ChoiceInfo, h3Points);
    }
    else 
    {
        h2ChoiceInfo.innerHTML=''; 
        h3Points.innerHTML=''; 
        h2ChoiceInfo.innerText = `You chose ${choiceOfPlayer} and Computer chose ${randomRps}`;
       
        //computer wins
        //so the game must end here  
        endGame();  
    }

    gameContainer.append(h2ChoiceInfo, h3Points);
   
    

}



//end game means that 
async function endGame()
{
    const pComputerWon = document.createElement('p');
    pComputerWon.innerText = 'Computer won over you. Start the game again! Your score is ${playerScore}';
    gameContainer.append(pComputerWon);

    
    const player = {
        name: playerName,
        score: playerScore
    };

    const previousHighscore = await getHighscoreForPlayer(playerName);
    
    if (previousHighscore != undefined) {
        if (playerScore > previousHighscore.score) {
            await updateHighscore(player);
            const pNewHighscore = document.createElement('p');
            pNewHighscore.innerText = 'New Highscore updated!';
            gameContainer.append(pNewHighscore);
        }
    } else {
        newPlayer(player);
    }
   
    playerScore = 0;

    const btnStartNewGame = document.createElement('button');
    btnStartNewGame.innerText = 'Start new game';
    gameContainer.append(btnStartNewGame);

    btnStartNewGame.addEventListener('click', event=>{
        getHighscore().then(displayHighscore);
        resetGame();
    })

}



//reseting the playerScore to 0
//also reseting the containers so that nothing from previous game is visible
function resetGame()
{
    computerImg.src="./img/questionMark.png";
    h2ChoiceInfo.innerHTML='';
    h3Points.innerHTML='';
    gameContainer.innerHTML = '';
    playerName.innerHTML = '';
    welcomePlayer.innerHTML='';
    formNameOfPlayer.style.visibility ='';
    playerScore = 0;
    formNameOfPlayer.reset();
}
        

getHighscore().then(displayHighscore);