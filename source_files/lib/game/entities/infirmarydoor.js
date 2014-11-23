/**
 * @author Delmy
 */
ig.module(
	'game.entities.infirmarydoor'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityInfirmarydoor = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		size: {x: 128, y: 64},
		locked: true,
		animSheet: new ig.AnimationSheet('media/infirmarydoor.png', 128, 64),
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
			if((Math.abs(this.pos.x - other.pos.x) <= 128 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact')) {
				if ( other.hasInfirmKey){
					console.log("You used the infirmary key.");
					this.currentAnim = this.anims.open;
					this.locked = false;
					this.collides = ig.Entity.COLLIDES.PASSIVE;
				}
				else {
					console.log("Needs a different key..");
				}
			}
		}
	});
	
});
