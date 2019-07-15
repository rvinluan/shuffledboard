var Biscuit = function(scene, group) {
  this.gameObject = scene.add.ellipse(w/2, h-200, 100, 100,0x6666ff).setInteractive();
  scene.physics.add.existing(this.gameObject);

  this.gameObject.body.velocity.x = 0;
  this.gameObject.body.velocity.y = 0;
  // this.gameObject.body.setMaxSpeed(1000);
  this.gameObject.body.bounce.x = 0.1;
  this.gameObject.body.bounce.y = 0.1;
  this.gameObject.body.allowDrag = true;
  this.gameObject.body.collideWorldBounds = true;

  // group.add(this.gameObject);

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
  var vector = new Phaser.Math.Vector2(x - this.aimFrom.x, y - this.aimFrom.y);
  // console.log("shot length: "+vector.length());
  this.gameObject.body.setVelocity(vector.x*2, vector.y*2);
  this.gameObject.body.setDrag(100, 100);
}

Biscuit.prototype.isMoving = function() {
  return !(this.gameObject.body.velocity.length() == 0);
}
