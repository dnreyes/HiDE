/**
 * @author Delmy
 */
ig.module(
	'game.entities.bed'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityBed = EntityFurniture.extend({
		size: {x: 64, y: 88},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/bed.png', 64, 64),
		init: function(x, y, settings) {
			this.addAnim('bed', 1, [0]);
			this.parent(x, y, settings);
		}
		//Not much going to do with this, but it makes it easier to place!
	});
});
