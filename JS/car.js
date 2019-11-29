let Car = function (x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.orientation = "down"

    this.draw = function () {
        let img = new Image();
        img.src = "images/car.png";
        ctx.drawImage(img,this.x,this.y,this.width,this.height);
    }
    this.move = function () {
        switch (this.orientation) {
            case "left":
                if ( this.x >= this.speed)
                    this.x -= this.speed;
                break;
            case "right":
                if ( this.x <= canvas.width - this.width)
                    this.x += this.speed;
                break;
            case "up":
                if(this.y >= this.speed)
                    this.y -= this.speed;
                break;
            case "down":
                if(this.y <= canvas.height - this.height)
                    this.y += this.speed;
                break;
        }

    }
}

let RacingCar = function () {
    this.car = new Car(canvas.width/2 - CAR_WIDTH/2,canvas.height - CAR_HEIGHT -10,CAR_WIDTH,CAR_HEIGHT,CAR_SPEED);

    this.beginCar = function () {
        this.car.draw();
    };
    this.updateCar = function () {
        this.car.draw();
    };
    this.moveCar = function () {
        let orientation = "";
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
};