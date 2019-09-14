function Field(scene) {
  this.scene = scene;
  this.graphics = scene.add.graphics();
  this.scoreGeometry = [];
  this.scoreValues = [];
  this.scoreText = [];
  this.traps = [];

  this.archetypes = "abcd".split("");

  this.defaultTextStyle = {
    fontSize: "40px",
    color: "#E15B3E",
    fontFamily: "Space Mono",
    fontWeight: "bold"
  }
  this.graphics.lineStyle(5, 0xE15B3E);
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
  this.traps.forEach( g=>g.destroy());
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
    let s = new Phaser.Geom.Circle(sx, sy, sw);
    let pts = Math.randomBetween(5, 10);
    let txt;
    this.scoreGeometry.push(s);
    this.scoreValues.push(pts);
    this.graphics.lineStyle(5, 0xfc7244);
    this.graphics.fillStyle(0xff0000)
    this.graphics.strokeCircleShape(s);
    txt = this.scene.add.text(sx-20, sy-20, pts, this.defaultTextStyle);
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
    if(i == 4) {
      sx = config.width/2;
      sy = config.board.origin.y + 500;
      sw = Math.randomBetween(80,100);
      s = new Phaser.Geom.Circle(sx, sy, sw);
      pts = Math.randomBetween(10, 15);
    } else if (i == 0) {
      sx = config.board.origin.x + Math.randomBetween(150,200);
      sy = config.board.origin.y + 150;
      sw = Math.randomBetween(80,150);
      s = new Phaser.Geom.Circle(sx, sy, sw);
      pts = Math.randomBetween(-7, -5);
    }
    else if(i % 2 == 0) {
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
    if(i == 4) {
      this.graphics.lineStyle(5, 0x8381C5);
      txt = this.scene.add.text(sx-20, sy-20, pts, this.defaultTextStyle);
      txt.style.setColor("#8381C5");
    } else if (i == 0) {
      this.graphics.lineStyle(5, 0x000000);
      txt = this.scene.add.text(sx, sy, pts, this.defaultTextStyle);
      txt.style.setColor("#ffffff")
      txt.setOrigin(0.5, 0.5);
      this.graphics.fillStyle(0x000000);
      this.graphics.fillCircleShape(s);
    }
    else {
      this.graphics.lineStyle(5, 0xfc7244);
      txt = this.scene.add.text(sx-20, sy-20, pts, this.defaultTextStyle);
    }
    this.graphics.strokeCircleShape(s);
    this.scoreText.push(txt);

  }
}

/*
===
Pyramid
===
*/
Field.prototype.c = function() {
  let q, txt, pts;
  let padding = 50;
  let h = 200;
  let spacing = 410;
  for(var i = 0; i < 2; i++) {
    q = new Phaser.Geom.Polygon(
      [
      config.board.origin.x + padding, config.board.origin.y + spacing*(i) + padding,
      config.board.origin.x + config.board.width - padding, config.board.origin.y + spacing*(i) + padding,
      config.board.origin.x + config.board.width - Math.randomBetween(80,100), config.board.origin.y + spacing*(i) + (h+padding),
      config.board.origin.x + Math.randomBetween(80,100), config.board.origin.y + spacing*(i) + (h+padding),
      config.board.origin.x + padding, config.board.origin.y + spacing*(i) + padding
      ]
    );
    if(i == 0) {
      pts = Math.randomBetween(10,15);
    } else {
      pts = Math.randomBetween(3,7);
    }
    txt = this.scene.add.text(config.board.center.x, q.points[0].y + 75, pts, this.defaultTextStyle)
    txt.setOrigin(0.5, 0);
    if(i == 0) {
      txt.style.setColor("#8381C5");
      this.graphics.lineStyle(5, 0x8381C5);
    } else {
      txt.style.setColor("#E15B3E");
      this.graphics.lineStyle(5, 0xE15B3E);
    }
    this.graphics.strokePoints(q.points);
    this.scoreGeometry.push(q);
    this.scoreValues.push(pts);
    this.scoreText.push(txt);
  }
  //death trap
  q = new Phaser.Geom.Polygon(
    [
      config.board.origin.x, config.board.origin.y + h + padding*2,
      config.board.origin.x + config.board.width, config.board.origin.y + h + padding*2,
      config.board.origin.x + config.board.width, config.board.origin.y + h + padding*2 + 100,
      config.board.origin.x, config.board.origin.y + h + padding*2 + 100,
      config.board.origin.x, config.board.origin.y + h + padding*2
    ]
  );
  pts = Math.randomBetween(-5,-8);
  txt = this.scene.add.text(config.board.center.x, q.points[0].y + 25, pts, this.defaultTextStyle)
  txt.setOrigin(0.5, 0);
  txt.style.setColor("#ffffff");
  this.graphics.fillStyle(0x000000);
  this.graphics.fillPoints(q.points);
  this.scoreGeometry.push(q);
  this.scoreValues.push(pts);
  this.scoreText.push(txt);
}

/*
===
Pegs
===
*/
Field.prototype.d = function(scene) {
  let spacing = config.board.width / 4;
  for(var i = 0; i < 3; i++) {
    let p = this.scene.add.sprite(config.board.origin.x + (spacing*(i+1)), config.board.center.y - 180,'peg');
    let b = Phaser.Physics.Matter.Matter.Bodies.circle(p.x, p.y, 5);
    let peg = this.scene.matter.add.gameObject(p, b);
    p.displayWidth = 20;
    p.displayHeight = 60;
    peg.displayOriginY = 25;
    Phaser.Physics.Matter.Matter.Body.setStatic(peg.body, true);
    this.traps.push(peg);
  }
  for(var i = 0; i < 2; i++) {
    let sx = config.width/2 + Math.randomBetween(-50,50);
    let sy = config.board.origin.y + 300 + Math.randomBetween(50,100)*i;
    let sw = Math.randomBetween(200,250) - 100*i;
    let s = new Phaser.Geom.Circle(sx, sy, sw);
    let pts = Math.randomBetween(5, 10);
    let txt;
    this.scoreGeometry.push(s);
    this.scoreValues.push(pts);
    this.graphics.lineStyle(5, 0xfc7244);
    if(i == 0) {
      this.graphics.lineStyle(5, 0x8381C5);
    }
    this.graphics.fillStyle(0xff0000)
    this.graphics.strokeCircleShape(s);
    txt = this.scene.add.text(sx-20, sy-20, pts, this.defaultTextStyle);
    if(i == 0) {
      txt.setColor("#8381C5");
    }
    this.scoreText.push(txt);
  }
}

Field.prototype.e = function(scene) {
  
}
