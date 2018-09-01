'user strict';

function Game() {
  var self = this;
  self.gameIsOver = false;

}

Game.prototype.startGame = function() {
  var self = this;
  self.gameMain = buildDom(
    `<main>
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>`
  );
  document.body.appendChild(self.gameMain);

  self.idTime = setTimeout(function () {
    self.gameOver();
  }, 3000);
};

Game.prototype.onOver = function(callback) {
  var self = this;
  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function() {
  var self = this;
  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function() {
  var self = this;
  self.gameMain.remove();
};