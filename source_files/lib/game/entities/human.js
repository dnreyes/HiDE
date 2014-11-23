ig.module(
	'game.entities.human'	
)

.requires(
	'impact.entity',
	'plugin.ai'
)
.defines(function(){
	EntityHuman = ig.Entity.extend({
			
			booker: '',
			battle: false,
			size: {x:32, y:32},
			offset: {x:16, y:32},
			groan1: new ig.Sound('media/sounds/Groan1.mp3'),
			collides: ig.Entity.COLLIDES.PASSIVE,
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A,
			//Ai: new ig.ai(this),
			
			init: function(x, y, settings){
				this.booker = ig.game.getEntityByName('Darren Booker');
				//this.Ai = new ig.ai(this);
				this.parent(x,y,settings);
			},
			
		
			update: function(){
				if (ig.game.playing){
				this.parent();
				}
			},
			
			struggle: function(human, other){
				
				//backgroundMusic.fadeOut(.5);
				//backgroundMusic.pause();
				if (backgroundMusic.volume > 0){
					backgroundMusic.volue -= .05;
				}
				battleMusic.volume = .5;
				battleMusic.play();
				
				human.struggling = true;
				ig.game.battleTarget = other;
				human.target = other;
				other.struggling = true;
				other.target = human;
        		human.vel.x = 0;
  	          	human.vel.y = 0;
  	          	other.vel.x = 0;
  	          	other.vel.y = 0;
  	          	
  	          	
   	        	//other.currentAnim = other.anims.hokeypokey;
   	        	
   	        	
   	        	if (!this.battle){
   	        		//ig.music.volume = 1.0;
   	        		//ig.music.play('tsugaru');
   	        		this.getNewWeakness(other);
   	        		this.battle = true;
   	        		if (human.pos.x - other.pos.x < 0){
  	          			other.currentAnim = other.anims.fightleft;
  	          			human.getSpriteFightRight();
  	          		} else {
  	          			other.currentAnim = other.anims.fightright;
  	          			human.getSpriteFightLeft();
  	          		}
   	        	}
   	        	
   	        	if (human.health <= 0){
   	        		ig.game.playing = false;
   	        		this.endStruggle(human);
   	        		//human.die();
   	        	}
   	        	
   	        	else {
   	        		if (other.health <= 0){
   	        			//other.die();
   	        			this.endStruggle(human);
   	        		}
   	        	}
   	     },
        
   	     endStruggle: function(target){
   	     	this.groan1.play();
   	     	
   	     	if (ig.game.playing){
   	     		target.target = '';
   	     		target.struggling = false;
   	     		target.getSpriteIdleDown();
   	     		target.target = '';
   	     		ig.game.battleTarget = '';
        		this.battle = false;
        		battleMusic.fadeOut(1);
   	     		//backgroundMusic.volume = .1;
   	     		//backgroundMusic.next();
   	     		//backgroundMusic.play();
   	     		while (backgroundMusic.volume < .1){
   	     			backGroundMusic.volume += .05;
   	     		}
        	}
        },
        
        getNewWeakness: function(target){
        	target.weakness = Math.floor(Math.random() * ig.game.attacks.length);
        	if (target.weakness == 0){
        		target.notWeakness1 = 1;
        		target.notWeakness2 = 2;
        	} else if (target.weakness == 1){
        		target.notWeakness1 = 0;
        		target.notWeakness2 = 2;
        	} else {
        		target.notWeakness1 = 0;
        		target.notWeakness2 = 1;
        	}
        }
			
	});
	

});
