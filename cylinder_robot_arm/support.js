function createUIElements(){
    //ui_pos = windowWidth*2/3 - 260; 

    ui_pos = windowWidth*2/3 +10;

    text = createElement('h5', "default: 2, 150, 50");   
    text.position(ui_pos, 0);
    
    input1 = createInput();
    input1.position(ui_pos, 40);
    input1.size(30);

    input2 = createInput();
    input2.position(ui_pos, 60);
    input2.size(30);

    input3 = createInput();
    input3.position(ui_pos, 80);
    input3.size(30);
      
    button1 = createButton('change amount');
    button1.position(input1.x + input1.width, 40);
    button1.mousePressed(changeAmount);
    button2 = createButton('change radius');
    button2.position(input1.x + input1.width, 60);
    button2.mousePressed(changeRadius);
    button3 = createButton('change height');
    button3.position(input1.x + input1.width, 80);
    button3.mousePressed(changeHeight);

    // creeer checkbox om simulatie aan en uit te zetten
    checkbox_run = createCheckbox('run', true);
    checkbox_run.changed(myCheckedEvent1);
    checkbox_run.position(windowWidth*2/3 +10 ,110)

    // creeer checkbox om kleur aan en uit te zetten
    checkbox_color = createCheckbox('fill colors', false);
    checkbox_color.changed(myCheckedEvent2);
    checkbox_color.position(windowWidth*2/3 +10 ,130)

    // creeer checkbox om lijnen aan en uit te zetten
    checkbox_lines = createCheckbox('draw lines', false);
    checkbox_lines.changed(myCheckedEvent3);
    checkbox_lines.position(windowWidth*2/3 +10 ,150)

    // creeer checkbox om punten / bollen aan en uit te zetten
    checkbox_points = createCheckbox('draw points', true);
    checkbox_points.changed(myCheckedEvent4);
    checkbox_points.position(windowWidth*2/3 +10 ,170)
}

function changeAmount(){
    sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
    setup(int(input1.value()),moduleRadius,moduleSegmentHeight);
}
function changeRadius(){
    sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
    setup(numberOfModules,int(input2.value()),moduleSegmentHeight);   
}
function changeHeight(){
    sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
    setup(numberOfModules,moduleRadius,int(input3.value()));
}

function getColors(amount){
    let colors = [];
    for( i= 0;i<amount;i++){
        colors.push(color(random(0,255), random(0,255), random(0,255)))
    }
    return colors;
}

function getSliders(amount){
    length = windowWidth/8

    let sliders =[]
    
    for(i=0;i<amount;i++){
        // open close slider
        let slider = createSlider(0, PI/2, 0, 0.001); // min, max, start
        slider.position(10,10+i*20); // x and y
        slider.size(length, 20);
    
 
        // turn around slider
        let slider2 = createSlider(0, 2*PI, 0, 0.001); // min, max, start
        slider2.position(length+20,10+ i*20); // x and y
        slider2.size(length, 20);

        if(i===amount-1){
            slider2.hide()
        }
        
        let subsliders =[slider,slider2]
        sliders.push(subsliders)
    }
    //console.log(sliders)
    return sliders
}

function myCheckedEvent1() {
    if (this.checked()) {runsim_checkbox_value=true;} else {runsim_checkbox_value=false;}
}

function myCheckedEvent2() {
    if (this.checked()) {color_checkbox_value=true;} else {color_checkbox_value=false;}
}

function myCheckedEvent3() {
    if (this.checked()) {lines_checkbox_value=true;} else {lines_checkbox_value=false;}
}

function myCheckedEvent4() {
    if (this.checked()) {points_checkbox_value=true;} else {points_checkbox_value=false;}
}