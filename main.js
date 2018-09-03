'use strict';

var idName;

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}


function main () {
  
  var splashMain;
  var game;
  var gameOverMain;


//-----SPLASH------//

  function buildSplash() {

    destroyGameOver();

    splashMain = buildDom(
     `<main class="container">
        <div class="splash">
        <h1>UNDERDOG</h1>
        <div class="input">
          <label>Name:</label>
          <input type="text"></input>
        </div>
        <button class="button button-start">INSERT COIN</button>
       </div>
     </main>`
   );
    document.body.appendChild(splashMain); 

    var input = document.querySelector('input');
    input.addEventListener('keyup', function() {
      idName = username(input);
    });

    function username (item) {
      return item.value;
    }

    var buttonStart = splashMain.querySelector("button");
    buttonStart.addEventListener('click', startGame);
  }

  function destroySplash() {
    splashMain.remove();
  }


//------GAME------//

  function startGame () {
    destroySplash();
    destroyGameOver();

    game = new Game();
    game.startGame();
    game.onOver(function () {
      gameOverTransition(game.score);
    });
  }

  function destroyGame() {
    game.destroy();
  }


//----GAME OVER-----//

  function gameOverTransition(score) {
    destroyGame();
    buildGameOver(score);
  }

  function buildGameOver(score) {

    gameOverMain = buildDom(
      `<main class="container">
        <div class="game-over">
          <h1>Game Over</h1>
          <p><span class="score"></span><p>
          <button class="button button-restart">Restart</button>
          <button class="button button-menu">Menu</button>
        </div>
      </main>`
    );
    document.body.appendChild(gameOverMain);

    // <h3>HIGHSCORE</h3>
    // <ul>
    //   <li class="score1"></li>
    //   <li class="score2"></li>
    //   <li class="score3"></li>
    //   <li class="score4"></li>
    //   <li class="score5"></li>
    // <ul>

    // var score1 = gameOverMain.querySelector('.score1');
    // var score2 = gameOverMain.querySelector('.score2');
    // var score3 = gameOverMain.querySelector('.score3');
    // var score4 = gameOverMain.querySelector('.score4');
    // var score5 = gameOverMain.querySelector('.score5');
    // var listHighscore = JSON.parse(localStorage.getItem('scores'));

    // score1.innerText = listHighscore[0].username + '  ' + listHighscore[0].score;
    // score2.innerText = listHighscore[1].username + '  ' + ;
    // score3.innerText = listHighscore[2].username;
    // score4.innerText = listHighscore[3].username;
    // score5.innerText = listHighscore[4].username;

    var span = gameOverMain.querySelector('span');
    if (idName !== undefined) {
      span.innerText = idName + ' your score is: ' + score + ' ';
    }

    var buttonRestart = gameOverMain.querySelector('button.button-restart');
    buttonRestart.addEventListener('click', startGame);

    var buttonRestart = gameOverMain.querySelector('button.button-menu');
    buttonRestart.addEventListener('click', buildSplash);

    var scoreObject = {
      username: idName,
      score: score
    }
    saveScore(scoreObject)
  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  function saveScore (scoreObject) {
    if (!localStorage.getItem('scores')) {
      var listScore = []
      var listPlayers = []
      listScore.push(scoreObject);
      localStorage.setItem('scores', JSON.stringify(listScore));
    } else {
      var listScore = JSON.parse(localStorage.getItem('scores'));
      listScore.push(scoreObject);
      localStorage.setItem('scores', JSON.stringify(listScore));
    }

    listPlayers = JSON.parse(localStorage.getItem('scores'));
    listPlayers.sort(function (a, b){
      return b.score - a.score;
    })
  }

//----Inicialize----//
  buildSplash();

} //---End of main---//

window.addEventListener('load', main);