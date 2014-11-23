/**
 * @author Delmy
 */
ig.module('plugin.camera')
.requires(
	'impact.impact'
)
.defines(function() {
	Camera = ig.Class.extend({
		trap : {
			pos : { x : 0, y : 0 },
			size : { x : 64, y : 64 }
		},
		max : { x : 0, y : 0 },
		offset : { x : 0, y : 0 },
		pos : { x : 0, y : 0 },
		damping : 5,
		lookAhead : { x : 0, y : 0 },
		currentLookAhead : { x : 0, y : 0 },
		
		//For debugging purposes in console ONLY. Do not turn on here!
		debug: false,

		init : function(offsetx, offsety, damping) {
			this.offset.x = offsetx;
			this.offset.y = offsety;
			this.damping = damping;
		},

		set : function(entity) {
			this.pos.x = entity.pos.x - this.offset.x;
			this.pos.y = entity.pos.y - this.offset.y;
			this.trap.pos.x = entity.pos.x - (this.trap.size.x / 2);
			this.trap.pos.y = entity.pos.y - this.trap.size.y;
		},

		follow : function(entity) {

			ig.game.screen.x = this.pos.x;
			ig.game.screen.y = this.pos.y;
		},

		move : function(axis, pos, size) {
			var lookAhead = 0;
			if (pos < this.trap.pos[axis]) {
				this.trap.pos[axis] = pos;
				this.currentLookAhead[axis] = this.lookAhead[axis];
			} else if (pos + size > this.trap.pos[axis] + this.trap.size[axis]) {
				this.trap.pos[axis] = pos + size - this.trap.size[axis];
				this.currentLookAhead[axis] = -this.lookAhead[axis];
			}

			return (this.pos[axis] - 
				(this.pos[axis] - this.trap.pos[axis] + this.offset[axis] + 
					this.currentLookAhead[axis]) * ig.system.tick * this.damping).limit(0, this.max[axis]);
		},

		draw : function() {
			//For debugging purposes in console ONLY.
			if (this.debug) {
				ig.system.context.fillStyle = 'rgba(255, 0 , 255, 0.3)';
				ig.system.context.fillRect((this.trap.pos.x - this.pos.x) * ig.system.scale,
				 (this.trap.pos.y - this.pos.y) * ig.system.scale,
				  this.trap.size.x * ig.system.scale, this.trap.size.y * ig.system.scale);
			}
		}
	});
});
