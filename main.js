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
     `<main>
       <h1>Underdog</h1>
       <button>Start</button>
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
      `<main>
        <h1>Game Over</h1>
        <button>Restart</button>
      </main>`
    );
    document.body.appendChild(gameOverMain);
  }


//----Inicialize----//
  buildSplash();

} //---End of main---//

window.addEventListener('load', main);