/**
 * @author Delmy
 */
ig.module(
	'game.entities.kitchencounter3'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityKitchencounter3 = EntityFurniture.extend({
		offset: {x: -8, y: 0},
		size: {x: 80, y: 164},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/kitchencounter3.png', 64, 168),
		init: function(x, y, settings) {
			this.addAnim('desk', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
