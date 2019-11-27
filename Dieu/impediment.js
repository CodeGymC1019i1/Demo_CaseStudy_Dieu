let Impediment = function (img,x,y,width,height,speed,canvas) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.canvas = canvas;
    this.image = img;
    this.width = width;
    this.height = height;


    this.moveDown = function (score) {
            this.y += this.speed;
            if (this.y > this.canvas.height){
                this.y = 0;
                score++;
                this.x = Math.random()*(this.canvas.width-50);
                this.speed = Math.random()*3+1;
                let n = Math.floor(Math.random()*4);
                this.image.src = "impediment"+n+".png"
            }
            return score;
    }
    this.drawImpediment = function () {
        this.canvas.getContext("2d").drawImage(this.image,this.x,this.y)
    }
};

let MultiImpediment = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.arrImpediment = [];

    this.createImpediment = function () {
        let image = new Image();
        let x = Math.random()*canvas.width
        let n  = Math.floor(Math.random()*3);
        image.src = "impediment"+n+".png";
        let speed = Math.random()*3+2;
        let impediment = new Impediment(image,x,0,50,100,speed,this.canvas);
        this.arrImpediment.push(impediment);
        impediment.drawImpediment();
    };
    this.createMultiImpediment = function () {
        for (let i = 0; i < 20; i++) {
            this.createImpediment();
        }
        for (let i = 0; i < 9; i++) {
            for (let j = i+1; j <10 ; j++) {
                if(this.arrImpediment[i].x +this.arrImpediment[i].width > this.arrImpediment[j].x
                && this.arrImpediment[i].x < this.arrImpediment[j]+this.arrImpediment[j].width
                &&this.arrImpediment[i].y<this.arrImpediment[j]+this.arrImpediment[j].height
                &&this.arrImpediment[i].y+this.arrImpediment[i]>this.arrImpediment[j])
                    this.arrImpediment[i].x = this.arrImpediment[j].x - this.arrImpediment[i].width - 5;
                    this.arrImpediment[i].y = this.arrImpediment[j].y - this.arrImpediment[i].height - 5;
            }
        }

        return this.arrImpediment;
    };

}

