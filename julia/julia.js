// source mandelbrot: https://www.youtube.com/watch?v=6z7GQewK-Ks&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=24
// source julia: https://www.youtube.com/watch?v=fAsaSkmbF5s&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=25

var cx = 0;
var cy = 0;
var zoom = 1.5
var zoomSlider;
var maxiterations = 100;

function setup() {
	createCanvas(900, 450);
}

function drawMandelbrot(){
	for (let x = 0; x < width/2; x++) {
		for (let y = 0; y < height; y++) {
            // map to value around
            var a = map(x,0,width/2,cx-zoom,cx+zoom);
            var b = map(y,0,height,cy-zoom,cy+zoom);

            // Z0 = 0
            var ca = a;
            var cb = b;

            var iteration = 0;
            while(iteration<maxiterations){
                // Z = Z^2+C
                // (a+bi)^2 = (a^2 - b^2) + (2ab)i 
                let newa = (a*a - b*b);
                let newb = (2*a*b);

                a = newa + ca;
                b = newb + cb;

                // if values diverge (towards infinity)
                if(abs(a+b)>4){
                    break;
                }

                iteration++;
            }
            var bright = map(iteration,0,maxiterations,50,255);

            if(iteration==maxiterations){
                bright=0;
            }

			let pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255;
		}
	}
}
function drawJulia(){
	for (let x = width/2; x < width; x++) {
		for (let y = 0; y < height; y++) {
            // map to value around
            var a = map(x,width/2,width,cx-zoom,cx+zoom);
            var b = map(y,0,height,cy-zoom,cy+zoom);

            // Z0 = 0
            //var ca = a;
            //var cb = b;
            var ca = map(mouseX,0,width/2,-1,1);
            var cb = map(mouseY,0,height,-1,1);

            var iteration = 0;
            while(iteration<maxiterations){
                // Z = Z^2+C
                // (a+bi)^2 = (a^2 - b^2) + (2ab)i 
                let newa = (a*a - b*b);
                let newb = (2*a*b);

                a = newa + ca;
                b = newb + cb;

                // if values diverge (towards infinity)
                if(abs(a+b)>4){
                    break;
                }

                iteration++;
            }
            var bright = map(iteration,0,maxiterations,50,255);

            if(iteration==maxiterations){
                bright=0;
            }

			let pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255;
		}
	}
}
function draw() {
	if (frameCount % 10 == 0) {
        pixelDensity(1);
	    loadPixels();

        drawMandelbrot();
        drawJulia();

        updatePixels();
    }

}
