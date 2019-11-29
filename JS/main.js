let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let obsacleSpeedMin = 3;

function makeGameHarder() {
    obsacleSpeedMin = 4 + (score/100);
}

let racingCar = new RacingCar();
racingCar.beginCar();
let obstacles = [];
let multiObs = new MultiObstace();
multiObs.createMultiObstace();


function isColliding(object1, object2) {
    return (object1.x < object2.x + object2.width - 10 && object1.x > object2.x - object1.width +10
        && object1.y < object2.y + object2.height -10 && object1.y > object2.y - object1.height +10);
}

function resultColliding() {
    for (let i = 0; i < obstacles.length; i++) {
        if(isColliding(racingCar.car,obstacles[i])){
            if(obstacles[i].img.src.indexOf("coin.png") >=0) {
                score += 30;
                obstacles[i].y = canvas.height;
            }
            else
                endGame();
        }
    }
}

function avoidColliding() {
    for (let i = 0; i < obstacles.length -1; i++) {
        for (let j = i+1; j < obstacles.length; j++) {
            if(isColliding(obstacles[i],obstacles[j])) {
                if(obstacles[i].x> CAR_SPEED) {
                    obstacles[i].x -= CAR_SPEED;
                }
                if(obstacles[j].x+CAR_WIDTH<canvas.width-CAR_SPEED) {
                    obstacles[j].x += CAR_SPEED;
                }
            }
        }
    }
}

let arrRoad = [];
let z = 0;
function creatRoad() {
    let imgRoad1 = new Image();
    imgRoad1.src = "images/road1.png";
    let imgRoad2 = new Image();
    imgRoad2.src = "images/road2.png";
    let imgRoad3 = new Image();
    imgRoad3.src = "images/road3.png";

    for (let i = 0; i < 5; i++) {
        arrRoad[i] = imgRoad1;
    }
    for (let i = 5; i < 10; i++) {
        arrRoad[i] = imgRoad2;
    }
    for (let i = 10; i < 15; i++) {
        arrRoad[i] = imgRoad3;
    }
    if (z < arrRoad.length) {
        ctx.drawImage(arrRoad[z], 0, 0);
        if (z ===14)
            z= 0;
    }
    z++;
}


function menu() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let imgRoad1 = new Image();
    imgRoad1.src = "images/road1.png";
    ctx.drawImage(imgRoad1, 0, 0);
    ctx.fillStyle = "#000000";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RACING CAR",canvas.width/2,canvas.height/4);
    ctx.font = '24px Arial';
    ctx.fillText('Click to Play', canvas.width / 2, canvas.height / 2);
    ctx.font = '18px Arial';
    ctx.fillText('Dùng phím mũi tên để di chuyển', canvas.width / 2, (canvas.height / 4) * 3);
    ctx.fillText('Ăn xu được 30đ, vượt 1 xe được 1đ', canvas.width / 2, (canvas.height / 4) *3.2);
    canvas.addEventListener('click', playGame);
}

function endGame() {
    clearInterval(play);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let imgCrash = new Image();
    imgCrash.src = "images/crash.jpg";
    ctx.drawImage(imgCrash,0,0);
    ctx.fillStyle = 'rgb(105,255,28)';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over. Final Score: ' + score, canvas.width/2, canvas.height/2);
    ctx.fillText('Click để reload', canvas.width/2, canvas.height/2 +30);
    racingCar.car.speed =0;
    canvas.addEventListener('click', reloadGame);
}

function reloadGame() {
    location.reload();
}

function showScore() {
    ctx.fillStyle = "white";
    ctx.font = '22px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(' Score: ' + score, 15, 25);
}

function startGame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    creatRoad();
    racingCar.updateCar();
    multiObs.updateObstace();
    resultColliding();
    avoidColliding()
    multiObs.deleteObstace();
    showScore()
    makeGameHarder()}

function playGame(){
    canvas.removeEventListener('click', playGame);
    play = setInterval(startGame, 30);
}

menu();