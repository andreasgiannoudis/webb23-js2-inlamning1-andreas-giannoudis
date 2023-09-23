//creating the output and showing the highscore list
//if there is no highscore in json file then it will show a message
//exporting it so i can use it in main.js
function displayHighscore(highscoreUsers) {
    const highscoreList = document.querySelector('#highscoreList');
    highscoreList.innerHTML = '';
    const h2Highscore = document.createElement('h2');
    h2Highscore.innerText = 'Highscore';
    highscoreList.append(h2Highscore);

    if (highscoreUsers.length === 0) {
        const h2NoHighscoreYet = document.createElement('h2');
        h2NoHighscoreYet.innerText = 'No highscore yet. Start the game and get a highscore!';
        highscoreList.append(h2NoHighscoreYet);
    }
    else {
        for (const highscorePlayer of highscoreUsers) {
            if (highscorePlayer.name != null) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>Name: ${highscorePlayer.name}</span> <span>Score: ${highscorePlayer.score}</span>`;
                highscoreList.appendChild(listItem);
            }


        }
    }


}



export { displayHighscore };