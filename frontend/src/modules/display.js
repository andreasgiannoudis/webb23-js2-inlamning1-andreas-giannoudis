//creating the output and showing the highscore list
//exporting it so i can use it in main.js
function displayHighscore(highscoreUsers) {
    const highscoreList = document.querySelector('#highscoreList');
    highscoreList.innerHTML = '';
    for (const highscorePlayer of highscoreUsers) {        
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>Name: ${highscorePlayer.name}</span> <span>Score: ${highscorePlayer.score}</span>`;
        highscoreList.appendChild(listItem);
    }
}



export {displayHighscore};