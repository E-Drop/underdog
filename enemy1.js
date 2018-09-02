'user strict';

function Enemy1(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = 10;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = 2;
} 

// Enemy1.prototype.collidesWith = function (enemy) {
//   var self = this;

//   var a = self.radius + enemy.radius
//   var x = self.x - enemy.x;
//   var y = self.y - enemy.y;

//   if (a > Math.sqrt( (x * x) + (y * y) )) {
//     return true;
//   }
  
//   return false;
// }


Enemy1.prototype.followPlayer = function (xPlayer, yPlayer) {
  var self = this;

  self.xVelocity = xPlayer - self.x;
  self.yVelocity = yPlayer - self.y;
  self.normalization = Math.sqrt(self.xVelocity ** 2 + self.yVelocity ** 2);
  self.xVelocity = self.xVelocity / self.normalization
  self.yVelocity = self.yVelocity / self.normalization
}

Enemy1.prototype.update = function () {
  var self = this;

  self.x = self.x + self.xVelocity * self.speed;
  self.y = self.y + self.yVelocity * self.speed;
};

Enemy1.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'rgb(153, 255, 204)'
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.beginPath();
  self.ctx.arc(xPosition ,yPosition ,self.radius ,0 ,2*Math.PI);
  self.ctx.fill();
};