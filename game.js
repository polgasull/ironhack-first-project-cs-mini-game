function Game(options) {
      this.rows    = options.rows;
      this.columns = options.columns;
      this.target = new Target(options.rows, options.columns);
      this.points = 0;
      this.timer = 25;

  for (var rowIndex = 0; rowIndex < this.rows; rowIndex++){
     for (var columnIndex = 0; columnIndex < this.columns; columnIndex++){
       $('.container').append($('<div>')
         .addClass('cell board')
         .attr('data-row', rowIndex)
         .attr('data-col', columnIndex)
       );
     }
   }
  }

Game.prototype.generateTarget = function() {
  var targetType = Math.random() < 0.7;
  this.target = new Target(this.rows, this.columns, targetType);
};

Game.prototype.start = function() {
  var self = this;
  this.countdown = setInterval( function() {
    self.countDownTimer();
  }, 1000);
    this.generateTarget();

  this.autoClear = setInterval( function(){
      self.autoCreateTarget();
    }, 3000);
};

Game.prototype.drawTarget = function(){
  var selector = '[data-row=' + this.target.row + '][data-col=' + this.target.column + ']';
  $(selector).addClass('target');

  if (this.target.targetToKill){
    $(selector).addClass('terro');
  } else {
    $(selector).addClass('pollo');
  }

  this.touchTarget();
};

Game.prototype.autoCreateTarget = function() {
  $("div").unbind();
  this.removeAllTargets();
  this.generateTarget();
  this.drawTarget();
};

Game.prototype.touchTarget = function() {
  var self = this;
  $('.target').on("click",function(){
    var targetTouched = self.target.isTouched();
      if (targetTouched) {
        $(".target").addClass("deadTarget");
        self.countPoints();
        $("div").unbind();
        setTimeout(function(){
          $(".deadTarget").removeClass("deadTarget");
          self.autoCreateTarget();
        }, 2000);
      }
  });
};

Game.prototype.removeAllTargets = function() {
  $(".target").removeClass("target pollo terro");
};

Game.prototype.countPoints = function() {
  console.log(this.points);
  if (this.target.targetToKill) {
    $(".totalPoints span").text(this.points += 5);
  } else {
    $(".totalPoints span").text(this.points -= 5);
  }
};

Game.prototype.countDownTimer = function() {
    $(".displayTimer span").text(this.timer--);
    if (this.timer === -1) {
      $( ".container" ).append( "<p>GAME OVER</p>" );
      clearInterval(this.countdown);
      this.removeAllTargets();
      clearInterval(this.autoClear);
    }
};

Game.prototype.assignControlsToKeys = function() {
  $("body").on("keydown", function(event){
    switch (event.keyCode) {
      case 80:
        if (this.countdown) {
          this.stop();
        } else {
          this.start();
        }
    }
  }.bind(this));
};

Game.prototype.stop = function() {
  if (this.countdown) {
    clearInterval(this.countdown);
  }
};


$(document).ready(function() {

  myGame = new Game({
    rows: 5,
    columns: 12,
  });

  myGame.start();
  game.assignControlsToKeys();

});

console.log("LINKED!!!");
