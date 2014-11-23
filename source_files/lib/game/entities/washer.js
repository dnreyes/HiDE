/**
 * @author Delmy
 */
ig.module(
	'game.entities.washer'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityWasher = EntityFurniture.extend({
		offset: {x: -8, y: 32},
		size: {x: 76, y: 64},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		hasKey: Math.floor((Math.random()*10) + 1),
		animSheet: new ig.AnimationSheet('media/washer.png', 64, 64),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('unsearched', 1, [0]);
			this.addAnim('searched', 1, [1]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			//checking if Booker interacts
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 104)) && ig.input.pressed('interact')) {
				if (this.hasKey > 7) {
					other.keys++;
					this.hasKey = 0;
				}
				this.currentAnim = this.anims.searched;
			} 
		}
	});
});
