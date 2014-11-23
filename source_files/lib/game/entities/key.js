/**
 * @author Delmy
 */
ig.module(
	'game.entities.key'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityKey = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		size: {x: 64, y: 64},
		keyText: false,
		keyInteract: false,
		animSheet: new ig.AnimationSheet('media/key.png', 64, 64),
				
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('key', 1, [0]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact')) {
				other.keys++;
				
				this.keyText = true;
				//this.keyInteract = true;
				//console.log("You picked up a key. You have " + other.keys + " keys.");
				this.kill();
			}
			//if()
		}
	});
});
