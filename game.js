'user strict';

function Game() {
  var self = this;
  self.gameIsOver = false;

}

Game.prototype.startGame = function() {
  var self = this;
  self.gameMain = buildDom(
    `<main class="game">
      <header class="game-header container">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>`
  );
  document.body.appendChild(self.gameMain);

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

/////////////// Temporary //////////////////
  // self.idTime = setTimeout(function () {////
  //   self.gameOver();                    ////
  // }, 10000);
  
 self.hunter = new Player(self.canvasElement, 5);

 self.handleHeyDown = function (event) {
    if (event.key === 'ArrowUp') {
      self.hunter.setYDirection(-1);
    } else if (event.key === 'ArrowDown') {
      self.hunter.setYDirection(1);
    } else if (event.key === 'ArrowLeft') {
      self.hunter.setXDirection(-1);
    } else if (event.key === 'ArrowRight') {
      self.hunter.setXDirection(1);
    } 
  };

  document.body.addEventListener('keydown', self.handleHeyDown)

  self.startLoop();
};                                      

Game.prototype.startLoop = function() {
  var self = this;
  var ctx = self.canvasElement.getContext('2d');
  

  function loop() {
    /// UPDATE ///
    self.hunter.update();


    /// CLEAR CANVAS ///
    ctx.clearRect(0, 0, self.width, self.height);


    /// DRAW ///
    self.hunter.draw();

    
    window.requestAnimationFrame(loop);
    
  }
  window.requestAnimationFrame(loop);
};

Game.prototype.onOver = function(callback) {
  var self = this;
  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function() {
  var self = this;
  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function() {
  var self = this;
  self.gameMain.remove();
};