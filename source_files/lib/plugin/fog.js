/**
 * @author Delmy
 */

ig.module(
  'plugin.fog'
)
.requires(
  'impact.impact'
)
.defines(function() {

ig.Fog = ig.Class.extend({
	//fog color
	fillStyle: 'rgba(0,0,0,1)',
	
	init: function (mapWidth, mapHeight, tileSize) {
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.tileSize = tileSize;
	},
	
	draw: function (tileSeen) {
		var fogCol = [];
		var col = null;
		for (var i = 0; i < this.mapWidth; i++) {
			for (var j = 0; j < this.mapHeight; j++) {
				if(!col) {
					col = { i: i, j: j, tiles: 0};
				}
				
				if (viewedTile(x, y)) {
					if(col.tiles > 0) {
						fogCol.push(col);
					}
					col = null;
				}
				else if((j + 1) == this.mapHeight) {
					col.tiles++;
					fogCol.push(col);
					col = null;
				}
				else {
					col.tiles++;
				}
			}
		}
		for (var i = 0; i < fogCol.length; i++) {
			var col = fogCol[i];
			this.drawCol(col.x, col.y, col.tiles);
		}
	},
	
	drawCol: function(x, y, tiles) {
		ig.system.context.fillStyle = this.fillStyle;
		ig.system.context.fillRect(this.loc(x), this.loc(y), this.loc(1), this.loc(tiles));
		ig.Image.drawCount++;
	},
	
	loc: function(number) {
		return number*this.tileSize*ig.system.scale;
	}
});
});