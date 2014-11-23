ig.module(
	'game.entities.enemy'	
)

.requires(
	'game.entities.human'
)
.defines(function(){
	EntityEnemy = EntityHuman.extend({
			
			size: {x:32, y:32},
			offset: {x:16, y:32},
			collides: ig.Entity.COLLIDES.ACTIVE,
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A,
			health: 10,
			struggling: false,
			target: '',
			punch1: new ig.Sound('media/sounds/DPunch1.mp3'),
			punch2: new ig.Sound('media/sounds/DPunch2.mp3'),
			punch3: new ig.Sound('media/sounds/DPunch3.mp3'),
			punch4: new ig.Sound('media/sounds/DPunch4.mp3'),
			punch5: new ig.Sound('media/sounds/DPunch5.mp3'),
			punch6: new ig.Sound('media/sounds/DPunch6.mp3'),
			weakness: 0,
			notWeakness1: 1,
			notWeakness2: 2,
			enemyDamage: 3,
			
			init: function(x, y, settings){
				this.punches = [this.punch1, this.punch2, this.punch3, this.punch4, this.punch5, this.punch6, /*this.punch7, this.punch8, this.punch9*/];
				this.Ai = new ig.ai(this);
				this.parent(x,y,settings);
			},
			
		
			//Inmate moving around depending on the different actions.
			update: function(){
				if (ig.game.playing){
				
				if (!this.struggling){
					
					
				}
				
          		this.parent();
          	}
			},
			
			struggle: function(human, other){
				other.struggling = true;
				var rand = (Math.round(Math.random() * 100)) + 1;
				
				if (rand <= 4){
					if (other.currentAnim == other.anims.fightright || other.currentAnim == other.anims.punchrightrighthand || other.currentAnim == other.anims.punchrightlefthand){
						var rightLeft = Math.floor(Math.random() * 2);
						if (rightLeft == 0){
							console.log('right right');
							other.currentAnim = other.anims.punchrightrighthand.rewind();
						} else {
							console.log('right left');
							other.currentAnim = other.anims.punchrightlefthand.rewind();
						}
					} else if (other.currentAnim == other.anims.fightleft || other.currentAnim == other.anims.punchleftrighthand || other.currentAnim == other.anims.punchleftlefthand){
						var rightLeft = Math.floor(Math.random() * 2);
						if (rightLeft == 0){
							console.log('left right');
							other.currentAnim = other.anims.punchleftrighthand.rewind();
						} else {
							console.log('left left');
							other.currentAnim = other.anims.punchleftlefthand.rewind();
						}
					}
					this.punchSound();
					human.receiveDamage(this.enemyDamage - (.3 * human.officers), other);
				}
				this.parent(human, other);
			},
			
			endStruggle: function(target){
				this.parent(target);
			},
			
			punchSound: function(){
				
				var index = Math.floor((Math.random()*6));
				this.punches[index].play();
			}
			
	});
	

});

