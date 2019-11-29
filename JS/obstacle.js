let Obstacle = function (src,width,height) {
        this.y = 0;
        this.x = Math.floor(Math.random()*(canvas.width/CAR_WIDTH))*CAR_WIDTH;
        this.speed = Math.random()*6+ obsacleSpeedMin;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
        this.drawObstacle = function () {
            ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        }
        this.moveDown = function () {
            console.log(this.speed);
            this.y += this.speed;
        }
};

let MultiObstace = function () {
    this.createObstace = function () {
        let n = Math.floor(Math.random()*3);
        let src = "images/object"+n+".png";
        let obstacle = new Obstacle(src,CAR_WIDTH,CAR_HEIGHT);
        obstacles.push(obstacle);
    };
    this.createCoin = function () {
        let src = "images/coin.png";
        let coin = new Obstacle(src,COIN_WIDTH,COIN_HEIGHT);
        obstacles.push(coin);
    }
    this.createMultiObstace = function () {
        setInterval(this.createObstace,TIME_BETWEEN_ENEMIES);
        setInterval(this.createCoin,TIME_BETWEEN_COIN);
    };
    this.updateObstace = function () {
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].moveDown();
            obstacles[i].drawObstacle();
        }
    }
    this.deleteObstace = function () {
        for (let i = 0; i < obstacles.length; i++) {
            if(obstacles[i].y>=canvas.height) {
                obstacles.splice(i, 1);
                score++;
            }
        }
    }
};


