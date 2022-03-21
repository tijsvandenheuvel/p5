// source: https://www.youtube.com/watch?v=6z7GQewK-Ks&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=24

var cx = -0.45;
var cy = 0;
var zoom = 1.15
var zoomSlider;
var maxiterations = 100;

function setup() {
	createCanvas(600, 600);
    zoomSlider = createSlider(0.0001,zoom, zoom, 0.0001);
    zoomSlider.position(10, 610);
    zoomSlider.size(600, 20);
    drawMandelbrot();
}

function drawMandelbrot(){
    zoom = zoomSlider.value()
	pixelDensity(1);
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
            var a = map(x,0,width,cx-zoom,cx+zoom);
            var b = map(y,0,height,cy-zoom,cy+zoom);

            var originala = a;
            var originalb = b;

            var iteration = 0;

            while(iteration<maxiterations){
                var newa = a*a - b*b;
                var newb = 2*a*b;

                a = newa + originala;
                b = newb + originalb;

                // if values diverge (towards infinity)
                if(abs(a+b)>16){
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
	updatePixels();
}
function draw() {
	if (frameCount % 10 == 0) {
        drawMandelbrot();
    }

}

function mousePressed(){
    if(mouseX<width&&mouseY<height){
        cx = map(mouseX,0,width,cx-zoom,cx+zoom);
        cy = map(mouseY,0,height,cy-zoom,cy+zoom);
    }
}
