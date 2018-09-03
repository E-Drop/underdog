'use strict';

function Score(){
  var self = this;
  self.score = 0;
  self.playerName = idName;
  self.list = [
    
  ];
}

Score.prototype.saveScore = function (score) {
  if (!localStorage.getItem('highscore')){
    localStorage.getItem('highscore', score);
    localStorage.getItem('player', idName);
  }
  if (localStorage.getItem('highscore')) {
    if (score > localStorage.getItem('highscore')) {
      localStorage.getItem('highscore', score)
    }
  }
};

