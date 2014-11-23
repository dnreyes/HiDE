/**
 * @author Delmy
 */
ig.module(
	'game.entities.infirmkey'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityInfirmkey = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		size: {x: 32, y: 32},
		infirmkeyText: false, 
		interact: false,
		name: "Infirm Key",
		animSheet: new ig.AnimationSheet('media/infirmarykey.png', 32, 32),
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('key', 1, [0]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		
		check: function(other) {
			if((Math.abs(this.pos.x - other.pos.x) <= 32 && (Math.abs(this.pos.y - other.pos.y) <= 32)) && !this.interact) {
				console.log('infirm key');
				this.infirmkeyText = true;
			}
			
			//Checks to see if Booker picks it up, if he does, then it disappears.
			if((Math.abs(this.pos.x - other.pos.x) <= 32 && (Math.abs(this.pos.y - other.pos.y) <= 32)) && ig.input.pressed('interact')) {
				this.infirmkeyText = false;
				this.interact = true;
				other.hasInfirmKey = true;
				console.log("You picked up the infirmary key.");
				this.kill();
			}
		}
	});
});
