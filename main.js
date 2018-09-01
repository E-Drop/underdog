'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}


function main () {
  
  var splashMain;
  var game;


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
  }


//---Inicialize----//
  buildSplash();

} //---End of main---//

window.addEventListener('load', main);