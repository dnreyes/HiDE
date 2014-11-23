/**
 * @author Delmy
 */
ig.module(
	'game.entities.medkit'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityMedkit = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		size: {x: 64, y: 64},
		animSheet: new ig.AnimationSheet('media/healthkit.png', 64, 64),
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('medkit', 1, [0]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact') && other.health <= 90) {
				other.health += 10;
				//console.log("You picked up a key. You have " + other.keys + " keys.");
				this.kill();
			}
		}
	});
});
