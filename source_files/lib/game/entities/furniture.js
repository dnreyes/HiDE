/**
 * @author Delmy
 */
ig.module(
	'game.entities.furniture'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityFurniture = ig.Entity.extend({
		//inital stuff for furniture.
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		size: {x: 64, y: 64},
		
		init: function(x, y , settings) {
			this.parent(x, y, settings);
		},
		
		update: function() {
			this.parent();
		}
	});
});
