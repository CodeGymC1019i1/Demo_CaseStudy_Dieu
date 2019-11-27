let Car = function (x, y,width,height, speed,canvas) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width =width;
    this.height=height;
    this.orientation = "down";
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.drawCar = function () {
        let image = new Image();
        image.src = "car.png";
        this.ctx.drawImage(image, this.x, this.y);
    };


    this.move = function () {
        switch (this.orientation) {
            case "right":
                if (this.x <= canvas.width-50)
                    this.x += this.speed;
                break;
            case "left":
                if (this.x >= 0)
                    this.x -= this.speed;
                break;
            case "up":
                if (this.y >= 0)
                    this.y -= this.speed;
                break;
            case "down":
                if (this.y <= canvas.height-100)
                    this.y += this.speed;
                break;
        }
    }
}


let RacingCar = function (canvas) {
    this.car = new Car(150,500,50,100,20,canvas);
    this.ctx = canvas.getContext("2d");

    this.begin = function () {
        this.car.drawCar();
    };
    this.updateCar = function () {
        this.car.drawCar();
    } ;

    this.moveCar = function (event) {
        let orientation = 0;
        switch (event.which) {
            case 37:
                orientation = "left";
                break;
            case 38:
                orientation = "up";
                break;
            case 39:
                orientation = "right";
                break;
            case 40:
                orientation = "down";
                break;
        }
        if(orientation) {
                this.car.orientation = orientation;
                this.car.move();
            this.updateCar();
        }
    }


}


