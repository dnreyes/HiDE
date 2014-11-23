/**
 * @author Delmy
 */
ig.module(
	'game.entities.sink'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntitySink = EntityFurniture.extend({
		size: {x: 48, y: 80 },
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/sink.png', 48, 48),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('sink', 1, [0]);
		},
		
		update: function() {
			this.parent();
		}
	});
});
