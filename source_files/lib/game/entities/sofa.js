/**
 * @author Delmy
 */
ig.module(
	'game.entities.sofa'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntitySofa = EntityFurniture.extend({
		offset: {x: 0, y: 32},
		size: {x: 128, y: 64},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/front_sofa.png', 128, 64),
		init: function(x, y, settings) {
			this.addAnim('sofa', 1, [0]);
			this.parent(x, y, settings);
		}
	});
});
