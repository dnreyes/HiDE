/**
 * @author Delmy
 */
ig.module(
	'game.entities.flashlight'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityFlashlight = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		size: {x: 64, y: 64},
		animSheet: new ig.AnimationSheet('media/flashlight.png', 64, 64),
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('flashlight', 1, [0]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			//Checks to see if Booker picks it up, if he does, then it disappears.
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact')) {
				other.hasFlashlight = true;
				console.log("You picked up a flashlight. Click F to use.");
				other.textFlashlight = true;
				this.kill();
			}
		}
	});
});
