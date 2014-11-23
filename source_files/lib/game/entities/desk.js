/**
 * @author Delmy
 */
ig.module(
	'game.entities.desk'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityDesk = EntityFurniture.extend({
		offset: {x: 0, y: 32},
		size: {x: 80, y: 56},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/desk.png', 80, 48),
		init: function(x, y, settings) {
			this.addAnim('desk', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
