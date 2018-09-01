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

  if (self.y < 0 + self.radius || self.x < 0 + self.radius) {
    self.xVelocity = 0.5;
    self.yVelocity = 0.5;
  }
  if (self.y > self.canvasElement.height - self.radius) {
    self.xVelocity = -0.5;
    self.yVelocity = -0.5;
  }
  if (self.x > self.canvasElement.width - self.radius) {
    self.xVelocity = -0.5;
    self.yVelocity = -0.5;
  }
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = ('yellow');
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.beginPath();
  self.ctx.arc(xPosition ,yPosition ,self.radius ,0 ,2*Math.PI);
  self.ctx.fill();
};


