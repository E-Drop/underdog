'use strict';

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
    splashMain = buildDom(
     `<main class="container">
        <div class="splash">
        <h1>UNDERDOG</h1>
        <button class="button button-start">INSERT COIN</button>
       </div>
     </main>`
   );
   document.body.appendChild(splashMain); 

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
      gameOverTransition();
    });
  }

  function destroyGame() {
    game.destroy();
  }


//----GAME OVER-----//

  function gameOverTransition() {
    destroyGame();
    buildGameOver();
  }

  function buildGameOver() {

    gameOverMain = buildDom(
      `<main class="container">
        <div class="game-over">
          <h1>Game Over</h1>
          <button class="button button-restart">Restart</button>
        </div>
      </main>`
    );
    document.body.appendChild(gameOverMain);

    var buttonRestart = gameOverMain.querySelector('button');
    buttonRestart.addEventListener('click', startGame);
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