function Word(value,pos){

    this.value = value;

    this.pos = pos; 

    this.parent;

    this.children=[];

    this.draw = (text_size) => {

        textSize(text_size);
    
        text_width = textWidth(this.value)
    
        rectMode(CENTER)
        fill(200,200,200)
        rect(this.pos.x, this.pos.y, text_width+10, text_size,10);
    
        textAlign(CENTER,CENTER);
        
        fill(100, 100, 200);
        text(this.value,this.pos.x,this.pos.y);
    
    }

    this.drawLineToParent = () => {
        if(this.parent){
            push();
            stroke(255);
            line(this.pos.x,this.pos.y,this.parent.pos.x,this.parent.pos.y);
            pop();
        }
    }
}

