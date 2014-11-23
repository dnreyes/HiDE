/**
 * @author Delmy
 */
ig.module(
	'game.entities.toilet'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityToilet = EntityFurniture.extend({
		size: {x: 64, y: 96 },
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/toilet.png', 64, 64),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('toilet', 1, [0]);
		},
		
		update: function() {
			this.parent();
		}
	});
});
