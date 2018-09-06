'use strict';

function Boss(score, lives){
  var self = this;

  self.bossIsOver = false;
  self.score = score;
  self.username = idName;
  self.lives = lives;
}


Boss.prototype.startBoss = function() {
  var self = this;

  self.bossMain = buildDom(
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

  document.body.appendChild(self.bossMain);
    if (self.username !== undefined) {
      self.bossMain.querySelector('p').innerText = self.username;
    }
    self.canvasParentElement = self.bossMain.querySelector('.canvas');
    self.canvasElement = self.bossMain.querySelector('canvas');
  
    self.livesElement = self.bossMain.querySelector('.lives .value');
    self.scoreElement = self.bossMain.querySelector('.score .value');
  
    self.width = self.canvasParentElement.offsetWidth;
    self.height = self.canvasParentElement.offsetHeight;
  
    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);
    
   self.player = new Player(self.canvasElement, self.lives);

   self.boss = new Enemy(self.canvasElement, 50 , 50, 100, 50, 1.5);


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

  self.shoots = [];
  self.startLoop();

}

Boss.prototype.startLoop = function() {
  var self = this;
  
  var ctx = self.canvasElement.getContext('2d');

  
  self.shooting = function(){
    if (event.keyCode === 87) {
      var snd = new Audio('songs/bullet.mp3'); 
      snd.play();

      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setYDirection(-1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 65) {
      var snd = new Audio('songs/bullet.mp3'); 
      snd.play();

      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setXDirection(-1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 83) {
      var snd = new Audio('songs/bullet.mp3'); 
      snd.play();

      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setYDirection(1)
      self.shoots.push(self.shoot)
    }
    if (event.keyCode === 68) {
      var snd = new Audio('songs/bullet.mp3'); 
      snd.play();

      self.shoot = new Shoot(self.canvasElement, self.player);
      self.shoot.setXDirection(1)
      self.shoots.push(self.shoot)
    }
  };

  document.body.addEventListener('keyup',self.shooting) 
  

  function loop() {

    /// UPDATE ///
    self.player.update();

    self.shoots.forEach(function(item) {
      item.update();
    });

    self.boss.update()

    self.boss.followPlayer(self.player.x, self.player.y);

    self.checkIfBossCollidePlayer();
    self.checkIfShootsCollidesBoss();

    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;


    /// CLEAR CANVAS ///
    
    ctx.clearRect(0, 0, self.width, self.height);

    /// DRAW ///
 
    self.shoots.forEach(function(item) {
      item.draw();
    });
  
    self.player.draw();
    self.boss.draw();


    if (!self.bossIsOver) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};


Boss.prototype.checkIfShootsCollidesBoss = function (){
  var self = this;

  for (var i = 0; i < self.shoots.length; i++){
    var a = self.boss.size + self.shoots[i].radius;
    var x = self.boss.x - self.shoots[i].x;
    var y = self.boss.y - self.shoots[i].y;
    if (a > Math.sqrt( (x * x) + (y * y) )) {
      self.boss.live--
      self.shoots.splice(i, 1);
      if (!self.boss.live) {
        self.boss = 0;
        self.score += 10000;
        self.gameOver();
      }
      return
    }
  }
};

Boss.prototype.checkIfBossCollidePlayer = function () {
  var self = this;
  if (self.player.collidesWithEnemy(self.boss)) {
    self.player.lives = 0;
    if (!self.player.lives) {
      self.gameOver();
    }
  }
};

Boss.prototype.onOver = function(callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Boss.prototype.gameOver = function() {
  var self = this;

  self.bossIsOver = true;
  self.onGameOverCallback();
};

Boss.prototype.destroy = function() {
  var self = this;

  self.bossMain.remove();
};