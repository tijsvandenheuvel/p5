var spheres_check = false;

var metatron_check = false;
var tetrahedron_check = false;
var hexahedron_check = false;
var octahedron_check = false;
var dodecahedron_check = false;
var isocahedron_check = true;

function getCheckboxes(){
    ui_x_pos = windowWidth * (5 / 6);

   // slider = createSlider(63.08773, 63.08774, 63.08774,0.0001)
    slider = createSlider(0, 200, 60, 0.1); // min, max, start
    slider.position(ui_x_pos-500,10); // x and y
    slider.size(500, 20);

	checkbox_metatron = createCheckbox("metatron", metatron_check);
	checkbox_metatron.changed(myCheckedEvent2);
	checkbox_metatron.position(ui_x_pos, 60);

	checkbox_fruitoflife = createCheckbox("spheres", spheres_check);
	checkbox_fruitoflife.changed(myCheckedEvent3);
	checkbox_fruitoflife.position(ui_x_pos, 80);

    checkbox_floweroflife = createCheckbox("tetrahedron", tetrahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent4);
	checkbox_floweroflife.position(ui_x_pos, 180);

    text = createElement("h5", "simple cubic");
	text.position(ui_x_pos, 80);

    checkbox_floweroflife = createCheckbox("hexahedron", hexahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent5);
	checkbox_floweroflife.position(ui_x_pos, 120);

    checkbox_floweroflife = createCheckbox("octahedron", octahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent6);
	checkbox_floweroflife.position(ui_x_pos, 140);


    // checkbox_floweroflife = createCheckbox("dodecahedron", dodecahedron_check);
	// checkbox_floweroflife.changed(myCheckedEvent7);
	// checkbox_floweroflife.position(ui_x_pos, 160);

    checkbox_floweroflife = createCheckbox("isocahedron", isocahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent8);
	checkbox_floweroflife.position(ui_x_pos, 200);
}

function myCheckedEvent2(){
    metatron_check = this.checked();
}
function myCheckedEvent3(){
    spheres_check = this.checked();
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
