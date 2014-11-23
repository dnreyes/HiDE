/**
 * @author Delmy
 */
ig.module(
	'game.entities.fridge'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityFridge = EntityFurniture.extend({
		offset: {x: -8, y: 64},
		size: {x: 80, y: 96},
		type: ig.Entity.TYPE.NONE,
		name: 'fridge',
		fridgeText: false,
		fridgeInteract: false,
		//Makes it movable for some reason...
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		hasKey: true,
		animSheet: new ig.AnimationSheet('media/fridge.png', 64, 112),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('unsearched', 1, [0]);
			this.addAnim('searched', 1, [1]);
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <=104)) && !this.fridgeInteract){
				this.fridgeText = true;
			}
			else this.fridgeText = false;
			//checking if Booker interacts
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 104)) && ig.input.pressed('interact')) {
					this.fridgeText = false;
					if(this.hasKey) {
						other.keys++;
						this.hasKey = false;
					}
					this.fridgeInteract = true;
				this.currentAnim = this.anims.searched;
			} 
		}
	});
});
