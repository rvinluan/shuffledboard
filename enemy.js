var Enemy = function(scene) {
  this.gameObject = scene.add.ellipse(w/2, config.board.origin.y + config.board.height, 80, 80,0x000000).setInteractive();
  var body = Phaser.Physics.Matter.Matter.Bodies.circle(this.gameObject.x, this.gameObject.y, 40);
  this.matterBody = scene.matter.add.gameObject(this.gameObject, body);
  this.matterBody.body.frictionAir = 0.02;
  Phaser.Physics.Matter.Matter.Body.setDensity(this.matterBody.body, 1.1);
  Phaser.Physics.Matter.Matter.Body.set(this.matterBody.body, "restitution", 0.8);

  this.state = "LOADED";
}

Enemy.prototype.shoot = function(x, y) {
  this.state = "SHOT";
  var vector = new Phaser.Math.Vector2(x-this.gameObject.x, y-this.gameObject.y);
  Phaser.Physics.Matter.Matter.Body.applyForce(this.matterBody.body, this.gameObject, vector.scale(1));
}

Enemy.prototype.isMoving = function() {
  return !(this.matterBody.body.speed <= 0.1);
}

Enemy.prototype.isInside = function(rect) {
  return Phaser.Geom.Rectangle.Contains(rect, this.gameObject.x, this.gameObject.y);
}
