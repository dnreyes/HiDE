/**
 * @author Delmy
 */
ig.module(
	'game.entities.kitchencounter'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityKitchencounter = EntityFurniture.extend({
		offset: {x: -8, y: 32},
		size: {x: 184, y: 64},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/kitchencounter1.png', 168, 64),
		init: function(x, y, settings) {
			this.addAnim('desk', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
