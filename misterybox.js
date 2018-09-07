'user strict';

function Box(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.size = 40;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');

  self.image = new Image();
  self.image.src = 'Images/misterybox.png';
} 

Box.prototype.collide = function () {


}

Box.prototype.draw = function () {
  var self = this;

  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.drawImage(self.image, xPosition, yPosition, self.size, self.size);
};