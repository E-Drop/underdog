'user strict';

function Tree(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.radius = 20;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
} 


Tree.prototype.update = function () {
  var self = this;

};

Tree.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'green'
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.beginPath();
  self.ctx.arc(xPosition ,yPosition ,self.radius ,0 ,2*Math.PI);
  self.ctx.fill();
};