'user strict';

function Game() {
  var self = this;
  self.gameIsOver = false;
  self.score = 0;
  self.username = idName;
  self.isPause = false;
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
        <div>
          <p></p>
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
  if (self.username !== undefined) {
    self.gameMain.querySelector('p').innerText = self.username;
  }
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');

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

  document.body.addEventListener('keydown', self.handleHeyDown);
  document.body.addEventListener('keyup', self.handleHeyUp);

  self.enemies = [];

  self.startLoop();
};                                      

Game.prototype.startLoop = function() {
  var self = this;
  var ctx = self.canvasElement.getContext('2d');

  // fix pause
  document.body.addEventListener('keyup', function(){
    if (event.key === ' ') {
      self.isPause = !self.isPause;
      if (!self.isPause) {
        loop();
      }
    }
  });

  function loop() {
    if (self.enemies.length < 40){
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

    self.enemies.forEach(function(item) {
      item.followPlayer(self.player.x, self.player.y);
    });

    self.checkIfEnemiesCollidePlayer();

    self.checkIfEnemiesCollideEnemies = function (){
      var self = this;
      for (var i = 0; i < self.enemies.length; i++){
        for (var j = 0; j < self.enemies.length; j++){
          if (j !== i){
            var a = self.enemies[j].radius + self.enemies[i].radius;
            var x = self.enemies[j].x - self.enemies[i].x;
            var y = self.enemies[j].y - self.enemies[i].y;
            if (a > Math.sqrt( (x * x) + (y * y) )) {
              self.enemies[i].xVelocity = self.enemies[j].xVelocity + 0.5;
              self.enemies[i].yVelocity = self.enemies[j].yVelocity + 0.5;
            }
          }
        }
      }
    };

    self.checkIfEnemiesCollideEnemies();

    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;

    /// CLEAR CANVAS ///
    ctx.clearRect(0, 0, self.width, self.height);


    /// DRAW ///
    self.player.draw();
    self.enemies.forEach(function(item) {
      item.draw()
    });

    if (!self.gameIsOver && !self.isPause) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfEnemiesCollidePlayer = function () {
  var self = this;

  self.enemies.forEach( function(item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.enemies.splice(index, 1);
      if (!self.player.lives) {
        self.gameOver();
      }
    }
  });
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