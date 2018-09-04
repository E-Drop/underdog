'user strict';

function Game() {
  var self = this;
  self.gameIsOver = false;
  self.score = 0;
  self.username = idName;
  self.isPause = false;
  self.background = new Image();
  self.background.src = 'Images/background.png';
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
  self.shoots = [];
  self.trees = [];

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

  document.body.addEventListener('keyup', function(){
    if (event.keyCode === 87) {
      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setYDirection(-1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 65) {
      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setXDirection(-1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 83) {
      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setYDirection(1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 68) {
      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setXDirection(1)
      self.shoots.push(self.shoot)
    }
  });

  function loop() {
    // ctx.drawImage(self.background, 0, 0, self.width, self.height);
    
    if (self.enemies.length < 40){
      if (Math.random() > 0.97){
        var y = self.canvasElement.height * Math.random();
        var x = self.canvasElement.width * Math.random();
        self.enemies.push(new Enemy(self.canvasElement, x , y));
      }
    } 

    // if (self.trees.length < 10){
    //   if (Math.random() > 0.97){
    //     var y = self.canvasElement.height * Math.random();
    //     var x = self.canvasElement.width * Math.random();
    //     self.trees.push(new Tree(self.canvasElement, x , y));
    //   }
    // } 


    /// UPDATE ///
    self.player.update();
    self.shoots.forEach(function(item) {
      item.update();
    });
    self.enemies.forEach(function(item) {
      item.update();
    });
    self.trees.forEach(function(item) {
      item.update();
    });

    self.enemies.forEach(function(item) {
      item.followPlayer(self.player.x, self.player.y);
    });

    self.checkIfEnemiesCollidePlayer();
    self.checkIfShootsCollidesEnemies();
    self.checkIfEnemiesCollideEnemies();

    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;

    /// CLEAR CANVAS ///
    ctx.clearRect(0, 0, self.width, self.height);
    ctx.save();
    ctx.translate(self.width/2-self.player.x, self.height/2-self.player.y);
    ctx.drawImage(self.background, 0, 0, self.canvasElement.width, self.canvasElement.height);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, self.canvasElement.width, self.canvasElement.height);
    
    /// DRAW ///
    self.shoots.forEach(function(item) {
      item.draw()
    });
    self.player.draw();
    self.enemies.forEach(function(item) {
      item.draw()
    });
    self.trees.forEach(function(item) {
      item.draw()
    });
    ctx.restore();
    if (!self.gameIsOver && !self.isPause) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};


Game.prototype.checkIfEnemiesCollideEnemies = function (){
  var self = this;
  for (var i = 0; i < self.enemies.length; i++){
    for (var j = 0; j < self.enemies.length; j++){
      if (j !== i){
        var a = self.enemies[j].radius + self.enemies[i].radius;
        var x = self.enemies[j].x - self.enemies[i].x;
        var y = self.enemies[j].y - self.enemies[i].y;
        if (a > Math.sqrt( (x * x) + (y * y) )) {
          self.enemies[j].xVelocity = self.enemies[i].xVelocity + 0.7;
          self.enemies[j].yVelocity = self.enemies[i].yVelocity + 0.7;
        }
      }
    }
  }
};


Game.prototype.checkIfShootsCollidesEnemies = function (){
  var self = this;
  for (var i = 0; i < self.shoots.length; i++){
    for (var j = 0; j < self.enemies.length; j++){
      if (j !== i){
        var a = self.enemies[j].radius + self.shoots[i].radius;
        var x = self.enemies[j].x - self.shoots[i].x;
        var y = self.enemies[j].y - self.shoots[i].y;
        if (a > Math.sqrt( (x * x) + (y * y) )) {
          self.enemies.splice(j, 1);
          self.score += 10;
          self.shoots.splice(i, 1);
          return
        }
      }
    }
  }
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