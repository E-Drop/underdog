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

  self.imageUp = new Image();
  self.imageUp.src = 'Images/shootup.png';

  self.imageDown = new Image();
  self.imageDown.src = 'Images/shootdown.png';

  self.imageLeft = new Image();
  self.imageLeft.src = 'Images/shootleft.png';

  self.imageRight = new Image();
  self.imageRight.src = 'Images/shootright.png';
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

  var xPosition = self.x - 30;
  var yPosition = self.y - 30;
  
  if (self.yVelocity > 0) {
    self.ctx.drawImage(self.imageDown, xPosition, yPosition, 20, 20);
  } else if (self.xVelocity > 0){
    self.ctx.drawImage(self.imageRight, xPosition, yPosition, 20, 20);
  } else if (self.xVelocity < 0) {
    self.ctx.drawImage(self.imageLeft, xPosition, yPosition, 20, 20);
  } else if (self.yVelocity < 0) {
    self.ctx.drawImage(self.imageUp, xPosition, yPosition, 20, 20);
  }
};