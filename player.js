'user strict';

function Player(canvasElement, lives) {
  var self = this;

  self.canvasElement = canvasElement;
  self.lives = lives;
  self.xVelocity = 0;
  self.yVelocity = 0;
  self.radius = 30;
  self.x = canvasElement.width / 2;
  self.y = canvasElement.height / 2;
  self.ctx = self.canvasElement.getContext('2d');
  self.speed = 3;
  self.curframe = 0;
  self.frameCount = 10;
  self.srcX = 0;

  self.imageUp = new Image();
  self.imageUp.src = 'Images/Playerup.png';

  self.imageDown = new Image();
  self.imageDown.src = 'Images/Playerdown.png';

  self.imageLeft = new Image();
  self.imageLeft.src = 'Images/Playerleft.png';

  self.imageRight = new Image();
  self.imageRight.src = 'Images/Playerright.png';
} 

Player.prototype.collided = function() {
  var self= this;
  
  self.lives--;
}

Player.prototype.collidesWithEnemy = function(enemy) {
  var self = this;

  const collidesRight = self.x + self.radius / 2 > enemy.x - enemy.size / 2;
  const collidesLeft = self.x - self.radius / 2 < enemy.x + enemy.size / 2;
  const collidesTop = self.y - self.radius / 2 < enemy.y + enemy.size / 2;
  const collidesBottom = self.y + self.radius / 2 > enemy.y - enemy.size / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
    return true;
  }
  return false;
}

Player.prototype.setYDirection = function(direction) {
  var self = this;

  self.yVelocity = direction;
};

Player.prototype.setXDirection = function(direction) {
  var self = this;

  self.xVelocity = direction;
};

Player.prototype.update = function() {
  var self = this;

  self.x = self.x + self.xVelocity * self.speed;
  self.y = self.y + self.yVelocity * self.speed;

  if (self.y < -self.canvasElement.height - 100) {
    self.yVelocity = 0.8;
  }
  if (self.y > self.canvasElement.height + 400) {
    self.yVelocity = -0.8;
  }
  if (self.x <  -self.canvasElement.width -100) {
    self.xVelocity = 0.8;
  }
  if (self.x > self.canvasElement.width + 200) {
    self.xVelocity = -0.8;
  }
};

Player.prototype.draw = function() {
  var self = this;

  var xPosition = self.x - self.radius;
  var yPosition = self.y - self.radius;
  if(self.xVelocity === 0 & self.yVelocity === 0) {
    self.srcX = self.curframe * 46;
    self.ctx.drawImage(self.imageUp, self.srcX, 0, 46, 46, xPosition, yPosition, self.radius, self.radius);
  }
  if (self.yVelocity > 0) {
    self.srcX = self.curframe * 46;
    self.frameCount++;
    self.ctx.drawImage(self.imageDown, self.srcX, 0, 46, 46, xPosition, yPosition, self.radius, self.radius);
    if (self.frameCount > 10) {
      self.curframe++;
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }

  }else if(self.yVelocity < 0) {
    self.frameCount++;
    self.srcX = self.curframe * 46;
    self.ctx.drawImage(self.imageUp, self.srcX, 0, 46, 46, xPosition, yPosition, self.radius, self.radius);
    if (self.frameCount > 10) {
      self.curframe++;
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }

  }else if (self.xVelocity > 0) {
    self.srcX = self.curframe * 45;
    self.frameCount++;
    self.ctx.drawImage(self.imageRight, self.srcX, 0, 45, 45, xPosition, yPosition, self.radius, self.radius);
    if (self.frameCount > 10) {
      self.curframe++;
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }

  } else if (self.xVelocity < 0) {
    self.frameCount++;
    self.srcX = self.curframe * 45;
    self.ctx.drawImage(self.imageLeft, self.srcX, 0, 45, 45, xPosition, yPosition, self.radius, self.radius);
    if (self.frameCount > 10) {
      self.curframe++;
      self.frameCount = 0;
      if (self.curframe === 4) self.curframe = 0;
    }
  }
};


