ig.module(
	'game.entities.inmate3'	
)

.requires(
	'game.entities.enemy'
)
.defines(function(){
	EntityInmate3 = EntityEnemy.extend({
			
			booker: '',
			bookerBool: false,
			size: {x:16, y:9},
			friction: {x: 150, y: 0},
			speed: 14,
			maxVel: {x: 100, y: 100},
			flip: false,
			flipY: false,
			struggling: false, 
			collide: false,
			collideBookshelf: false,
			checkAgainst: ig.Entity.TYPE.A, 
			collides: ig.Entity.COLLIDES.ACTIVE,
			animSheet: new ig.AnimationSheet('media/inmate3_walk.png',64,64),
			//Ai: new ig.ai(this),
			
			init: function(x, y, settings){
				
				this.booker = ig.game.getEntityByName('Darren Booker');
				this.Ai = new ig.ai(this);
				
				
				
				this.addAnim('idle', 1,[0] );
				this.addAnim('right', 0.1, [8,9,10,11]);
				this.addAnim('left', 0.1, [12,13,14,15]);
				this.addAnim('up', 0.1, [4,5,6,7]);
				this.addAnim('down', 0.1, [0,1,2,3]);
				this.addAnim('directions', 0.3, [0, 1, 12, 13, 8, 9, 4, 5]);
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
				if(!this.booker){
					this.booker = ig.game.getEntityByName('Darren Booker');
				}
				//var sight =  Math.PI / 8; 
				//var properAngle = (this.angleTo(this.booker) + 2*Math.PI)%Math.PI;
				//var angle = this.angleTo(this.booker);
				var distance = this.distanceTo(this.booker);
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
				
				if (this.health <= 0 || this.booker.health <= 0){
					this.endStruggle();
				}
				
				if(!this.struggling){
					var action = this.Ai.getAction(this);
				
					switch(action){
						case ig.ai.ACTION.Idle:
							this.currentAnim = this.anims.directions;
							this.vel.x =0;
							this.vel.y = 0;
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
							this.currentAnim = this.anims.directions;
							this.vel.x = 0;
							this.vel.y = 0;
							break;
					}
					if(this.struggling){
						this.pos.x = this.booker.pos.x - 20;
						this.pos.y = this.booker.pos.y;	
					}
					
				var x_dist = Math.abs(this.booker.pos.x - this.pos.x);
            	var y_dist = Math.abs(this.booker.pos.y - this.pos.y);
            	
					//this.parent();
				//}	
					
				if (this.flip){
					this.collide = false;
					this.flipY = false;
					this.collideSink = false;
					//this.nearPlayer = false;
					this.vel.x = -100;
					this.currentAnim = this.anims.left;
				}
				else if(!this.flip){
					this.vel.x = 100;
					this.currentAnim = this.anims.right;
					//this.collide = !this.collide;
				}
				else if(ig.game.flashlight && this.distanceTo(this.booker) < 450){

						this.collide = false;
						this.flip = false;
						this.flipY = false;
						if(x_dist > y_dist){
							if(this.pos.x > this.booker.pos.x){
							//return this.doAction(ig.ai.ACTION.Left);
								this.vel.x = -100;
								this.currentAnim = this.anims.left;
							}
							else if(this.pos.x < this.booker.pos.x){
								this.vel.x = 100;
								this.currentAnim = this.anims.right;
								//return this.doAction(ig.ai.ACTION.Right);
							}
						}
						else if(y_dist > x_dist){
							
							if(this.pos.y > this.booker.pos.y){
								this.vel.y = -100;
								this.currentAnim = this.anims.up;
							//return this.doAction(ig.ai.ACTION.Up);
							}
							else if(this.pos.y < this.booker.pos.y){
							//return this.doAction(ig.ai.ACTION.Down);
								this.vel.y = 100;
								this.currentAnim = this.anims.down;
							}
						}
						
					}
				else if( this.distanceTo(this.booker) < 300){
						this.collide = false;
						//this.flip = !this.flip;
						this.flipY = false;
						if(x_dist > y_dist){
							
							if(this.pos.x > this.booker.pos.x){
							//return this.doAction(ig.ai.ACTION.Left);
								this.vel.x = -100;
								this.currentAnim = this.anims.left;
							}
							else if(this.pos.x < this.booker.pos.x){
								this.vel.x = 100;
								this.currentAnim = this.anims.right;
								//return this.doAction(ig.ai.ACTION.Right);
							}
						}
						else if(y_dist > x_dist){
							 if(this.pos.y > this.booker.pos.y){
								this.vel.y = -100;
								this.currentAnim = this.anims.up;
							//return this.doAction(ig.ai.ACTION.Up);
							}
							else if(this.pos.y < this.booker.pos.y){
							//return this.doAction(ig.ai.ACTION.Down);
								this.vel.y = 100;
								this.currentAnim = this.anims.down;
							}
						}
				}
				if(this.flipY){
					this.vel.x = -100;
					this.currentAnim = this.anims.left;
					this.collide = !this.collide;
					this.flip = false;
				}
				if(this.collide){
					this.flipY = !this.flipY;
					this.flip = false;
					this.vel.x = -100;
					this.currentAnim = this.anims.left;
					
					//this.collide = !this.collide;
				}
				
				if(this.collideSink){
					//this.flip = false;
					this.vel.x = 100;
					this.currentAnim = this.anims.right;
				}	
			
				//this.parent();
				}
          	}
          	
          	this.parent();
         },
			//Collision with other entities
			collideWith: function(other, axis){
					//checking to see if it collides with other objects
					if(other instanceof EntityEnemy || other instanceof EntityFurniture || other instanceof EntityDoor){
						this.collide = !this.collide;
					}
					if(other instanceof EntitySink){
						this.collideSink = !this.collideSink;
						this.collide = false;
						this.flip = false;
					}
					this.parent();
			  },
			
			//Handle wall collisions:
			handleMovementTrace: function(res){
				this.parent(res);
				var x_dist = Math.abs(this.booker.pos.x - this.pos.x);
            	var y_dist = Math.abs(this.booker.pos.y - this.pos.y);
				if (res.collision.x){
					this.flip = !this.flip;
					this.collide = false;
					this.nearPlayer = false;
				
				}
				else if(res.collision.y){
					this.nearPlayer = false;
					this.flipY = !this.flipY;
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

