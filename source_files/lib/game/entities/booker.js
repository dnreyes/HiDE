ig.module(
	'game.entities.booker'
)
.requires(
	'game.entities.enemy'
)

.defines(function(){
    EntityBooker = EntityHuman.extend({
    	
    	health: 100,
    	//zIndex: 1000,
    	maxStamina: 1000,
    	maxFlashlight: 1000,
    	bookerDamage: 2,
    	maxVel: {x:225, y:225},
    	target: '',
    	struggling: false,
    	moveSpeed: 90,
    	music: false,
    	sprinting: 1,
    	sprintingMultiplier: 3,
    	notSprinting: 1,
    	staminaLoss: 3,
    	staminaRecharge: 2,
    	canUseFlashlight: true,
    	canSprint: true,
		size: {x:32, y:32},
		offset: {x: 16, y:32},
		animSheet: new ig.AnimationSheet('media/main_walk.png', 64, 64),
		officers: 0,
		textFlashlight: false,
		
        init: function (x, y, settings){
            this.name = 'Darren Booker';
            //this.img = new ig.Image('media/main_walk.png');
            //
           //this.img = new ig.Image('media/main_walk.png'),
          
           //this.anim = new ig.Animation(this.animSheet, 0.2, [0,1],true); 
            
            this.addAnim('hokeypokey', .121, [0,1,0,4,5,4,8,9,8,12,13,12]);
            
            //No damage, no flashlight
            this.addAnim('idledown',1,[0,1]);
            this.addAnim('idleup', 1, [4,5]);
            this.addAnim('idleright', 1, [8,9]);
            this.addAnim('idleleft', 1, [12,13]);
            
            this.addAnim('right', 0.27, [8,9,10,11]);
            this.addAnim('left', 0.27, [12,13,14,15]);
            this.addAnim('up', 0.27, [4,5,6,7]);
            this.addAnim('down', 0.27, [0,1,2,3]);
            
            this.addAnim('rightsprint', 0.1, [8,9,10,11]);
            this.addAnim('leftsprint', 0.1, [12,13,14,15]);
            this.addAnim('upsprint', 0.1, [4,5,6,7]);
            this.addAnim('downsprint', 0.1, [0,1,2,3]);
            
            //No damage, with flashlight
            this.addAnim('idledownfl',1,[64,65]);
            this.addAnim('idleupfl', 1, [68,69]);
            this.addAnim('idlerightfl', 1, [72,73]);
            this.addAnim('idleleftfl', 1, [76,77]);
            
            this.addAnim('rightfl', 0.27, [72,73,74,75]);
            this.addAnim('leftfl', 0.27, [76,77,78,79]);
            this.addAnim('upfl', 0.27, [68,69,70,71]);
            this.addAnim('downfl', 0.27, [64,65,66,67]);
            
            this.addAnim('rightsprintfl', 0.1, [72,73,74,75]);
            this.addAnim('leftsprintfl', 0.1, [76,77,78,79]);
            this.addAnim('upsprintfl', 0.1, [68,69,70,71]);
            this.addAnim('downsprintfl', 0.1, [64,65,66,67]);
            
            
            //75 health, no flashlight
            this.addAnim('idledown75',1,[16,17]);
            this.addAnim('idleup75', 1, [20,21]);
            this.addAnim('idleright75', 1, [24,25]);
            this.addAnim('idleleft75', 1, [28,29]);
            
            this.addAnim('right75', 0.27, [24,25,26,27]);
            this.addAnim('left75', 0.27, [28,29,30,31]);
            this.addAnim('up75', 0.27, [20,21,22,23]);
            this.addAnim('down75', 0.27, [16,17,18,19]);
            
            this.addAnim('rightsprint75', 0.1, [24,25,26,27]);
            this.addAnim('leftsprint75', 0.1, [28,29,30,31]);
            this.addAnim('upsprint75', 0.1, [20,21,22,23]);
            this.addAnim('downsprint75', 0.1, [16,17,18,19]);
            
            //75 health, with flashlight
            this.addAnim('idledown75fl',1,[80,81]);
            this.addAnim('idleup75fl', 1, [84,85]);
            this.addAnim('idleright75fl', 1, [88,89]);
            this.addAnim('idleleft75fl', 1, [92,93]);
            
            this.addAnim('right75fl', 0.27, [88,89,90,91]);
            this.addAnim('left75fl', 0.27, [92,93,94,95]);
            this.addAnim('up75fl', 0.27, [84,85,86,87]);
            this.addAnim('down75fl', 0.27, [80,81,82,83]);
            
            this.addAnim('rightsprint75fl', 0.1, [88,89,90,91]);
            this.addAnim('leftsprint75fl', 0.1, [92,93,94,95]);
            this.addAnim('upsprint75fl', 0.1, [84,85,86,87]);
            this.addAnim('downsprint75fl', 0.1, [80,81,82,83]);
            
            
            //50 health, no flashlight
            this.addAnim('idledown50',1,[32,33]);
            this.addAnim('idleup50', 1, [36,37]);
            this.addAnim('idleright50', 1, [40,42]);
            this.addAnim('idleleft50', 1, [44,45]);
            
            this.addAnim('right50', 0.27, [40,41,42,43]);
            this.addAnim('left50', 0.27, [44,45,46,47]);
            this.addAnim('up50', 0.27, [36,37,38,39]);
            this.addAnim('down50', 0.27, [32,33,34,35]);
            
            this.addAnim('rightsprint50', 0.1, [40,41,42,43]);
            this.addAnim('leftsprint50', 0.1, [44,45,46,47]);
            this.addAnim('upsprint50', 0.1, [36,37,38,39]);
            this.addAnim('downsprint50', 0.1, [32,33,34,35]);
            
            //50 health, with flashlight
            this.addAnim('idledown50fl',1,[96,97]);
            this.addAnim('idleup50fl', 1, [100,101]);
            this.addAnim('idleright50fl', 1, [104,105]);
            this.addAnim('idleleft50fl', 1, [108,109]);
            
            this.addAnim('right50fl', 0.27, [104,105,106,107]);
            this.addAnim('left50fl', 0.27, [108,109,110,111]);
            this.addAnim('up50fl', 0.27, [100,101,102,103]);
            this.addAnim('down50fl', 0.27, [96,97,98,99]);
            
            this.addAnim('rightsprint50fl', 0.1, [104,105,106,107]);
            this.addAnim('leftsprint50fl', 0.1, [108,109,110,111]);
            this.addAnim('upsprint50fl', 0.1, [100,101,102,103]);
            this.addAnim('downsprint50fl', 0.1, [96,97,98,99]);
            
            
            //25 health, no flashlight
            this.addAnim('idledown25',1,[48,49]);
            this.addAnim('idleup25', 1, [52,53]);
            this.addAnim('idleright25', 1, [56,57]);
            this.addAnim('idleleft25', 1, [60,61]);
            
            this.addAnim('right25', 0.27, [56,57,58,59]);
            this.addAnim('left25', 0.27, [60,61,62,63]);
            this.addAnim('up25', 0.27, [52,53,54,55]);
            this.addAnim('down25', 0.27, [48,49,50,51]);
            
            this.addAnim('rightsprint25', 0.1, [56,57,58,59]);
            this.addAnim('leftsprint25', 0.1, [60,61,62,63]);
            this.addAnim('upsprint25', 0.1, [52,53,54,55]);
            this.addAnim('downsprint25', 0.1, [48,49,50,51]);
            
            //25 health, with flashlight
            this.addAnim('idledown25fl',1,[112,113]);
            this.addAnim('idleup25fl', 1, [116,117]);
            this.addAnim('idleright25fl', 1, [120,121]);
            this.addAnim('idleleft25fl', 1, [124,125]);
            
            this.addAnim('right25fl', 0.27, [120,121,122,123]);
            this.addAnim('left25fl', 0.27, [124,125,126,127]);
            this.addAnim('up25fl', 0.27, [116,117,118,119]);
            this.addAnim('down25fl', 0.27, [112,113,114,115]);
            
            this.addAnim('rightsprint25fl', 0.1, [120,121,122,123]);
            this.addAnim('leftsprint25fl', 0.1, [124,125,126,127]);
            this.addAnim('upsprint25fl', 0.1, [116,117,118,119]);
            this.addAnim('downsprint25fl', 0.1, [112,113,114,115]);
            
            // Fighting animation, full health
            this.addAnim('fightright', 1, [128]);
            this.addAnim('fightleft', 1, [132]);
            
            // Fighting animation, 75 health
            this.addAnim('fightright75', 1, [136]);
            this.addAnim('fightleft75', 1, [140]);
            
            // Fighting animation, 50 health
            this.addAnim('fightright50', 1, [144]);
            this.addAnim('fightleft50', 1, [148]);
            
            // Fighting animation, 25 health
            this.addAnim('fightright25', 1, [152]);
            this.addAnim('fightleft25', 1, [156]);
            
            // Punching animations, right and left hand hands, full health
            this.addAnim('punchrightlefthand', .08, [128, 129, 128], true);
            this.addAnim('punchrightrighthand', .08, [130, 131, 130], true);
            this.addAnim('punchleftlefthand', .08, [132, 133, 132], true);
            this.addAnim('punchleftrighthand', .08, [134, 135, 134], true);
            
            // Punching animations, right and left hand hands, 75 health
            this.addAnim('punchrightlefthand75', .08, [136, 137, 136], true);
            this.addAnim('punchrightrighthand75', .08, [138, 139, 138], true);
            this.addAnim('punchleftlefthand75', .08, [140, 141, 140], true);
            this.addAnim('punchleftrighthand75', .08, [142, 143, 142], true);
            
            // Punching animations, right and left hand hands, 50 health
            this.addAnim('punchrightlefthand50', .08, [144, 145, 144], true);
            this.addAnim('punchrightrighthand50', .08, [146, 147, 146], true);
            this.addAnim('punchleftlefthand50', .08, [148, 149, 148], true);
            this.addAnim('punchleftrighthand50', .08, [150, 151, 150], true);
            
            // Punching animations, right and left hand hands, 25 health
            this.addAnim('punchrightlefthand25', .08, [152, 153, 152], true);
            this.addAnim('punchrightrighthand25', .08, [154, 155, 154], true);
            this.addAnim('punchleftlefthand25', .08, [156, 157, 156], true);
            this.addAnim('punchleftrighthand25', .08, [158, 159, 158], true);
            
            
            
            this.stamina = this.maxStamina;
            this.flashlightPower = this.maxFlashlight;
            this.keys = 0;
            this.hasFlashlight = false;
            this.parent(x, y, settings);
            
            this.hasGoldKey = false;
            
            /*
            // STRICTLY FOR TESTING PURPOSES REMOVE LATER
            this.hasGoldKey = true;
            this.officers = 5;
            this.keys = 1000;
        	*/
        },
        
        update: function(){
        	if (ig.game.playing && !ig.game.hashtagWinning){
        		
        		for (var i = 0; i < ig.game.backgroundMaps.length; i++){
        			if (ig.game.backgroundMaps[i].name == 'blood'){
        				this.bloodMap = ig.game.backgroundMaps[i];
        			}
        		}
        		
        		if (this.health < 50){
        			var bloodDrops = Math.floor(Math.random() * 500);
        			if (bloodDrops < 1){
        				var bloodType = Math.floor(Math.random() * 13);
        				//console.log(this.bloodMap.getTile(this.pos.x, this.pos.y));
        				if (this.bloodMap.getTile(this.pos.x, this.pos.y) == 0){
        					this.bloodMap.setTile(this.pos.x, this.pos.y, bloodType); 
        				}
          			}
        		}
        		
        		if (ig.game.flashlight && !this.struggling){
        			this.flashlightPower-=2;
        			if (this.flashlightPower <= 0){
        				this.flashlightPower = 0;
        				ig.game.flashlight = !ig.game.flashlight;
        				this.canUseFlashlight = false;
        			}
        		} else {
        			if (this.flashlightPower < this.maxFlashlight){
        				this.flashlightPower += 3;
        				if (!this.canUseFlashlight){
        					if (this.flashlightPower > 300){
        						this.canUseFlashlight = true;
        					}
        				}
        				if (this.flashlightPower > this.maxFlashlight){
        					this.flashlightPower = this.maxFlashlight;
        				}
        			}
        		}
        		
        		if (ig.input.pressed('sprint') && this.stamina >= 0 && this.canSprint){
        			this.sprinting = this.sprintingMultiplier;
        			this.footstepsPlaying = false;
        		}
        		
        		if (ig.input.released('sprint')){
        			this.sprinting = this.notSprinting;
        			this.footstepsPlaying = false;
        		}
            	if (ig.input.state('up')){
                	if (!this.struggling){
                		if (this.sprinting == this.notSprinting){
                			if (!this.footstepsPlaying){
                				footstepsprintMusic.stop();
                				footstepMusic.play();
                				this.footstepsPlaying = true;
                			}
                		} else {
                			if (!this.footstepsPlaying){
                				footstepMusic.stop();
                				footstepsprintMusic.play();
                				this.footstepsPlaying = true;
                			}
                		}
                		
                		
                		this.vel.y = -this.moveSpeed * this.sprinting;
                		this.getSpriteMoveUp();
                	}
            	}
            
            	if (ig.input.released('up')){
            	
					if (!this.struggling) {
						this.footstepsPlaying = false;
						footstepMusic.stop();
						footstepsprintMusic.stop();
						this.vel.y = 0;
						this.getSpriteIdleUp();
					}

            	}
            
            	if (ig.input.state('down')){
                	if (!this.struggling){
                		if (this.sprinting == this.notSprinting){
                			if (!this.footstepsPlaying){
                				footstepsprintMusic.stop();
                				footstepMusic.play();
                				this.footstepsPlaying = true;
                			}
                		} else {
                			if (!this.footstepsPlaying){
                				footstepMusic.stop();
                				footstepsprintMusic.play();
                				this.footstepsPlaying = true;
                			}
                		}
                		
                		this.vel.y = this.moveSpeed * this.sprinting;
                		this.getSpriteMoveDown();
                	}
            	}
            
            	if (ig.input.released('down')){
            	
					if (!this.struggling) {
						this.footstepsPlaying = false;
						footstepMusic.stop();
						footstepsprintMusic.stop();
						this.vel.y = 0;
						this.getSpriteIdleDown();
					}

            	}
            
            	if (ig.input.state('left')){
                	if (!this.struggling){
                		if (this.sprinting == this.notSprinting){
                			if (!this.footstepsPlaying){
                				footstepsprintMusic.stop();
                				footstepMusic.play();
                				this.footstepsPlaying = true;
                			}
                		} else {
                			if (!this.footstepsPlaying){
                				footstepMusic.stop();
                				footstepsprintMusic.play();
                				this.footstepsPlaying = true;
                			}
                		}
                		
                		this.vel.x = -this.moveSpeed * this.sprinting;
               			this.getSpriteMoveLeft();
               		}
                	
            	}
           	
            	if (ig.input.released('left')){
            		if (!this.struggling){
            			this.footstepsPlaying = false;
            			footstepMusic.stop();
            			footstepsprintMusic.stop();
                		this.vel.x = 0;
                		this.getSpriteIdleLeft();
            		}
            	}
            
            	if (ig.input.state('right')){
                	if (!this.struggling){
                		if (this.sprinting == this.notSprinting){
                			if (!this.footstepsPlaying){
                				footstepsprintMusic.stop();
                				footstepMusic.play();
                				this.footstepsPlaying = true;
                			}
                		} else {
                			if (!this.footstepsPlaying){
                				footstepMusic.stop();
                				footstepsprintMusic.play();
                				this.footstepsPlaying = true;
                			}
                		}
                		
                		this.vel.x = this.moveSpeed * this.sprinting;
                		this.getSpriteMoveRight();
                	}
            	}
            
            	if (ig.input.released('right')){
					if (!this.struggling) {
						this.footstepsPlaying = false;
						footstepMusic.stop();
						footstepsprintMusic.stop();
						this.vel.x = 0;
						this.getSpriteIdleRight();
					}
            	}
            	
            	
            		if (this.struggling){
            			if (ig.input.pressed('attack' + this.target.weakness)){
            				var index = Math.floor((Math.random()*6));
            				if (ig.game.isRightAnim()){
            					this.getSpritePunchRight();
            				} else {
            					this.getSpritePunchLeft();
            				}
            				this.target.receiveDamage(this.bookerDamage, this);
            				this.target.punchSound();
            				this.target.getNewWeakness(this.target);
            			}
            			else if (ig.input.pressed('attack' + this.target.notWeakness1) || ig.input.pressed('attack' + this.target.notWeakness2)){
            				this.receiveDamage(.5, this);
            			}
            	}
            	
            	if (this.sprinting == this.sprintingMultiplier && (this.vel.x != 0 || this.vel.y != 0)){
            		this.stamina -= this.staminaLoss;
            		if (this.stamina <= 0){
            			this.sprinting = this.notSprinting;
            			this.footstepsPlaying = false;
            			this.canSprint = false;
            		}
            	}
            	
            	else {
            		if (this.stamina < this.maxStamina){
            			this.stamina += this.staminaRecharge;
            			if (!this.canSprint){
            				if (this.stamina > 300){
            					this.canSprint = true;
            				}
            			}
            		}
            	}
			}
			
				this.parent();
        },
        
        kill: function(){
        	ig.game.playing = false;
        },
        
        draw: function(){
			this.parent();
        },
        
        getSpriteMoveLeft: function(){
        	if (this.sprinting > 1){
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.leftsprintfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.leftsprint75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.leftsprint50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.leftsprint25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.leftsprint;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.leftsprint75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.leftsprint50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.leftsprint25;
        				return;
        			}
        		}
        	}
        	
        	else {
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.leftfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.left75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.left50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.left25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.left;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.left75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.left50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.left25;
        				return;
        			}
        		}
        	}
        },
        	
        getSpriteIdleLeft: function(){
        	if (ig.game.flashlight){
        		if (this.health > 75){
        			this.currentAnim = this.anims.idleleftfl;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleleft75fl;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleleft50fl;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleleft25fl;
        			return;
        		}
        	}	
        	
        	else {
        		if (this.health > 75){
        			this.currentAnim = this.anims.idleleft;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleleft75;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleleft50;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleleft25;
        			return;
        		}
        	}
        },
        
        getSpriteMoveDown: function(){
        	if (this.sprinting > 1){
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.downsprintfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.downsprint75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.downsprint50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.downsprint25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.downsprint;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.downsprint75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.downsprint50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.downsprint25;
        				return;
        			}
        		}
        	}
        	
        	else {
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.downfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.down75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.down50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.down25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.down;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.down75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.down50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.down25;
        				return;
        			}
        		}
        	}
        },
        	
        getSpriteIdleDown: function(){
        	if (ig.game.flashlight){
        		if (this.health > 75){
        			this.currentAnim = this.anims.idledownfl;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idledown75fl;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idledown50fl;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idledown25fl;
        			return;
        		}
        	}	
        	
        	else {
        		if (this.health > 75){
        			this.currentAnim = this.anims.idledown;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idledown75;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idledown50;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idledown25;
        			return;
        		}
        	}
        },
        
        getSpriteMoveUp: function(){
        	if (this.sprinting > 1){
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.upsprintfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.upsprint75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.upsprint50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.upsprint25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.upsprint;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.upsprint75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.upsprint50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.upsprint25;
        				return;
        			}
        		}
        	}
        	
        	else {
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.upfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.up75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.up50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.up25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.up;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.up75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.up50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.up25;
        				return;
        			}
        		}
        	}
        },
        	
        getSpriteIdleUp: function(){
        	if (ig.game.flashlight){
        		if (this.health > 75){
        			this.currentAnim = this.anims.idleupfl;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleup75fl;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleup50fl;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleup25fl;
        			return;
        		}
        	}	
        	
        	else {
        		if (this.health > 75){
        			this.currentAnim = this.anims.idleup;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleup75;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleup50;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleup25;
        			return;
        		}
        	}
        },
        
        getSpriteMoveRight: function(){
        	if (this.sprinting > 1){
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.rightsprintfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.rightsprint75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.rightsprint50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.rightsprint25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.rightsprint;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.rightsprint75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.rightsprint50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.rightsprint25;
        				return;
        			}
        		}
        	}
        	
        	else {
        		if (ig.game.flashlight){
        			if (this.health > 75){
        				this.currentAnim = this.anims.rightfl;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.right75fl;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.right50fl;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.right25fl;
        				return;
        			}
        		}
        		
        		else {
        			if (this.health > 75){
        				this.currentAnim = this.anims.right;
        				return;
        			}
        			
        			else if (this.health > 50){
        				this.currentAnim = this.anims.right75;
        				return;
        			}
        			
        			else if (this.health > 25){
        				this.currentAnim = this.anims.right50;
        				return;
        			}
        			
        			else {
        				this.currentAnim = this.anims.right25;
        				return;
        			}
        		}
        	}
        },
        	
        getSpriteIdleRight: function(){
        	if (ig.game.flashlight){
        		if (this.health > 75){
        			this.currentAnim = this.anims.idlerightfl;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleright75fl;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleright50fl;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleright25fl;
        			return;
        		}
        	}	
        	
        	else {
        		if (this.health > 75){
        			this.currentAnim = this.anims.idleright;
        			return;
        		}
        		
        		else if (this.health > 50){
        			this.currentAnim = this.anims.idleright75;
        			return;
        		}
        		
        		else if (this.health > 25){
        			this.currentAnim = this.anims.idleright50;
        			return;
        		}
        		
        		else {
        			this.currentAnim = this.anims.idleright25;
        			return;
        		}
        	}
        },
        
        getSpritePunchRight: function(){
        	var rightOrLeft = Math.floor(Math.random() * 2);
        	if (this.health > 75){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchrightrighthand.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchrightlefthand.rewind();
        			return;
        		}
        	}
        	
        	else if (this.health > 50){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchrightrighthand75.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchrightlefthand75.rewind();
        			return;
        		}
        	}
        	
        	else if (this.health > 25){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchrightrighthand50.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchrightlefthand50.rewind();
        			return;
        		}
        	}
        	
        	else{
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchrightrighthand25.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchrightlefthand25.rewind();
        			return;
        		}
        	}
        },
        
        getSpritePunchLeft: function(){
        	var rightOrLeft = Math.floor(Math.random() * 2);
        	if (this.health > 75){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchleftrighthand.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchleftlefthand.rewind();
        			return;
        		}
        	}
        	
        	else if (this.health > 50){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchleftrighthand75.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchleftlefthand75.rewind();
        			return;
        		}
        	}
        	
        	else if (this.health > 25){
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchleftrighthand50.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchleftlefthand50.rewind();
        			return;
        		}
        	}
        	
        	else{
        		if (rightOrLeft == 0){
        			this.currentAnim = this.anims.punchleftrighthand25.rewind();
        			return;
        		}
        		else {
        			this.currentAnim = this.anims.punchleftlefthand25.rewind();
        			return;
        		}
        	}
        },
        
        getSpriteFightRight: function(){
        	if (this.health > 75){
        		this.currentAnim = this.anims.fightright;
        		return;
        	}
        	
        	else if (this.health > 50){
        		this.currentAnim = this.anims.fightright75;
        		return;
        	}
        	
        	else if (this.health > 25){
        		this.currentAnim = this.anims.fightright50;
        		return;
        	}
        	
        	else {
        		this.currentAnim = this.anims.fightright25;
        		return;
        	}
        },
        
        getSpriteFightLeft: function(){
        	if (this.health > 75){
        		this.currentAnim = this.anims.fightleft;
        		return;
        	}
        	
        	else if (this.health > 50){
        		this.currentAnim = this.anims.fightleft75;
        		return;
        	}
        	
        	else if (this.health > 25){
        		this.currentAnim = this.anims.fightleft50;
        		return;
        	}
        	
        	else {
        		this.currentAnim = this.anims.fightleft25;
        		return;
        	}
        }
        
        
        
    });
});