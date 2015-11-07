'use strict';


function LangtonsAnt(canvasId, cellSize, ants, backgroundColor) {
  this._canvas = document.getElementById(canvasId);
  this._ctx = this._canvas.getContext('2d');
  this._nCol = Math.floor(this._canvas.width / cellSize);
  this._nRow = Math.floor(this._canvas.height / cellSize);
  this._cellSize = cellSize;
  this._board = new Array(this._nRow * this._nCol);
  this._backgroundColor = backgroundColor;
  this._ants = ants;
  this.init();
};


(function() {
  var direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
  };
  var N_DIRECTION = 4;

  LangtonsAnt.prototype.init = function() {
    for (var i = 0; i < this._board.length; i++) {
      this._board[i] = 0;
    }
    var __this = this;
    this._ants.forEach(function(ant) {
      ant.x %= __this._nCol;
      ant.y %= __this._nRow;
      ant.dir %= N_DIRECTION;
      ant.id = i + 1;
    });
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  };

  LangtonsAnt.prototype.update = function() {
    var __this = this;
    this._ants.forEach(function(ant) {
      var posIdx = ant.y * __this._nCol + ant.x;
      if (__this._board[posIdx] == 0) {
        ant.dir = (ant.dir + 1) % N_DIRECTION;
        __this._board[posIdx] = ants.id;
        __this._ctx.fillStyle = ant.color;
        __this._ctx.fillRect(ant.x * __this._cellSize, ant.y * __this._cellSize, __this._cellSize, __this._cellSize);
      } else {
        ant.dir = (ant.dir - 1 + N_DIRECTION) % N_DIRECTION;
        __this._board[posIdx] = 0;
        __this._ctx.clearRect(ant.x * __this._cellSize, ant.y * __this._cellSize, __this._cellSize, __this._cellSize);
      }
      switch (ant.dir) {
        case direction.UP:
          ant.y = (ant.y - 1 + __this._nRow) % __this._nRow;
          break;
        case direction.RIGHT:
          ant.x = (ant.x + 1) % __this._nCol;
          break;
        case direction.DOWN:
          ant.y = (ant.y + 1) % __this._nRow;
          break;
        case direction.LEFT:
          ant.x = (ant.x - 1 + __this._nCol) % __this._nCol;
          break;
      }
    });
  };
})();
