ig.module(
	'game.entities.officer1'
)

.requires(
	'impact.entity'
)

.defines(function(){
	EntityOfficer1 = ig.Entity.extend({
		
		saving: false,
		text: false,
		size: {x: 64, y: 88},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		//health = 50;
		textTimer: '',
		font: '',
		showDistance: false,
		animSheet: new ig.AnimationSheet('media/police_girl1.png', 64,64),
		//image: new ig.Image('media/police_girl1.png')
		//animSheet: new ig.AnimationSheet('media/policeicon.png', 38,64),
		
		init: function(x,y,settings){
			this.name = 'Officer1';
			this.last.x =x;
            this.last.y = y;
			this.addAnim('follow', 1, [0]);
			this.booker = ig.game.getEntityByName('Darren Booker');
			this.officer2 = ig.game.getEntityByName('Officer2');
			this.font = new ig.Font('media/whiteFont.png');
			this.parent(x,y,settings);
		},
		
		
		draw: function(){
			this.parent();
			
		},
		
		update: function() {
			if (!this.booker){
				this.booker = ig.game.getEntityByName('Darren Booker');
			}
		
			this.check(this.booker);
			//this.collideWith(this.booker);
			
		},
		check: function(other){
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && ig.input.pressed('interact')) {
				//ig.game.savedofficer = true;
				this.booker.officers++;
				//this.currentAnim = this.anims('One police');
				//ig.game.officertext = false;
				this.text = false;
				this.kill();
			}
			
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && !ig.input.pressed('interact')){
				this.text = true;
			}
		},
	
	});
});