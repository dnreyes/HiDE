/**
 * @author Delmy
 */
ig.module(
	'game.entities.laundry_basket'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityLaundry_basket = EntityFurniture.extend({
		size: {x: 64, y: 88},
		type: ig.Entity.TYPE.NONE,
		//Makes it movable for some reason...
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.BOTH,
		laundryText: false,
		laundryInteract: false,
		//hasKey: Math.floor((Math.random()*5) + 1), //randomizes the chances of having a key!
		animSheet: new ig.AnimationSheet('media/basket.png', 64, 64),
		init: function(x, y, settings) {
			this.name = 'Laundry';
			this.parent(x, y, settings);
			this.addAnim('basket', 1, [0]);
			this.addAnim('searched', 1, [1]);
			//this is to stop it from rolling forward forever!
			this.minBounceVelocity = 100;
			this.maxVel.x = 0;
			this.maxVel.y = 0;
            this.searched = false;
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			//Notifying the player to interact with the laundry basket. 
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && !this.laundryInteract){
				this.laundryText = true;
			}
			else{
				this.laundryText = false;
			}
			//checking if Booker interacts with the basket
			if(!this.searched && (Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && ig.input.pressed('interact')) {
				var keyy = Math.round(Math.random() * 10);
                if (keyy < 2) {
					other.keys++;
					//this.hasKey = 0;
				}
				this.laundryText = false;
				console.log(this.laundryText);
				this.currentAnim = this.anims.searched;
                this.searched = true;
				this.laundryInteract = true;
			} 
		}
	});
});