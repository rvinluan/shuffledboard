var Enemy = function(scene, num) {
  var spr = scene.add.sprite(
    enemyVectors[(num)*2],
    config.board.origin.y + config.board.height,
    'enemy').setInteractive();
  this.gameObject = spr;
  var body = Phaser.Physics.Matter.Matter.Bodies.circle(this.gameObject.x, this.gameObject.y, 30);
  this.matterBody = scene.matter.add.gameObject(this.gameObject, body);
  this.matterBody.body.frictionAir = 0.02;
  Phaser.Physics.Matter.Matter.Body.setInertia(this.matterBody.body, Infinity);
  Phaser.Physics.Matter.Matter.Body.setDensity(this.matterBody.body, 3);
  Phaser.Physics.Matter.Matter.Body.set(this.matterBody.body, "restitution", 0.8);
  this.matterBody.displayOriginY = 40;
  this.strength = Math.randomBetween(30,50) / 10;
  // console.log(this.strength);

  this.state = "LOADED";
}

Enemy.prototype.shoot = function(x, y) {
  this.state = "SHOT";
  var vector = new Phaser.Math.Vector2(x-this.gameObject.x, y-this.gameObject.y);
  Phaser.Physics.Matter.Matter.Body.applyForce(this.matterBody.body, this.gameObject, vector.scale(this.strength));
}

Enemy.prototype.isMoving = function() {
  return !(this.matterBody.body.speed <= 0.1);
}

Enemy.prototype.isInside = function(rect) {
  return Phaser.Geom.Rectangle.Contains(rect, this.gameObject.x, this.gameObject.y);
}
