function Field(scene) {
  this.scene = scene;
  this.graphics = scene.add.graphics();
  this.scoreGeometry = [];
  this.scoreValues = [];
  this.scoreText = [];

  this.archetypes = "ab".split("");
}

Field.prototype.init = function() {
  let type = this.archetypes[ Math.randomBetween(0,this.archetypes.length) ];
  this[type].call(this);
}

Field.prototype.destroy = function() {
  this.graphics.clear();
  this.scoreGeometry = [];
  this.scoreValues = []
  this.scoreText.forEach( g=>g.destroy());
}

/*
===
Three circles
===
*/
Field.prototype.a = function() {
  for(var i = 0; i < 3; i++) {
    let sx = config.width/2 + Math.randomBetween(-50,50);
    let sy = config.board.origin.y + 300 + (200*i);
    let sw = Math.randomBetween(100,200);
    let s = new Phaser.Geom.Circle(sx+16, sy+16, sw);
    let pts = Math.randomBetween(5, 10);
    let txt;
    this.scoreGeometry.push(s);
    this.scoreValues.push(pts);
    this.graphics.lineStyle(5, 0xfc7244);
    this.graphics.fillStyle(0xff0000)
    this.graphics.strokeCircleShape(s);
    txt = this.scene.add.text(sx, sy, pts, {
      fontSize: "32px",
      color: "#E15B3E"
    });
    this.scoreText.push(txt);
  }
}

/*
===
Five circles
===
*/
Field.prototype.b = function() {
  for(var i = 0; i < 5; i++) {
    let sx, sy, sw, s, pts, txt;
    if(i == 0) {
      sx = config.width/2;
      sy = config.board.origin.y + 500;
      sw = Math.randomBetween(80,100);
      s = new Phaser.Geom.Circle(sx, sy, sw);
      pts = Math.randomBetween(10, 15);
    } else if(i % 2 == 0) {
      sx = config.board.origin.x + Math.randomBetween(150,200);
      sy = config.board.origin.y + 150 + (200*(i-1));
      sw = Math.randomBetween(80,150);
      s = new Phaser.Geom.Circle(sx, sy, sw);
      pts = Math.randomBetween(3, 8);
    } else {
      sx = config.board.origin.x + config.board.width - Math.randomBetween(150,200);
      sy = config.board.origin.y + 150 + (200*(i-1));
      sw = Math.randomBetween(80,150);
      s = new Phaser.Geom.Circle(sx, sy, sw);
      pts = Math.randomBetween(3, 8);
    }
    this.scoreGeometry.push(s);
    this.scoreValues.push(pts);
    if(i == 0) {
      this.graphics.lineStyle(5, 0x8381C5);
      txt = this.scene.add.text(sx-16, sy-16, pts, {
        fontSize: "32px",
        color: "#8381C5"
      });
    } else {
      this.graphics.lineStyle(5, 0xfc7244);
      txt = this.scene.add.text(sx-16, sy-16, pts, {
        fontSize: "32px",
        color: "#fc7244"
      });
    }
    this.graphics.strokeCircleShape(s);
    this.scoreText.push(txt);

  }
}
