'user strict';

function Enemy(canvasElement, x, y ,size, live, speed) {
  var self = this;

  self.canvasElement = canvasElement;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = size;
  self.live = live
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = speed;

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

  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  
  if (self.yVelocity > 0) {
    self.ctx.drawImage(self.imageDown, xPosition, yPosition, self.radius, self.radius);
  } else if (self.xVelocity > 0){
    self.ctx.drawImage(self.imageRight, xPosition, yPosition, self.radius, self.radius);
  } else if (self.xVelocity < 0) {
    self.ctx.drawImage(self.imageLeft, xPosition, yPosition, self.radius, self.radius);
  } else if (self.yVelocity < 0) {
    self.ctx.drawImage(self.imageUp, xPosition, yPosition, self.radius, self.radius);
  }
};