/**
 * @author Delmy
 */
ig.module(
	'game.entities.kitchencounter2'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityKitchencounter2 = EntityFurniture.extend({
		offset: {x: -8, y: 0},
		size: {x: 80, y: 200},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/kitchencounter2.png', 64, 168),
		init: function(x, y, settings) {
			this.addAnim('desk', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
