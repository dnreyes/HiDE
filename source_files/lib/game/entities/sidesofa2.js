/**
 * @author Delmy
 */
ig.module(
	'game.entities.sidesofa2'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntitySidesofa2 = EntityFurniture.extend({
		offset: {x: 0, y: 32},
		size: {x: 56, y: 64},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/left_sofa.png', 56, 64),
		init: function(x, y, settings) {
			this.addAnim('sofa', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
