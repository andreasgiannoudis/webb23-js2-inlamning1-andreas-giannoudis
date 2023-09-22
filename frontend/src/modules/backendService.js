
//getting the highscore list from backend
async function getHighscore(){
    const url = `http://localhost:3000/score`;
    const response = await fetch(url);
    const highScore = await response.json();
    return highScore;
}



//adding a new player 
async function newPlayer(player) {
    const url = 'http://localhost:3000/score';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(player)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.text();
        const message = responseData.startsWith('{') ? JSON.parse(responseData) : responseData;

    } catch (error) {
        console.error('Error:', error);
    }
}


async function updateHighscore(player){
    const url = 'http://localhost:3000/score';
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(player)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.text();
        const message = responseData.startsWith('{') ? JSON.parse(responseData) : responseData;

    } catch (error) {
        console.error('Error:', error);
    }

}


async function getHighscoreForPlayer(playerName) {
    const url = `http://localhost:3000/score?name=${playerName}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const highscore = await response.json();
      const playerHighscore = highscore.find(score => score.name === playerName);
      return playerHighscore;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

//exporting so i can use the functions in main.js
export {getHighscore, newPlayer, updateHighscore, getHighscoreForPlayer};