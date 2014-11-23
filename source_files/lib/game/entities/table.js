/**
 * @author Delmy
 */
ig.module(
	'game.entities.table'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityTable = EntityFurniture.extend({
		offset: {x: 0, y: 32},
		size: {x: 80, y: 56},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/table1.png', 80, 48),
		init: function(x, y, settings) {
			this.addAnim('table', 1, [0]);
			this.parent(x, y, settings);
		}
		//Not much going to do with this, but it makes it easier to place!
	});
});
