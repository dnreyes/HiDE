/**
 * @author Delmy
 */
ig.module(
	'game.entities.pooltable'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityPooltable = EntityFurniture.extend({
		offset: {x: -4, y: 32},
		size: {x: 208, y: 88},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/pooltable.png', 208, 88),
		timer: new ig.Timer(3),
		init: function(x, y, settings) {
			this.addAnim('normal', 1, [0]);
			this.addAnim('move', 1, [0, 1, 2]);
			this.parent(x, y, settings);
		},		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));

			this.parent();
		},
		
		check: function(other) {
			//checking if Booker interacts
			if((Math.abs(this.pos.x - other.pos.x) <= 104 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && ig.input.pressed('interact')) {
				this.currentAnim = this.anims.move;
			}
			if (this.timer.delta() > 0) {
				this.currentAnim = this.anims.normal;
			}
		}
	});
});
