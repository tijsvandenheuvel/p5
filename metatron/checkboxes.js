var metatron_check = true;
var fruitoflife_check = true;
var background_check = false;
var tetrahedron_check = false;
var hexahedron_check = false;
var octahedron_check = false;
var dodecahedron_check = false;
var isocahedron_check = false;

function getCheckboxes(){
    ui_x_pos = windowWidth * (5 / 6);

    slider = createSlider(0, 200, 60); // min, max, start
    slider.position(ui_x_pos,10); // x and y
    slider.size(100, 20);

    checkbox_background = createCheckbox("background", background_check);
	checkbox_background.changed(myCheckedEvent1);
	checkbox_background.position(ui_x_pos, 40);

	checkbox_metatron = createCheckbox("metatron", metatron_check);
	checkbox_metatron.changed(myCheckedEvent2);
	checkbox_metatron.position(ui_x_pos, 60);

	checkbox_fruitoflife = createCheckbox("fruit of life", fruitoflife_check);
	checkbox_fruitoflife.changed(myCheckedEvent3);
	checkbox_fruitoflife.position(ui_x_pos, 80);

    checkbox_fruitoflife = createCheckbox("tetrahedron", tetrahedron_check);
	checkbox_fruitoflife.changed(myCheckedEvent4);
	checkbox_fruitoflife.position(ui_x_pos, 100);

    checkbox_fruitoflife = createCheckbox("hexahedron", hexahedron_check);
	checkbox_fruitoflife.changed(myCheckedEvent5);
	checkbox_fruitoflife.position(ui_x_pos, 120);

    checkbox_fruitoflife = createCheckbox("octahedron", octahedron_check);
	checkbox_fruitoflife.changed(myCheckedEvent6);
	checkbox_fruitoflife.position(ui_x_pos, 140);

    checkbox_fruitoflife = createCheckbox("dodecahedron", dodecahedron_check);
	checkbox_fruitoflife.changed(myCheckedEvent7);
	checkbox_fruitoflife.position(ui_x_pos, 160);

    checkbox_fruitoflife = createCheckbox("isocahedron", isocahedron_check);
	checkbox_fruitoflife.changed(myCheckedEvent8);
	checkbox_fruitoflife.position(ui_x_pos, 180);
}

function myCheckedEvent1(){
    background_check = this.checked();
}
function myCheckedEvent2(){
    metatron_check = this.checked();
}
function myCheckedEvent3(){
    fruitoflife_check = this.checked();
}
function myCheckedEvent4(){
    tetrahedron_check = this.checked();
}
function myCheckedEvent5(){
    hexahedron_check = this.checked();
}
function myCheckedEvent6(){
    octahedron_check = this.checked();
}
function myCheckedEvent7(){
    dodecahedron_check = this.checked();
}
function myCheckedEvent8(){
    isocahedron_check = this.checked();
}


function intersect_point(point1, point2, point3, point4) {
    const ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
              (point4.y - point3.y) * (point1.x - point3.x)) /
             ((point4.y - point3.y) * (point2.x - point1.x) - 
              (point4.x - point3.x) * (point2.y - point1.y));
   
   const ub = ((point2.x - point1.x) * (point1.y - point3.y) - 
              (point2.y - point1.y) * (point1.x - point3.x)) /
             ((point4.y - point3.y) * (point2.x - point1.x) - 
              (point4.x - point3.x) * (point2.y - point1.y));
   
   const x = point1.x + ua * (point2.x - point1.x);
   const y = point1.y + ua * (point2.y - point1.y);
   
   return [x, y]
 }