/**
 * @author Delmy
 */
ig.module(
	'game.entities.storage1'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityStorage1 = EntityFurniture.extend({
		offset: {x: 0, y: -16},
		size: {x: 120, y: 212},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/storage.png', 120, 160),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('storage', 1, [0]);
		},
		
		update: function() {
			this.parent();
		}
	});
});
