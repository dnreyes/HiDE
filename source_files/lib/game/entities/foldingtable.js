/**
 * @author Delmy
 */
ig.module(
	'game.entities.foldingtable'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityFoldingtable = EntityFurniture.extend({
		offset: {x: -8, y: 24},
		size: {x: 80, y: 64},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/foldingtable.png', 80, 64),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('unsearched', 1, [0]);

		},
		
		update: function() {
			this.parent();
		}
	});
});
