'user strict';

function Tree(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.radius = 20;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');

  self.image = new Image();
  self.image.src = 'Images/trees.png';
} 

Tree.prototype.update = function () {
  var self = this;

};

Tree.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'green'
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.drawImage(self.image, xPosition, yPosition, 80, 80);
};