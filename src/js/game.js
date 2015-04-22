pointID = 0;

function Point(data) {
	data = data || {};
	
	this.x = data.x || 0;
	this.y = data.y || 0;
	
	this.id = pointID;
	pointID++;
	
	this.distance = function(point2) {
		var point1 = this || {};
		var point2 = point2 || {};
		
		point1.x = point1.x || 0;
		point1.y = point1.y || 0;
		point2.x = point2.x || 0;
		point2.y = point2.y || 0;
	
		var dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
		return dist;
	}
	
	this.angle = function(point2) {
		var point1 = this || {};
		var point2 = point2 || {};
		
		point1.x = point1.x || 0;
		point1.y = point1.y || 0;
		point2.x = point2.x || 0;
		point2.y = point2.y || 0;
	
		var rx = point2.x - point1.x;
		var ry = point2.y - point1.y;
	
		var theta = Math.atan(ry/rx);
		if (rx < 0) theta = theta + Math.PI;
	
		if(isNaN(theta)) theta = 0;
		return theta;
	}
}

function Vector(data) {
	data = data || {};
	
	Point.call(this, data);
	
	this.rad = data.rad || 0;
	this.vel = data.vel || 0;
	
	this.move = function() {
		this.x += this.run();
		this.y += this.rise();
		return this;
	};
	
	this.run = function(vel) {
		var vel = vel || this.vel;
		return Math.cos(this.rad) * vel;
	}
	
	this.rise = function(vel) {
		var vel = vel || this.vel;
		return Math.sin(this.rad) * vel;
	}
	
	/* add two vectors together returns the resulting vector */
	this.add = function(vector2) {
		var vector1 = this || {};
		var vector2 = vector2 || {};
		
		var ax = vector1.run();
		var ay = vector1.rise();
		
		var bx = vector2.run();
		var by = vector2.rise();
		
		var rx = bx + ax;
		var ry = by + ay;
		
		var r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));
		var theta = Math.atan(ry/rx);
		
		if(isNaN(theta)) theta = 0;
		if (rx < 0) theta = theta + Math.PI;
		
		this.vel = r;
		this.rad = theta;
	}
}

Vector.prototype = new Point();