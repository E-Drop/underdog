'user strict';

function Player(canvasElement, lives) {
  var self = this;

  self.canvasElement = canvasElement;
  self.lives = lives;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = 10;
  self.x = canvasElement.width / 2;
  self.y = canvasElement.height / 2;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = 3;
  self.imageUp = new Image();
  self.imageUp.src = 'Images/Playerup.png';

  self.imageDown = new Image();
  self.imageDown.src = 'Images/Playerdown.png';

  self.imageLeft = new Image();
  self.imageLeft.src = 'Images/Playerleft.png';

  self.imageRight = new Image();
  self.imageRight.src = 'Images/Playerright.png';
} 

Player.prototype.collided = function () {
  var self= this;
  
  self.lives--;
}

Player.prototype.collidesWithEnemy = function (enemy) {
  var self = this;

  var a = self.radius + enemy.radius
  var x = self.x - enemy.x;
  var y = self.y - enemy.y;

  if (a > Math.sqrt( (x * x) + (y * y) )) {
    return true;
  }
  return false;
}

Player.prototype.setYDirection = function (direction) {
  var self = this;

  self.yVelocity = direction;
};

Player.prototype.setXDirection = function (direction) {
  var self = this;

  self.xVelocity = direction;
};

Player.prototype.update = function () {
  var self = this;

  self.x = self.x + self.xVelocity * self.speed;
  self.y = self.y + self.yVelocity * self.speed;

  if (self.x < 0 + self.radius) {
    self.xVelocity = 0.3;
  }
  if (self.y < 0 + self.radius) {
    self.yVelocity = 0.3;
  }
  if (self.y > self.canvasElement.height - self.radius) {
    self.yVelocity = -0.3;
  }
  if (self.x > self.canvasElement.width - self.radius) {
    self.xVelocity = -0.3;
  }
};

Player.prototype.draw = function () {
  var self = this;

  var xPosition = self.x - self.radius;
  var yPosition = self.y - self.radius;
  self.ctx.beginPath();
  
  self.ctx.drawImage(self.imageUp, xPosition, yPosition, 25, 25);
  if (self.yVelocity > 0) {
    self.ctx.drawImage(self.imageDown, xPosition, yPosition, 25, 25);
  } else if (self.xVelocity > 0){
    self.ctx.drawImage(self.imageRight, xPosition, yPosition, 25, 25);
  } else if (self.xVelocity < 0) {
    self.ctx.drawImage(self.imageLeft, xPosition, yPosition, 25, 25);
  }
};


