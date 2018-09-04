'user strict';

function Shoot(canvasElement, player) {
  var self = this;

  self.canvasElement = canvasElement;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = 5;
  self.x = player.x ;
  self.y = player.y ;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = 5;
} 

Shoot.prototype.setYDirection = function (direction) {
  var self = this;
  self.yVelocity = direction;
};

Shoot.prototype.setXDirection = function (direction) {
  var self = this;
  self.xVelocity = direction;
};

Shoot.prototype.update = function () {
  var self = this;
    self.x = self.x + self.xVelocity * self.speed;
    self.y = self.y + self.yVelocity * self.speed;
};

Shoot.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'orange'
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.beginPath();
  self.ctx.arc(xPosition ,yPosition ,self.radius ,0 ,2*Math.PI);
  self.ctx.fill();
};