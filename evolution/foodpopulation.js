function FoodPopulation(popsize){
    this.popsize= popsize

    this.food = [];
    this.poison = [];

    for(let i=0;i<popsize;i++ ){
        this.food[i]= new FoodParticle();
    }
    
    this.run = () => {
        this.food = this.food.filter(item => item.alive !== false)
        for(let i=0;i<this.food.length;i++){
            this.food[i].show();
        }
        for(let i=0;i<2;i++){
        this.food.push(new FoodParticle());
        }
    }
    this.addFoodParticle = (pos) => {
        this.food.push(new FoodParticle(pos));
    }
}