'user strict';

function Sprite(canvasElement, image, sx, sy ,swidth, sheight, dx, dy, dw, dh) {
  var self = this;

  self.canvasElement = canvasElement;
  self.image = image;
  self.sx = sx;
  self.sy = sy;
  self.swidth = swidth;
  self.sheight = sheight;
  self.dx = dx;
  self.dy = dy;
  self.dw = dw;
  self.dh = dh;
  self.ctx = self.canvasElement.getContext('2d');
  self.frameIndex = 0;
  self.tickCount = 0;
  self.ticksPerFrame = 4;
} 

Sprite.prototype.update = function () {
  var self = this;

  self.tickCount++;

  if (self.tickCount > self.ticksPerFrame) {
    self.tickCount = 0;
    if(self.frameIndex === 4 ){
      self.frameIndex = 0;
    }
  }
};

Sprite.prototype.draw = function (image) {
  self.ctx.drawImage(image, self.frameIndex*self.swidth, 0, self.swidth, self.sheight, 0, 0, self.swidth, self.sheight)
}
