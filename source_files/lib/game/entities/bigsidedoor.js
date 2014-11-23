/**
 * @author Delmy
 */
ig.module(
	'game.entities.bigsidedoor'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBigsidedoor = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		size: {x: 64, y: 128},
		locked: true,
		animSheet: new ig.AnimationSheet('media/bigsidedoor.png', 64, 128),
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
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 128)) && ig.input.pressed('interact')) {
				if ( other.keys > 0){
					console.log("You have " + other.keys + " keys");
					this.currentAnim = this.anims.open;
					this.locked = false;
					other.keys--;
					ig.game.collisionMap.setTile(this.pos.x, this.pos.y, 0);
					console.log("Door Opened");
					this.collides = ig.Entity.COLLIDES.PASSIVE;
				} else {
					console.log("You have " + other.keys + " keys");
				}
			}
		}
	});
	
});
