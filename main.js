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
          <p><span></span><p>
          <button class="button button-restart">Restart</button>
          <button class="button button-menu">Menu</button>
        </div>
      </main>`
    );
    document.body.appendChild(gameOverMain);

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


//----Inicialize----//
  buildSplash();

} //---End of main---//

window.addEventListener('load', main);