'user strict';

function Enemy(canvasElement, x, y ,size, live, speed) {
  var self = this;

  self.canvasElement = canvasElement;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.size = size;
  self.live = live
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = speed;
  self.curframe = 0;
  self.frameCount = 10;
  self.tickcount = 0;
  self.srcX = 0;

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
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  
  if (self.yVelocity > 0) { 
    self.srcX = self.curframe * 76;
    self.frameCount++
    self.ctx.drawImage(self.imageDown, self.srcX, 0, 76, 76, xPosition, yPosition, self.size, self.size);
    if (self.frameCount > 10) {
      self.curframe++
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }

  } else if (self.xVelocity > 0){
    self.srcX = self.curframe * 72;
    self.frameCount++
    self.ctx.drawImage(self.imageRight, self.srcX, 0, 72, 72, xPosition, yPosition, self.size, self.size);
    if (self.frameCount > 10) {
      self.curframe++
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }

  } else if (self.yVelocity < 0) {
    self.frameCount++
    self.srcX = self.curframe * 75;
    self.ctx.drawImage(self.imageUp, self.srcX, 0, 75, 76, xPosition, yPosition, self.size, self.size);
    if (self.frameCount > 10) {
      self.curframe++
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }
  } else if (self.xVelocity < 0) {
    self.frameCount++
    self.srcX = self.curframe * 72;
    self.ctx.drawImage(self.imageLeft, self.srcX, 0, 72, 76, xPosition, yPosition, self.size, self.size);
    if (self.frameCount > 10) {
      self.curframe++
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }
    
  } 
};