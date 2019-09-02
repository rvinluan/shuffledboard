var Biscuit = function(scene) {
  var spr = scene.add.sprite(w/2, config.board.origin.y + config.board.height - 40,'biscuit').setInteractive();
  this.gameObject = spr;
  var body = Phaser.Physics.Matter.Matter.Bodies.circle(this.gameObject.x, this.gameObject.y, 30);
  this.matterBody = scene.matter.add.gameObject(this.gameObject, body);
  this.matterBody.body.frictionAir = 0.02;
  Phaser.Physics.Matter.Matter.Body.setInertia(this.matterBody.body, Infinity);
  Phaser.Physics.Matter.Matter.Body.setDensity(this.matterBody.body, 1.3);
  Phaser.Physics.Matter.Matter.Body.set(this.matterBody.body, "restitution", 0.8);
  this.matterBody.displayOriginY = 40;

  this.state = "LOADED";

  this.gameObject.on('pointerdown', function(pointer) {
    if(this.state == "LOADED") {
      this.state = "AIMING";
      this.aimFrom = {
        x: pointer.x,
        y: pointer.y
      }
      // console.log("aiming...");
    }
  }.bind(this))
}

Biscuit.prototype.shoot = function(x, y) {
  this.state = "SHOT";
  var vector = new Phaser.Math.Vector2(x-this.aimFrom.x, y-this.aimFrom.y);
  Phaser.Physics.Matter.Matter.Body.applyForce(this.matterBody.body, this.aimFrom, vector.scale(1));
}

Biscuit.prototype.isMoving = function() {
  return !(this.matterBody.body.speed <= 0.1);
}

Biscuit.prototype.isInside = function(rect) {
  return Phaser.Geom.Rectangle.Contains(rect, this.gameObject.x, this.gameObject.y);
}
