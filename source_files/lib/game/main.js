ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.prototype1',
	'plugin.camera',
	'plugin.screen-fader'
    
)
.defines(function(){

MyGame = ig.Game.extend({
	gameover: false,
	battleTarget: '',
	playing: false,
	textShowing: false,
	menu: true,
	attacks: '',
	groans: '',
	punches: '',
	footsteps: '',
	menuImg: '',
	blankMenu: '',
    playMenu: '',
    creditsMenu: '',
    pauseMenu: '',
    pauseMenuResume: '',
    pauseMenuRestart: '',
    pauseMenuExit: '',
    pauseMenuImg: '',
    paused: false,
    bloodFont: '',
    bloodFontAlpha: '',
    bloodFontAlphaChange: false, //false is decreasing, true is increasing alpha
    fogOfWar: '',
    backgroundMusic: '',
    battleMusic: '',
    footstepMusic: '',
    flashlight: false,
    bloodSplatters: '',
    keyIcon: new ig.Image('media/key.png'),
    textIntro: false,
    officertext: false,
    savedofficer: false,
    whiteFont: '',
    meterAlpha: 1,
    meterAlphaFalling: true,
    infirmKeyIcon: '',
    
	init: function() {
		// Initialize your game here; bind keys etc.
		blankMenu = new ig.Image('media/HiDEMenu.png');
		playMenu = new ig.Image('media/HiDEMenuPlay.png');
		creditsMenu = new ig.Image('media/HiDEMenuCredits.png');
		
		creditsBase = new ig.Image('media/Credits.png');
		creditsBack = new ig.Image('media/CreditsBack.png');
		
		pauseMenu = new ig.Image('media/HiDEPause.png');
		pauseMenuResume = new ig.Image('media/HiDEPauseResume.png');
		pauseMenuRestart = new ig.Image('media/HiDEPauseRestart.png');
		pauseMenuExit = new ig.Image('media/HiDEPauseExit.png');
		
		pauseMenuImg = pauseMenu;
		menuImg = blankMenu;
		creditsImg = creditsBase;
		
		ig.input.initMouse();
		
		backgroundMusic = new ig.Music();
		backgroundMusic.random = true;
		backgroundMusic.add('media/music/Abandoned Infirmary.mp3');
		backgroundMusic.add('media/music/Dreams Of Horror.mp3');
		backgroundMusic.add('media/music/Heartless Apprehension.mp3');
		backgroundMusic.add('media/music/Horror Returns.mp3');
		backgroundMusic.add('media/music/New Horror.mp3');
		backgroundMusic.add('media/music/Ownership.mp3');
		
		battleMusic = new ig.Music();
		battleMusic.add('media/music/Euphoric Crow 30.mp3');
		
		footstepMusic = new ig.Music();
		footstepMusic.add('media/sounds/footstep.ogg');
		footstepsprintMusic = new ig.Music();
		footstepsprintMusic.add('media/sounds/footstepsprint.ogg');
		
		fogOfWarDown = new ig.Image('media/FogOfWarDown.png');
		fogOfWarRight = new ig.Image('media/FogOfWarRight.png');
		fogOfWarLeft = new ig.Image('media/FogOfWarLeft.png');
		fogOfWarUp = new ig.Image('media/FogOfWarUp.png');
		fogOfWarBase = new ig.Image('media/FogOfWar.png');
		
		fogOfWar = fogOfWarBase;
		
		policeIcon1 = new ig.Image('media/policeicon1.png');
		policeIcon2 = new ig.Image('media/policeicon2.png');
		policeIcon3 = new ig.Image('media/policeicon3.png');
		policeIcon4 = new ig.Image('media/policeicon4.png');
		policeIcon5 = new ig.Image('media/policeicon5.png');
		policeIcon6 = new ig.Image('media/policeicon6.png');

        ig.input.bind(ig.KEY.W, 'up');
        ig.input.bind(ig.KEY.A, 'left');
        ig.input.bind(ig.KEY.S, 'down');
        ig.input.bind(ig.KEY.D, 'right');
        ig.input.bind(ig.KEY.SPACE, 'interact');
        ig.input.bind(ig.KEY.SHIFT, 'sprint');
        ig.input.bind(ig.KEY.X, 'attack0');
        ig.input.bind(ig.KEY.Z, 'attack1');
        ig.input.bind(ig.KEY.T, 'attack2');
        ig.input.bind(ig.KEY.ESC, 'pause');
        ig.input.bind(ig.KEY.F, 'flashlight');
        ig.input.bind(ig.KEY.M, 'Minimap');
        
        ig.input.bind(ig.KEY.MOUSE1, 'press');
        
        this.attacks = ['x', 'z', 't'];
        
        bloodFont = new ig.Font('media/bloodlustrednoalpha.font.png');
        bloodFontAlpha = new ig.Font('media/bloodlustred.font.png');
		bloodFontLarge = new ig.Font('media/bloodlustlarge.font.png');
		blueFont = new ig.Font('media/bluefont.png');
		newFont = new ig.Font('media/bluefont.png');
		whiteFont = new ig.Font('media/whiteFont.png');
		whFont = new ig.Font('media/whiteFont.png');
		
		this.screenFader = new ig.ScreenFader({
			//color: {r: 255, g: 255, b: 255, a: 1},
			fade: 'in',
			speed: 0.5,
			delayBefore: 2,
			callback: this.goToMenu
		});
		
		keyIcon = new ig.Image('media/key.png');
		goldKeyIcon = new ig.Image('media/goldkey.png');
		infirmKeyIcon = new ig.Image('media/infirmarykey.png');
		miniMap = new ig.Image('media/minimap.png');
		
		this.mini = false;
			
		this.hasGottenKey = false;
	},
	
	beginPlaying: function(){
		this.loadLevel (LevelPrototype1);
		this.player = this.getEntityByName('Darren Booker');
		this.battleTarget = '';
		this.flashlight = false;
		this.officer = this.getEntityByName('Officer1');
		this.officer2 = this.getEntityByName('Officer2');
		this.textIntro = true;
		this.laundry = this.getEntityByName('Laundry');
		this.fridge = this.getEntityByName('fridge');
		
		this.keys = this.getEntitiesByType(EntityKey);
		this.infirmkey = this.getEntityByName("Infirm Key");
		this.goldKey = this.getEntityByName('Gold Key');
		
		this.hashtagWinning = false;
		backgroundMusic.volume = .1;
		backgroundMusic.play();
		footstepMusic.volume = .5;
		footstepsprintMusic.volume = .5;
        this.camera = new Camera (ig.system.width/2-16, ig.system.height/2, 5);
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.timer = new ig.Timer();
        this.timer.set(7);
        this.Sprinttimer = new ig.Timer(7);
        this.miniMapText = true;
        this.menu = false;
        this.endTimer = false;
        this.hasGottenKey = false;
        this.screenFader = new ig.ScreenFader({
			//color: {r: 255, g: 255, b: 255, a: 1},
			fade: 'in',
			speed: 0.5,
			delayBefore: 2,
			callback: this.goToMenu
		});
	},
	
	draw: function() {
	// Draw all entities and backgroundMaps
	this.parent();
	if (this.menu){
		if (this.credits){
			creditsImg.draw(0, 0);
		} else {
			menuImg.draw(0, 0);
		}
		
	}
	
		
	if(this.textIntro){
		fogOfWar.draw(0, 0);
		this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
		this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;		
		this.camera.set(this.player);
		bloodFont.draw("Get out of the prison alive while avoiding inmates.", ig.system.width/2, 30, ig.Font.ALIGN.CENTER);
		bloodFont.draw("Save all of your fellow officers", ig.system.width/2, 60, ig.Font.ALIGN.CENTER);
		bloodFont.draw("in order to make it out alive.", ig.system.width/2, 90, ig.Font.ALIGN.CENTER);
		bloodFont.draw("Press Spacebar to begin and interact with objects.", ig.system.width/2, 120, ig.Font.ALIGN.CENTER);
		
		if (ig.input.state('interact')){
			this.textIntro = false;
			this.playing = true;
		}
	}

	if (this.playing){
		this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
		this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;		
		this.camera.set(this.player);
		
		// Add your own drawing code here		
		
		fogOfWar.draw(0, 0);
		
		if (this.battleTarget != ''){
			bloodFontLarge.draw('' + this.attacks[this.player.target.weakness], 100, 100, ig.Font.ALIGN.CENTER);
			
			if (bloodFontLarge.alpha >= 1){
				this.bloodFontAlphaChange = false;
			}
			else if (bloodFontLarge.alpha <= 0.04){
				this.bloodFontAlphaChange = true;
			}
			
			if (!this.bloodFontAlphaChange){
				bloodFontLarge.alpha -= .04;
			} else {
				bloodFontLarge.alpha += .04;
			}
			
			
		}
		
		//Flashlight power black outline
			if (this.player.flashlightPower >= this.player.maxFlashlight){
        		ig.system.context.fillStyle = "rgba(1, 0, 0, 0)";
        	}
        	else{
        		if (!this.player.canUseFlashlight){
        			ig.system.context.fillStyle = "rgba(64, 0, 0, 1)";
        			this.changeMeterAlpha();
        		} else {
        			ig.system.context.fillStyle = "rgba(1, 1, 1, 1)";
        		}
        		
        	}
        	ig.system.context.beginPath();
        	ig.system.context.rect(500, 508, 200, 30);
			ig.system.context.closePath();
			ig.system.context.fill();
			
			//Flashlight bar yellow fill
			if (this.player.flashlightPower >= this.player.maxFlashlight){
				ig.system.context.fillStyle = "rgba(1, 0, 0, 0)";
			} else{
				ig.system.context.fillStyle = "rgba(64, 64, 0, 1)";
			}
			ig.system.context.beginPath();
			ig.system.context.rect(502, 510, 196 * (this.player.flashlightPower/this.player.maxFlashlight), 26);
			ig.system.context.closePath();
			ig.system.context.fill();
		
		//Stamina bar black outline
		ig.system.context.fillStyle = "rgba(1, 1, 1, 1)";
		if (this.player.stamina >= this.player.maxStamina){
        		ig.system.context.fillStyle = "rgba(1, 0, 0, 0)";
        	}
        	else{
        		if (!this.player.canSprint){
        			ig.system.context.fillStyle = "rgba(64, 0, 0, 1)";
        			this.changeMeterAlpha();
        		} else {
        			ig.system.context.fillStyle = "rgba(1, 1, 1, 1)";
        		}
        	}
        	ig.system.context.beginPath();
        	ig.system.context.rect(200, 508, 200, 30);
			ig.system.context.closePath();
			ig.system.context.fill();
			
			//Stamina bar green fill
			if (this.player.stamina >= this.player.maxStamina){
				ig.system.context.fillStyle = "rgba(0, 0, 0, 0)";
			} else{
				ig.system.context.fillStyle = "rgba(0, 64, 0, 1)";
			}
			ig.system.context.beginPath();
			ig.system.context.rect(202, 510, 196 * (this.player.stamina/this.player.maxStamina), 26);
			ig.system.context.closePath();
			ig.system.context.fill();
			
		if (this.paused){
			pauseMenuImg.draw(200, 150);
		}
		
		if(this.mini){
			miniMap.draw(150,0);
		}
		
		bloodFont.draw(Math.round(this.player.health) + "%", 50, 500, ig.Font.ALIGN.LEFT);
		
		
		//KEY TEXT: DISPLAYING HOW MANY KEYS THE PLAYER HAS
		if(this.keyText && !this.hasGottenKey){
				this.endTimer = true;		
				for(var i = 0; i < this.keys.length; i++){
					this.keys[i].keyText = false;
				}
				this.hasGottenKey = true;
				
		}
		if(this.timer.delta() < 0 && this.endTimer){
				whiteFont.draw('I wonder which door the key will open...', 250,250, ig.Font.ALIGN.LEFT);
				if(this.timer.delta() > 0){
					this.endTimer = false;
				}
		}
		
		
		
		
		if(this.player.hasFlashlight && this.player.textFlashlight){
			whiteFont.draw("Press F to use flashlight", ig.system.width/2, 500, ig.Font.ALIGN.CENTER);
		}
		
		if(this.officer.text){
			whiteFont.draw('Press Spacebar to help your fellow officers.', 400,290, ig.Font.ALIGN.CENTER);
			whiteFont.draw('Save the other officers too in order to escape.', 400,305, ig.Font.ALIGN.CENTER);
			whiteFont.draw('Officers boost up your defense!', 400, 320, ig.Font.ALIGN.CENTER);
		}
		
		if(ig.input.state('flashlight')){
			this.player.textFlashlight = false;
			this.sprintTextTimer = true;
		}
		
		//TEXT FOR SPRINTING!!
		if(this.sprintTextTimer && this.Sprinttimer.delta() < 0){
			console.log("in the if statement");
			whiteFont.draw('To run faster, press shift along with WASD.', 400, 290, ig.Font.ALIGN.CENTER);
			if(this.Sprinttimer.delta() > 0)
				this.sprintTextTimer = false;
		}
		if(ig.input.state('sprint')){
			this.sprintTextTimer = false;
			this.Sprinttimer.set(-1);
		}
		
		//TEXT FOR FRIDGE
		if(this.fridge.fridgeText){
			whiteFont.draw('Interact with the fridge. There might be a key...', 400, 290, ig.Font.ALIGN.CENTER);
		}

		//DISPLAYING HOW MANY OFFICERS THE PLAYER COLLECTED!!!!
		if(this.player.officers == 0){
			policeIcon1.draw(25,25);
		}
		else if(this.player.officers == 1){
			policeIcon2.draw(25,25);
		}
		else if(this.player.officers == 2){
			policeIcon3.draw(25,25);
		}
		else if(this.player.officers == 3){
			policeIcon4.draw(25,25);
		}
		else if(this.player.officers == 4){
			policeIcon5.draw(25,25);
		}
		else if(this.player.officers == 5){
			policeIcon6.draw(25,25);
		}//end if statement
		
		//TEXT FOR LAUNDRY
		if(this.laundry.laundryText){
			//whiteFont.draw('Hmm...I wonder what is in the basket?', 400, 250, ig.Font.ALIGN.CENTER);
		}
		
		
		//TEXT FOR MINIMAP
		if(this.miniMapText){
			whiteFont.draw('To view the map of the prison, press M.', 400,250, ig.Font.ALIGN.CENTER);
		}
		
		if(ig.input.state('Minimap')){
			this.miniMapText = false;
		}
		//INFIRMARY KEY TEXT
		if(this.infirmkey.infirmkeyText){
			whiteFont.draw('Strange key..I wonder what door it opens...', 400, 250, ig.Font.ALIGN.CENTER);
		}
		if(this.goldKey.keyText){
			whiteFont.draw('A gold key...it must be for the exit..', 400,250,ig.Font.ALIGN.CENTER);
		}
		
		if(this.player.keys > 0) {
			keyIcon.draw((ig.system.width - 64), 15);
			whiteFont.draw(this.player.keys, (ig.system.width - 64), 48, ig.Font.ALIGN.LEFT);
		}
		
		//for gold key
		if(this.player.hasGoldKey) {
			goldKeyIcon.draw((ig.system.width - 64), 40);
		}
		
		//for infirmary key
		if (this.player.hasInfirmKey) {
			console.log('Picked up infimary key');
			infirmKeyIcon.draw((ig.system.width - 48), 100);
		}
	}
	
	
	
	
	if (!this.playing && !this.menu && !this.textIntro && !this.mini){
		bloodFont.draw("YOU LOSE!", 400, 300, ig.Font.ALIGN.CENTER);
		this.gameover = true;
		fogOfWar.draw(0, 0);
		this.screenFader.draw();
	}
	
	if (this.hashtagWinning){
		this.screenFader.draw();
	}
	
	var x = ig.system.width/2,
		y = ig.system.height/2;
	},
	
	update: function() {
		
		if (this.menu){
			if (this.credits){
				if (ig.input.mouse.x > 20 && ig.input.mouse.x < 125 && ig.input.mouse.y > 550 && ig.input.mouse.y < 580){
					creditsImg = creditsBack;
					if (ig.input.pressed('press')){
						menuImg = blankMenu;
						this.credits = false;
					}
				} else {
					creditsImg = creditsBase;
				}
			} else{
				if (ig.input.mouse.x > 305 && ig.input.mouse.x < 505 && ig.input.mouse.y > 285 && ig.input.mouse.y < 340){
				menuImg = playMenu;
				if (ig.input.pressed('press')){
					this.beginPlaying();
				}
			} else if (ig.input.mouse.x > 310 && ig.input.mouse.x < 485 && ig.input.mouse.y > 390 && ig.input.mouse.y < 425){
				menuImg = creditsMenu;
				if (ig.input.pressed('press')){
					creditsImg = creditsBase;
					this.credits = true;
				}
			} else {
				menuImg = blankMenu;
			}
			}
			
		}
		
		// Update all entities and backgroundMaps
		if (this.playing){
			
			//IF PLAYER PRESSES M FOR MINIMAP
			if(ig.input.pressed('Minimap')){
				this.mini = !this.mini;	
				this.paused = !this.paused;
				//this.playing = !this.playing;
			}
			
			//Checking if key text for any of the keys are true..
			for(var i = 0; i < this.keys.length; ++i){
				if(this.keys[i].keyText){
					this.keyText = true;
				}
			}
			
			
			this.camera.follow(this.player);
			
			if (ig.input.pressed('flashlight') && this.player.hasFlashlight && this.player.canUseFlashlight){
				this.flashlight = !this.flashlight;	
				if (this.isRightAnim()){
					this.player.getSpriteIdleRight();
				}	
				else if (this.isLeftAnim()){
					this.player.getSpriteIdleLeft();
				}	
				else if (this.isUpAnim()){
					this.player.getSpriteIdleUp();
				}	
				else if (this.isDownAnim()){
					this.player.getSpriteIdleDown();
				}		
			}
			
			if (ig.input.pressed('pause')){
				this.paused = !this.paused;
			}
			
			if (this.flashlight && this.isDownAnim() && !this.player.struggling){
				fogOfWar = fogOfWarDown;
			} 
			else if (this.flashlight && this.isRightAnim() && !this.player.struggling){
				fogOfWar = fogOfWarRight;
			}
			else if (this.flashlight && this.isLeftAnim() && !this.player.struggling){
				fogOfWar = fogOfWarLeft;
			}
			else if (this.flashlight && this.isUpAnim() && !this.player.struggling){
				fogOfWar = fogOfWarUp;
			}
			else {
				fogOfWar = fogOfWarBase;
			}
			
			if (this.hashtagWinning){				
				this.player.vel.x = 50;
				this.playing.sprinting = 1;
				this.player.getSpriteMoveRight();
			}
		}
		
		if (!this.paused){
			this.parent();
		} else {
			if (ig.input.mouse.x > 330 && ig.input.mouse.y > 265 && ig.input.mouse.x < 470 && ig.input.mouse.y < 295){
				pauseMenuImg = pauseMenuResume;
				if (ig.input.pressed('press')){
					this.paused = !this.paused;
				}
			} else if (ig.input.mouse.x > 330 && ig.input.mouse.y > 310 && ig.input.mouse.x < 470 && ig.input.mouse.y < 340){					
				pauseMenuImg = pauseMenuRestart;
				if (ig.input.pressed('press')){
					this.beginPlaying();
					this.paused = false;
				}
			} else if (ig.input.mouse.x > 360 && ig.input.mouse.y > 355 && ig.input.mouse.x < 440 && ig.input.mouse.y < 385){
				pauseMenuImg = pauseMenuExit;
				if (ig.input.pressed('press')){
					this.goToMenu();
					this.paused = false;
				}	
			} else {
				pauseMenuImg = pauseMenu;
			}
		}
		
	},
	
	getAttacks: function(){
		return attacks.length;
	},
	
	goToMenu: function() {		
		this.playing = false;
		this.hashtagWinning = false;
		this.menu = true;
	},
	
	changeMeterAlpha: function(){
		if (this.meterAlphaFalling){
			this.meterAlpha -= .08;
			if (this.meterAlpha <= 0){
				this.meterAlpha = 0;
				this.meterAlphaFalling = !this.meterAlphaFalling;
			}
		} else {
			this.meterAlpha += .08;
			if (this.meterAlpha >= 1){
				this.meterAlpha = 1;
				this.meterAlphaFalling = !this.meterAlphaFalling;
			}
		}
	},
	
	isRightAnim: function(){
		if (this.player.currentAnim == this.player.anims.idleright){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprintfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idlerightfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleright25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.right25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.rightsprint25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightrighthand){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightlefthand){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightrighthand75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightlefthand75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightrighthand50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightlefthand50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightrighthand25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchrightlefthand25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightright){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightright75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightright50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightright25){
			return true;
		}
		
		return false;
	},
	
	isDownAnim: function(){
		if (this.player.currentAnim == this.player.anims.idledown){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprintfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledownfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idledown25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.down25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.downsprint25fl){
			return true;
		}
		
		return false;
	},
	
	isUpAnim: function(){
		if (this.player.currentAnim == this.player.anims.idleup){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprintfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleupfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleup25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.up25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.upsprint25fl){
			return true;
		}
		
		return false;
	},
	
	isLeftAnim: function(){
		if (this.player.currentAnim == this.player.anims.idleleft){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprintfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleftfl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft75fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint50fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.idleleft25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.left25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.leftsprint25fl){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightleft){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightleft75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightleft50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.fightleft25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftrighthand){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftlefthand){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftrighthand75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftlefthand75){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftrighthand50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftlefthand50){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftrighthand25){
			return true;
		}
		
		if (this.player.currentAnim == this.player.anims.punchleftlefthand25){
			return true;
		}
		
		return false;
	}
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});
