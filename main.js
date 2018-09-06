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
  var rulesMain;
  var music;
 


  function buildMusic() {
    music = buildDom(
      `<div>
        <audio id='song' autoplay loop src="./songs/mainMusic.mp3">
        </audio>
      </div>`
    )
    document.body.appendChild(music);
  }

  function destroyMusic() {
    if (music) {
      music.remove();
    }
  }
  buildMusic();
//-----SPLASH------// 
  function buildSplash() {
    destroyGameOver();
    destroyRules();

    splashMain = buildDom(
     `<main class="container">
        <div class="splash">
          <h1>UNDERDOG</h1>
          <div class="input">
            <input type="text" placeholder="Player's Name"></input>
          </div>
          <div class="buttons">
            <button class="button button-start">INSERT COIN</button>
            <button class="button button-rules">RULES</button>
          </div>
          <div class="image">
            <img src='./Images/Map.jpg'>
          </div>
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

    var buttonStart = splashMain.querySelector("button.button-start");
    buttonStart.addEventListener('click', startGame);
    var buttonRules = splashMain.querySelector("button.button-rules");
    buttonRules.addEventListener('click', buildRules);

    addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        startGame();
      }
    });

  }

  function destroySplash() {
    splashMain.remove();
  }



//-----RULES-----//
  function buildRules() {
    destroySplash();

    rulesMain = buildDom(
      `<main class="container rules">
        <div>
        <h1>RULES</h1>
        <div>
          <ul>
            <li>Move the Player with arrow up, donw, right and left</li>
            <li>Shoot with W, D, S and A</li>
            <li>Kill as many enemies as you can!</li>
          </ul>
        </div>
        <button class="button button-menu">BACK</button>
       </div>
     </main>`
    );

    document.body.appendChild(rulesMain); 

    var buttonBack = rulesMain.querySelector("button");
    buttonBack.addEventListener('click', buildSplash);
  }

  function destroyRules() {
    if(rulesMain) {
      rulesMain.remove();
    }
  }



//------GAME------//

  function startGame () {
    destroyMusic();
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
    buildMusic();

    gameOverMain = buildDom(
      `<main class="container">
        <div class="game-over">
          <h1>Game Over</h1>
          <p><span class="score"></span><p>
          <ul>
            <h2>HIGHSCORE</h2>
            <li class="list-item1">
              <p class="name0 name"></pclas>
              <p class="score0"></p>
            </li>
            <li class="list-item2">
              <p class="name1 name"></p>
              <p class="score1"></p>
            </li>
            <li class="list-item3">
              <p class="name2 name"></p>
              <p class="score2"></p>
            </li>
            <li class="list-item4">
              <p class="name3 name"></p>
              <p class="score3"></p>
            </li>
            <li class="list-item5">
              <p class="name4 name"></p>
              <p class="score4"></p>
            </li>
          </ul>
          <button class="button button-restart">Restart</button>
          <button class="button button-menu">Menu</button>
        </div>
      </main>`
    );
    document.body.appendChild(gameOverMain);

    var scoreObject = {
      username: idName,
      score: score
    }

    document.body.removeEventListener('keyup', game.shooting);

    saveScore(scoreObject)
    var listHighscore = JSON.parse(localStorage.getItem('scores'));

    if (listHighscore) {
      displayScore(listHighscore);
    }

    var span = gameOverMain.querySelector('span');
    if (idName !== undefined) {
      span.innerText = idName + ' your score is: ' + score + ' ';
    }

    var buttonRestart = gameOverMain.querySelector('button.button-restart');
    buttonRestart.addEventListener('click', startGame);

    var buttonRestart = gameOverMain.querySelector('button.button-menu');
    buttonRestart.addEventListener('click', buildSplash);

  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  function displayScore(scores) {
    var numberScores = 5;
    if (scores.length < numberScores) {
      numberScores = scores.length;
    }

    for (var i = 0; i < numberScores; i++){
      var name = gameOverMain.querySelector('.name' + i)
      name.innerText = scores[i].username;

      var score = gameOverMain.querySelector('.score' + i)
      score.innerText = scores[i].score;
    }
  }

  function saveScore (scoreObject) {
    var scoreList = [];
    if (!localStorage.getItem('scores')) {
      scoreList.push(scoreObject);
      scoreList.sort(function (a, b) {
        return b.score - a.score;
      });
      localStorage.setItem('scores', JSON.stringify(scoreList));
    } else {
      var scoreList = JSON.parse(localStorage.getItem('scores'));
      scoreList.push(scoreObject);
      scoreList.sort(function(a, b){
        return b.score - a.score;
      })
      localStorage.setItem('scores', JSON.stringify(scoreList));
    }
    JSON.parse(localStorage.getItem('scores'));
  }


  
//----Inicialize----//
  buildSplash();

} //---End of main---//

window.addEventListener('load', main);