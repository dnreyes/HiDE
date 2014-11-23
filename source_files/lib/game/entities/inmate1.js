ig.module(
	'game.entities.inmate1'	
)

.requires(
	'game.entities.enemy'
)
.defines(function(){
	EntityInmate1 = EntityEnemy.extend({
			
			booker: '',
			bookerBool: false,
			size: {x:16, y:9},
			friction: {x: 150, y: 0},
			speed: 14,
			maxVel: {x: 100, y: 100},
			flip: false,
			collide: false,
			struggling: false,
			flipX: false,
			collideBookshelf: false,
			collideWoodChair: false, 
			collideWasher: false,
			collideSink: false,
			playerDistance: false,
			checkAgainst: ig.Entity.TYPE.A, 
			collides: ig.Entity.COLLIDES.ACTIVE,
			
			animSheet: new ig.AnimationSheet('media/inmate1_walk.png',64,64),
			//Ai: new ig.ai(this),
			
			init: function(x, y, settings){
				
				this.booker = ig.game.getEntityByName('Darren Booker');
				this.laundry = ig.game.getEntityByName('Laundry');
				
				this.Ai = new ig.ai(this);
				
				this.addAnim('idle', 1,[0] );
				this.addAnim('right', 0.1, [8,9,10,11]);
				this.addAnim('left', 0.1, [12,13,14,15]);
				this.addAnim('up', 0.1, [4,5,6,7]);
				this.addAnim('down', 0.1, [0,1,2,3]);
				
				this.addAnim('fightleft', 1, [21]);
				this.addAnim('fightright', 1, [16]);
				this.addAnim('punchrightlefthand', .08, [16, 17, 16], true);
				this.addAnim('punchrightrighthand', .08, [18, 19, 18], true);
				this.addAnim('punchleftlefthand', .08, [21, 20, 21], true);
				this.addAnim('punchleftrighthand', .08, [23, 22, 23], true);
				
				this.parent(x,y,settings);
			},
			
			struggle: function(human, other){
				this.parent(human, other);
			},
			
			//Inmate moving around depending on the different actions.
			update: function(){
				var x_dist = Math.abs(this.booker.pos.x - this.pos.x);
            	var y_dist = Math.abs(this.booker.pos.y - this.pos.y);
				if(!this.booker){
					this.booker = ig.game.getEntityByName('Darren Booker');
				}
				if (ig.game.playing){
				
				
				
				if (!this.bookerBool){
					this.booker = ig.game.getEntityByName('Darren Booker');
					this.bookerBool = true;
				}
				//var other = ig.game.getEntityByName('Darren Booker');
				if (Math.abs(this.pos.x - this.booker.pos.x) < 64 && Math.abs(this.pos.y-this.booker.pos.y) < 64){
					this.target = this.booker;
					this.struggle(this.booker, this);
					
				}
				//console.log("working");
				//Checking collision with other inmates
				
				
				if (this.health <= 0 || this.booker.health <= 0){
					this.endStruggle();
				}
				
				//else {
					//console.log('hey I\'m moving!');
				if (!this.struggling){
					var action = this.Ai.getAction(this);
					switch(action){
					case ig.ai.ACTION.Idle:
						this.currentAnim = this.anims.left;
						this.vel.x = 0;
						//this.vel.y = 0;
						break;
					case ig.ai.ACTION.Left:
						this.currentAnim = this.anims.left;
						this.vel.x = -100;
						break;
					case ig.ai.ACTION.Right:
						this.currentAnim = this.anims.right;
						this.vel.x = 100;
						break;
					case ig.ai.ACTION.Up:
						this.currentAnim = this.anims.up;
						this.vel.y = -100;
						break;
					case ig.ai.ACTION.Down:
						this.currentAnim = this.anims.down;
						this.vel.y = 100;
						break;
					default:
						this.currentAnim = this.anims.idle;
						this.vel.x = 0
						this.vel.y = 0;
						break;
					}
				
					if(this.distanceTo(this.booker) < 450 && this.collide && ig.game.flashlight){
						this.collide = !this.collide;
						if(x_dist > y_dist){
            				if(this.pos.x > this.booker.pos.x){
								this.vel.x = -100;
								this.currentAnim = this.anims.left;
							
							}
							else if(this.pos.x < this.booker.pos.x){
								this.vel.x = 100;
								this.currentAnim = this.anims.right;
							}
						}
						else if(y_dist > x_dist){
							if(this.pos.y > this.booker.pos.y){
								this.vel.y = -100;
								this.currentAnim = this.anims.up;
							}
							else if(this.pos.y < this.booker.pos.y){
								this.vel.y = 100;
								this.currentAnim = this.anims.down;
								
							}
						}	
					//else this.pos.x = this.booker.pos.x;
					}
					else if(this.distanceTo(this.booker) < 300 && !this.collide){
						if(x_dist > y_dist){
            				if(this.pos.x > this.booker.pos.x){
								this.vel.x = -100;
								this.currentAnim = this.anims.left;
							
							}
							else if(this.pos.x < this.booker.pos.x){
								this.vel.x = 100;
								this.currentAnim = this.anims.right;
							}
						}
						else if(y_dist > x_dist){
							if(this.pos.y > this.booker.pos.y){
								this.vel.y = -100;
								this.currentAnim = this.anims.up;
							}
							else if(this.pos.y < this.booker.pos.y){
								this.vel.y = 100;
								this.currentAnim = this.anims.down;
								
							}
						}	
					}
					//If collides with other entities, then, go opposite directions. 
					if(this.collide == true){
						this.playerDistance = true;
						this.vel.x = -100;
						this.currentAnim = this.anims.left;
					}
					if(this.collideBookshelf){
						this.vel.y = -100;
						this.currentAnim = this.anims.up;
					}
					else if(this.collideWoodChair){
						this.vel.x = -100;
						this.currentAnim = this.anims.left;
					}
					else if(this.collideWasher){
						this.vel.x = -100;
						this.currentAnim = this.anims.left;
					}
					if (this.flip == true){
						//console.log("flie");
						this.collideWoodChair = false;
						this.collide = false;
						this.vel.x = -100;
						this.currentAnim = this.anims.left;
					}
					if(this.flipX == true){
						this.vel.y = 100;
						this.currentAnim = this.anims.down;
						this.collideBookshelf = false;
						this.collide = false;
						this.collideWasher = false;
						
					}	
				}
				this.parent();
          		}
			},
			
			//Checking to see if any inmates collide with the furniture. 
			collideWith: function(other, axis){
					//checking to see if it collides with other objects
					if(other instanceof EntityFurniture || other instanceof EntityDoor){
						this.collide =!this.collide;
					}
					this.parent();
			  },
			
			//Handle collisions:
			handleMovementTrace: function(res){
				this.parent(res);
				var x_dist = Math.abs(this.booker.pos.x - this.pos.x);
            	var y_dist = Math.abs(this.booker.pos.y - this.pos.y);
				if (res.collision.x){
					//this.flip = !this.flip;
					this.flip = !this.flip;
					this.flipX = false;					
				}
				else if(res.collision.y){
					this.flipX = !this.flipX;
					this.flip = false;
					this.collide= false;
				}
            	
			},
				
			endStruggle: function(target){
				this.parent(target);
			},
			
			kill: function(){
				this.endStruggle(this.target);
				this.parent();
			},
			
	});
	

});

