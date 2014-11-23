ig.module(
	'game.entities.officer3'
)

.requires(
	'impact.entity'
)

.defines(function(){
	EntityOfficer3 = ig.Entity.extend({
		
		saving: false,
		text: false,
		//name: 'Officer2',
		size: {x: 64, y: 88},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		//health = 50;
		textTimer: new ig.Timer([10]),
		display: false,
		font: '',
		showDistance: false,
		animSheet: new ig.AnimationSheet('media/police_3.png', 64,64),
		
		init: function(x,y,settings){
			this.name = 'Officer2';
			this.addAnim('follow', 1, [0]);
			this.booker = ig.game.getEntityByName('Darren Booker');
			this.officer = ig.game.getEntityByName('Officer1');
			
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
		},
		check: function(other){
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && ig.input.pressed('interact')) {
				//ig.game.savedofficer = true;
				this.booker.officers++;
				this.text = false;
				this.kill();
			} 
			
			if((Math.abs(this.pos.x - other.pos.x) <= 64 && (Math.abs(this.pos.y - other.pos.y) <= 88)) && !ig.input.pressed('interact') && (!this.officer.text)
				&& this.distanceTo(this.booker) < 50){
				this.text = true;
			}
			else this.text = false;
		},
	});
});