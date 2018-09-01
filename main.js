'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

var splashMain;

function main () {

//-----SPLASH------//

  function buildSplash() {
    splashMain = buildDom(
     `<main>
       <h1>Underdog</h1>
       <button>Start</button>
     </main>`
   );
 
   document.body.appendChild(splashMain);  
  //  var buttonStart = splashMain.querySelector('button');

  }

//------GAME------//


  buildSplash();
} //---End of main---//

window.addEventListener('load', main);