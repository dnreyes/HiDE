/**
 * @author Delmy
 */
ig.module(
	'game.entities.chair'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityChair = EntityFurniture.extend({
		offset: {x: 0, y: 32},
		size: {x:40, y: 64},
		type: ig.Entity.TYPE.NONE,
		//Makes it movable for some reason...
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.BOTH,
		hasKey: Math.floor((Math.random()*5) + 1), //randomizes the chances of having a key!
		animSheet: new ig.AnimationSheet('media/front_chair.png', 40, 64),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('chair', 1, [0]);
			//this is to stop it from rolling forward forever!
			this.minBounceVelocity = 80;
			this.maxVel.x = 0;
			this.maxVel.y = 0;
		},
		
		update: function() {
			this.parent();
		}
	});
});
