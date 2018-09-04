'user strict';

function Enemy(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = 10;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = 2;

  self.imageUp = new Image();
  self.imageUp.src = 'Images/Monsterup.png';

  self.imageDown = new Image();
  self.imageDown.src = 'Images/Monsterdown.png';

  self.imageLeft = new Image();
  self.imageLeft.src = 'Images/Monsterleft.png';

  self.imageRight = new Image();
  self.imageRight.src = 'Images/Monsterright.png';
} 


Enemy.prototype.followPlayer = function (xPlayer, yPlayer) {
  var self = this;

  self.xVelocity = xPlayer - self.x;
  self.yVelocity = yPlayer - self.y;
  self.normalization = Math.sqrt(self.xVelocity ** 2 + self.yVelocity ** 2);
  self.xVelocity = self.xVelocity / self.normalization
  self.yVelocity = self.yVelocity / self.normalization
}

Enemy.prototype.update = function () {
  var self = this;

  self.x = self.x + self.xVelocity * self.speed;
  self.y = self.y + self.yVelocity * self.speed;
};

Enemy.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'black'
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  // self.ctx.beginPath();
  // self.ctx.arc(xPosition ,yPosition ,self.radius ,0 ,2*Math.PI);
  // self.ctx.fill();
  
  if (self.yVelocity > 0) {
    self.ctx.drawImage(self.imageDown, xPosition, yPosition, 25, 25);
  } else if (self.xVelocity > 0){
    self.ctx.drawImage(self.imageRight, xPosition, yPosition, 25, 25);
  } else if (self.xVelocity < 0) {
    self.ctx.drawImage(self.imageLeft, xPosition, yPosition, 25, 25);
  } else if (self.yVelocity < 0) {
    self.ctx.drawImage(self.imageUp, xPosition, yPosition, 25, 25);
  }
};