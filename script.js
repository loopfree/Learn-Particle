const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

let particlesArray;

let DegToRad = function(degrees) {
	return degrees * Math.PI /180;
}

let RadToDeg = function(radian) {
	return radian * 180 / Math.PI;
}

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener("mousemove",
    function(event) {
        // mouse.x = event.x;
        // mouse.y = event.y;
        if(mouse.x == null) {
        	mouse.x = event.x;
        	mouse.y = event.y;
        	console.log("yes");
        	return;
        }
        let gradient = Number((event.y - mouse.y) / (event.x - mouse.x));

        mouse.x = event.x;
        mouse.y = event.y;
		let radian = Number(Math.atan(gradient));

		let degree = RadToDeg(radian);

		let cs = Math.cos(radian);
		let sn = Math.sin(radian);

		particlesArray.forEach(function(particle) {
			let xDist = (particle.x - mouse.x);
			let yDist = (particle.y - mouse.y);
			let checkDist = Math.sqrt((xDist*xDist + yDist*yDist));
			if(checkDist <= mouse.radius) {
				let new_x = particle.directionX * cs - particle.directionY * sn;
				let new_y = particle.directionX * sn + particle.directionY * cs;
				particle.directionX = new_x;
				particle.directionY = new_y;
			}
		});
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, (Math.PI) * 2, false);
        ctx.fillStyle = "#8C5523"
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width  || this.x < 0) {
            this.directionX = this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = this.directionY;
        }

        // collision
        // let dx = mouse.x - this.x;
        // let dy = mouse.y - this.y;
        // let distance = Math.sqrt(dx*dx + dy*dy);
        // if (distance < mouse.radius + this.size) {
        //     if (mouse.x < this.x && this.x < canvas.width  - this.size * 10) {
        //         this.directionX *= -1;
        //     }
        //     if (mouse.x > this.x && this.x > this.size * 10) {
        //         this.directionX *= -1;
        //     }
        //     if (mouse.y < this.y && this.y < canvas.height  - this.size * 10) {
        //         this.directionY *= -1;
        //     }
        //     if (mouse.y > this.y && this.y > this.size * 10) {
        //         this.direction.Y *=;
        //     }
        // }

        if(this.x > canvas.width) {
        	this.directionX *= -1;
        }

        if(this.x < 0) { 
        	this.directionX *= -1;
       	}

       	if(this.y > canvas.height) {
       		this.directionY *= -1;
       	}

       	if(this.y < 0) {
       		this.directionY *= -1;
       	}

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// create particle
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i=0; i<numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = 50//(Math.random() * ((innerWidth - size * 2)-(size * 2)) + size * 2);
        let y = 50//(Math.random() * ((innerHeight - size * 2)-(size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#8C5523";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i=0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();