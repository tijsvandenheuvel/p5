// source: https://www.youtube.com/watch?v=f5QBExMNB1I&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=72
// wiki: https://en.wikipedia.org/wiki/Rose_(mathematics)
var n = 5;
var d = 8;
var sliderN;
var sliderD;

function setup(){
    createCanvas(600,600);
    sliderN = createSlider(1, 10, n, 0.1)
    sliderN.position(10, 610)
    sliderD = createSlider(1, 10, d, 0.1)
    sliderD.position(300, 610)
}

function draw(){
    background(51);
    text(n+' / '+d, 10, 15);

    n = sliderN.value();
    d = sliderD.value();
    translate(width/2, height/2);

    beginShape();
    stroke(255);
    strokeWeight(1);
    noFill();
    for( let a=0; a<TWO_PI*d;a+=0.02){
        let r = 150 * cos((n/d)*a);
        let x = r*cos(a);
        let y = r*sin(a);
        vertex(x,y);
    }
    endShape();

}