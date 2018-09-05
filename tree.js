'user strict';

function Tree(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.radius = 80;

  self.image = new Image();
  self.image.src = 'Images/trees.png';
} 

Tree.prototype.draw = function () {
  var self = this;
  
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.drawImage(self.image, xPosition, yPosition, self.radius, self.radius);
};