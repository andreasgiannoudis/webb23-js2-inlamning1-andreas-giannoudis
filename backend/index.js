const fs = require('fs');
const express = require('express');
const _ = require('underscore');

const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const MAX_OBJECTS = 5;


app.get('/score', (req, res) => {
  const rawInfo = fs.readFileSync('./data/highscore.json', 'utf-8');
  const highscoreInfo = JSON.parse(rawInfo);
  res.send(highscoreInfo);
});

app.post('/score', (req, res) => {
  const newPlayer = req.body;
  const rawData = fs.readFileSync('./data/highscore.json', 'utf-8');
  let highscoreInfo = JSON.parse(rawData);

  highscoreInfo.push(newPlayer);
  let sortedHighscores = _.sortBy(highscoreInfo, 'score').reverse();
  sortedHighscores = sortedHighscores.slice(0, MAX_OBJECTS);

  res.setHeader('Content-Type', 'application/json');
  fs.writeFileSync('./data/highscore.json', JSON.stringify(sortedHighscores));
  res.send('New Highscore added!');
})

app.patch('/score', (req, res) => {
  const { name, score } = req.body;
  const rawData = fs.readFileSync('./data/highscore.json', 'utf-8');
  let highscoreList = JSON.parse(rawData);
  let playerFound = false;

  for (const highscore of highscoreList) {
    if (highscore.name === name) {
      if (score > highscore.score) {
        highscore.score = score;
        playerFound = true;
        break;
      }
    }
  }
  highscoreList = _.sortBy(highscoreList, 'score').reverse();
  let sortedHighscores = highscoreList.slice(0, MAX_OBJECTS);

  let updatedHighscoreInfo = JSON.stringify(sortedHighscores);
  fs.writeFileSync('./data/highscore.json', updatedHighscoreInfo);
  res.send('New Highscore updated!');
})





app.listen(3000, () => {
  console.log('Listening to post 3000...');
})
