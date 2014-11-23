ig.module(
	'plugin.ai'
)

.requires(
	'impact.impact'
	//'game.entities.booker'
)

.defines(function(){
	 ig.ai = ig.Class.extend({
		
		struggling: false,
		
		//What types of action the AI is able to perform
		init: function(entity){
			ig.ai.ACTION = {
				Idle: 0,
				Left: 1,
				Right: 2,
				Up: 3,
				Down: 4
			};
			this.entity = entity;
		},
		
		//The AI performing the action
		getAction: function(entity){
			this.entity = entity; 
			var player = ig.game.getEntityByName('Darren Booker');
			var	distance = this.entity.distanceTo(player);
			var x_dist = Math.abs(player.pos.x - this.entity.pos.x);
            var y_dist = Math.abs(player.pos.y - this.entity.pos.y);
            var angle = this.entity.angleTo(player);
			var collision = ig.game.collisionMap;
			var res = collision.trace(this.entity.pos.x, this.entity.pos.y, x_dist, y_dist, this.entity.size.x, this.entity.size.y);
			
			//If colliding with any walls, go opposite directions. 
			/*if(res.collision.y){
				this.entity.vel.x = -this.entity.vel.x;
				
			}
			if(res.collision.x){
				this.entity.vel.y = -this.entity.vel.y;
			}*/

            //Enemies line of sight
            var sight = Math.PI; 
            var properAngle = (this.entity.angleTo(player) + 2*Math.PI)%Math.PI;
			if (Math.abs(angle-properAngle) <= sight){
             //if the player is in the vicinity!
        	//If the enemy hits an x-axis and y-axis wall and distance is near.
             	if((res.collision.y || res.collision.x) && distance < 300){
             		if (x_dist > y_dist) {
                   	 	if (this.entity.pos.x > player.pos.x) {
                        	return this.doAction(ig.ai.ACTION.Left);
                     	} 	
                     	else if(this.entity.pos.x < player.pos.x){
                        	return this.doAction(ig.ai.ACTION.Right);
                     	}
               		 } 
               		 else {
                    	if (this.entity.pos.y > player.pos.y) {
                        	return this.doAction(ig.ai.ACTION.Up);
                    	} 
                    	else {
                        	return this.doAction(ig.ai.ACTION.Down);
                    	}                        
                	}
           		}
           		//Only if the distance is near, not colliding with any walls
           		 if(distance < 300) {
               		 if (x_dist > y_dist) {
                   	 	if (this.entity.pos.x > player.pos.x) {
                        	return this.doAction(ig.ai.ACTION.Left);
                     	} 	
                     	else if(this.entity.pos.x < player.pos.x){
                        	return this.doAction(ig.ai.ACTION.Right);
                     	}
               		 } 
               		 else {
                    	if (this.entity.pos.y > player.pos.y) {
                        	return this.doAction(ig.ai.ACTION.Up);
                    	} 
                    	else {
                        	return this.doAction(ig.ai.ACTION.Down);
                    	}                        
                	}
           		}
            	
            }
            
            /*if (distance >= 350){
            	return this.doAction(ig.ai.ACTION.Right);
            }*/
            return this.doAction(ig.ai.ACTION.Right);
            
			
		},
				
		//Actually doing the action. Saving the action variable
		doAction: function(action){
			this.lastaction = action;
			return action;
		},
		
	});
	
});
