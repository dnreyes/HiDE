/**
 * @author Delmy
 */
ig.module(
	'game.entities.exit'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityExit = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		size: {x: 64, y: 64},
		locked: true,
		animSheet: new ig.AnimationSheet('media/door.png', 64,64),
		init: function(x, y, settings) {
			this.parent(x,y,settings);
			this.addAnim('closed', 1, [0]);
			this.addAnim('open', 1, [1]);
		},
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		check: function(other) {
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact')) {
				if ( other.hasGoldKey && other.officers == 5){
					//console.log("You used the gold key.");
					this.currentAnim = this.anims.open;
					this.locked = false;
					other.hasGoldKey = false;
					ig.game.collisionMap.setTile(this.pos.x, this.pos.y, 0);
					//console.log("Door Opened");
					ig.game.hashtagWinning = true;
					this.collides = ig.Entity.COLLIDES.PASSIVE;
				} else if (other.officers < 5){
					console.log("Can't leave the others behind..");
				}
				else {
					console.log("Needs a different key..");
				}
			}
		}
	});
	
});
