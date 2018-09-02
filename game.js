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
  
 self.player = new Player(self.canvasElement, 5);


 self.handleHeyDown = function (event) {
    if (event.key === 'ArrowUp') {
      self.player.setYDirection(-1);
    } else if (event.key === 'ArrowDown') {
      self.player.setYDirection(1);
    } else if (event.key === 'ArrowLeft') {
      self.player.setXDirection(-1);
    } else if (event.key === 'ArrowRight') {
      self.player.setXDirection(1);
    } 
  };

  self.handleHeyUp = function (event) {
    if (event.key === 'ArrowUp') {
      self.player.setYDirection(0);
    } else if (event.key === 'ArrowDown') {
      self.player.setYDirection(0);
    } else if (event.key === 'ArrowLeft') {
      self.player.setXDirection(0);
    } else if (event.key === 'ArrowRight') {
      self.player.setXDirection(0);
    } 
  };

  document.body.addEventListener('keydown', self.handleHeyDown)
  document.body.addEventListener('keyup', self.handleHeyUp)

  self.enemies = [];

  self.startLoop();
};                                      

Game.prototype.startLoop = function() {
  var self = this;
  var ctx = self.canvasElement.getContext('2d');
  

  function loop() {
    if (self.enemies.length < 20){
      if (Math.random() > 0.99){
        var y = self.canvasElement.height * Math.random();
        var x = self.canvasElement.width * Math.random();
        self.enemies.push(new Enemy(self.canvasElement, x , y));
      }
    } 

    /// UPDATE ///
    self.player.update();
    self.enemies.forEach(function(item) {
      item.update();
    });


    // self.enemy1.followPlayer(self.player.x, self.player.y)
    // self.enemy2.followPlayer(self.player.x, self.player.y)


    /// CLEAR CANVAS ///
    ctx.clearRect(0, 0, self.width, self.height);


    /// DRAW ///
    self.player.draw();
    self.enemies.forEach(function(item) {
      item.draw()
    });

    
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