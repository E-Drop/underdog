'user strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
  self.score = 0;
  self.username = idName;
  self.isPause = false;
  self.background = new Image();
  self.background.src = 'Images/MMap.png';
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
      <div>
        <audio id='song' preload="auto" loop
        src="./songs/gamesong.mp3">
        </audio>
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

  self.music = self.gameMain.querySelector('audio');
  self.music.autoplay = true;
  
 self.player = new Player(self.canvasElement, 5);

 self.handleHeyDown = function(event) {
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

  self.handleHeyUp = function(event) {
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
  self.bigEnemies = [];

  self.startLoop();
};                                      

Game.prototype.startLoop = function() {
  var self = this;
  
  var ctx = self.canvasElement.getContext('2d');

  document.body.addEventListener('keyup', function() {
    if (event.key === ' ') {
      self.isPause = !self.isPause;
      if (!self.isPause) {
        loop();
      }
    }
  });
  
  if (!self.gameIsOver) {
    self.shooting = function() {
      if (event.keyCode === 87) {
        var snd = new Audio('songs/bullet.mp3'); 
        snd.play();
  
        self.shoot = new Shoot(self.canvasElement, self.player);
        self.shoot.setYDirection(-1);
        self.shoots.push(self.shoot);
      }
      if (event.keyCode === 65) {
        var snd = new Audio('songs/bullet.mp3'); 
        snd.play();
  
        self.shoot = new Shoot(self.canvasElement, self.player);
        self.shoot.setXDirection(-1);
        self.shoots.push(self.shoot);
      }
      if (event.keyCode === 83) {
        var snd = new Audio('songs/bullet.mp3'); 
        snd.play();
  
        self.shoot = new Shoot(self.canvasElement, self.player);
        self.shoot.setYDirection(1);
        self.shoots.push(self.shoot);
      }
      if (event.keyCode === 68) {
        var snd = new Audio('songs/bullet.mp3'); 
        snd.play();
  
        self.shoot = new Shoot(self.canvasElement, self.player);
        self.shoot.setXDirection(1);
        self.shoots.push(self.shoot);
      }
    };
  }

  setTimeout( function() {
    var y = self.canvasElement.height * Math.random();
    var x = self.canvasElement.width * Math.random();
    self.box = new Box (self.canvasElement, x, y);
  }, 10000);

  document.body.addEventListener('keyup',self.shooting);
  
  function loop() {

    if (self.enemies.length < 30) {
      if (Math.random() > 0.98) {
        var y = self.canvasElement.height * Math.random();
        var x = self.canvasElement.width * Math.random();
        self.enemies.push(new Enemy(self.canvasElement, x , y, 40, 0, 3));
      }
    } 

    if (self.bigEnemies.length < 2) {
      if (Math.random() > 0.99) {
        var y = self.canvasElement.height * Math.random();
        var x = self.canvasElement.width * Math.random();
        self.bigEnemies.push(new Enemy(self.canvasElement, x , y, 70, 10, 2));
      }
    } 

    if (self.trees.length < 50) {
      if (Math.random() > 0.97) {
      var y = self.canvasElement.height *  Math.random();
      var x = self.canvasElement.width *  Math.random();
      self.trees.push(new Tree(self.canvasElement, x , y));
      }
    } 

    /// UPDATE ///
    self.player.update();

    self.shoots.forEach(function(item) {
      item.update();
    });

    self.enemies.forEach(function(item) {
      item.update();
    });

    self.bigEnemies.forEach(function(item) {
      item.update();
    });

    self.enemies.forEach(function(item) {
      item.followPlayer(self.player.x, self.player.y);
    });

    self.bigEnemies.forEach(function(item) {
      item.followPlayer(self.player.x, self.player.y);
    });

    self.checkIfEnemiesCollidePlayer();
    self.checkIfShootsCollidesEnemies();
    self.checkIfEnemiesCollideEnemies();
    self.checkIfBigEnemiesCollidePlayer();
    self.checkIfShootsCollidesBigEnemies();
    self.checkIfPlayerCollidesBox();

    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;


    /// CLEAR CANVAS ///
    
    ctx.save();
    ctx.clearRect(0, 0, self.width, self.height);
    ctx.fillStyle = 'red';
    ctx.translate(self.canvasElement.width/2 - self.player.x, self.canvasElement.height/2 - self.player.y);
    ctx.drawImage(self.background, -self.canvasElement.width, -self.canvasElement.height);

    /// DRAW ///
 
    self.shoots.forEach(function(item) {
      item.draw();
    });
    if (self.box) {
      self.box.draw();
    }
  
    self.player.draw();

    self.enemies.forEach(function(item) {
      item.draw();
    });

    self.bigEnemies.forEach(function(item) {
      item.draw();
    });

    self.trees.forEach(function(item) {
      item.draw();
    });

    ctx.drawImage(self.canvasElement, -self.canvasElement.width/2 + self.player.x + 20, -self.canvasElement.height/2 + self.player.y + 20, self.canvasElement.width/10, self.canvasElement.height/10);
    ctx.arc(-self.canvasElement.width/2 + self.player.x + 90, -self.canvasElement.height/2 + self.player.y + 60, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
    if (!self.gameIsOver && !self.isPause) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfEnemiesCollideEnemies = function () {
  var self = this;

  for (var i = 0; i < self.enemies.length; i++) {
    for (var j = 0; j < self.enemies.length; j++) {
      if (j !== i) {
        var a = self.enemies[j].size + self.enemies[i].size;
        var x = self.enemies[j].x - self.enemies[i].x;
        var y = self.enemies[j].y - self.enemies[i].y;
        if (a > Math.sqrt( (x * x) + (y * y) )) {
          var velocityX = self.enemies[j].xVelocity - self.enemies[i].xVelocity;
          var velocityY = self.enemies[j].yVelocity - self.enemies[i].yVelocity;
          var product = x * velocityX + y * velocityY;
          // if(product > 0) {
          var collisionScale = product/((x * x) + (y * y));
          var xCollision = x * collisionScale;
          var yCollision = y * collisionScale;
          self.enemies[i].xVelocity += xCollision;
          self.enemies[i].yVelocity += yCollision;
          self.enemies[j].xVelocity -= xCollision;
          self.enemies[j].yVelocity -= yCollision;
          // }
        }
      }
    }
  }
};

Game.prototype.checkIfShootsCollidesEnemies = function() {
  var self = this;

  for (var i = 0; i < self.shoots.length; i++) {
    for (var j = 0; j < self.enemies.length; j++) {
      if (j !== i) {
        var a = self.enemies[j].size + self.shoots[i].radius;
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

Game.prototype.checkIfShootsCollidesBigEnemies = function() {
  var self = this;

  for (var i = 0; i < self.shoots.length; i++) {
    for (var j = 0; j < self.bigEnemies.length; j++) {
      if (j !== i) {
        const collidesRight = self.shoots[i].x + self.shoots[i].radius / 2 > self.bigEnemies[j].x - self.bigEnemies[j].size / 2;
        const collidesLeft = self.shoots[i].x - self.shoots[i].radius / 2 < self.bigEnemies[j].x + self.bigEnemies[j].size / 2;
        const collidesTop = self.shoots[i].y - self.shoots[i].radius / 2 < self.bigEnemies[j].y + self.bigEnemies[j].size / 2;
        const collidesBottom = self.shoots[i].y + self.shoots[i].radius / 2 > self.bigEnemies[j].y - self.bigEnemies[j].size / 2;
        if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
          self.bigEnemies[j].live--;
          self.shoots.splice(i, 1);
          if (!self.bigEnemies[j].live) {
            self.bigEnemies.splice(j, 1);
            self.score += 100;
          }
          return
        }
      }
    }
  }
};

Game.prototype.checkIfEnemiesCollidePlayer = function() {
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

Game.prototype.checkIfBigEnemiesCollidePlayer = function() {
  var self = this;

  self.bigEnemies.forEach( function(item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.bigEnemies.splice(index, 1);
      if (!self.player.lives) {
        self.gameOver();
      }
    }
  });
};

Game.prototype.checkIfPlayerCollidesBox = function() {
  var self = this;

  if (self.box) {
    var a = self.box.size + self.player.radius;
    var x = self.box.x - self.player.x;
    var y = self.box.y - self.player.y;
    if (a > Math.sqrt( (x * x) + (y * y) )) {
      self.box = 0;
      self.onBossCallback(self.score, self.player.lives);
    }
  }
};

Game.prototype.onOverBoss = function(callback) {
  var self = this;

  self.onBossCallback = callback;
}

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