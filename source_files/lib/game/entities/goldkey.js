/**
 * @author Delmy
 */
ig.module(
	'game.entities.goldkey'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityGoldkey = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		size: {x: 64, y: 64},
		keyText: false,
		keyInteract: false,
		animSheet: new ig.AnimationSheet('media/goldkey.png', 64, 64),
		
		init: function(x, y, settings) {
			this.name = 'Gold Key';
			this.parent(x, y, settings);
			this.addAnim('key', 1, [0]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && !this.keyInteract){
				this.keyText = true;
			}
			else this.keyText = false;
			
			//Checks to see if Booker picks it up, if he does, then it disappears.
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 64)) && ig.input.pressed('interact')) {
				other.hasGoldKey = true;
				this.keyInteract = true;
				this.keyText = false;
				console.log("You picked up the gold key.");
				this.kill();
			}
		}
	});
});
