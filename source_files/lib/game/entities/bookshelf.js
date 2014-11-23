/**
 * @author Delmy
 */
ig.module(
	'game.entities.bookshelf'
)
.requires(
	'game.entities.furniture',
	'impact.entity'
)
.defines(function() {
	EntityBookshelf = EntityFurniture.extend({
		offset: {x: -8, y: 32},
		size: {x: 80, y: 72},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		//hasKey: Math.floor((Math.random()*10) + 1),
		animSheet: new ig.AnimationSheet('media/bookshelf.png', 64, 80),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('unsearched', 1, [0]);
			this.addAnim('searched', 1, [1]);
            this.searched = false;
		},
		
		update: function() {
			this.check(ig.game.getEntityByName('Darren Booker'));
			this.parent();
		},
		
		check: function(other) {
			//checking if Booker interacts
			if(!this.searched && (Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 104)) && ig.input.pressed('interact')) {
				var keyy = Math.round(Math.random() * 10);
                if (keyy < 2) {
					other.keys++;
					//this.hasKey = 0;
				}
				this.currentAnim = this.anims.searched;
                this.searched = true;
			} 
		}
	});
});
