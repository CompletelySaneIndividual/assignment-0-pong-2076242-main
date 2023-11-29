import {generateRandomNumber} from './utilities.js';

export default class Ball{
    constructor(x, y, width, height, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = generateRandomNumber(400, 600);
        this.dx = generateRandomNumber(400, 600);
        this.canvasHeight = canvasHeight;
        this.sounds = {
            paddleHit: new Audio('./sounds/paddle_hit.wav'),
            wallHit: new Audio('./sounds/wall_hit.wav'),
        };
    }
    update(dt, player1, player2) {
        if(this.didCollide(player1) || this.didCollide(player2)){
            this.dx = -this.dx;
            this.sounds.paddleHit.play();
        }

        if(this.y <=0 ){
            this.y = 0;
            this.dy = -this.dy;
            this.sounds.wallHit.play();
        }

        if(this.y >= this.canvasHeight-this.height){
            this.y = this.canvasHeight-this.height;
            this.dy = -this.dy;
            this.sounds.wallHit.play();
        }

        this.x += this.dx * dt;
        this.y += this.dy * dt;
    }
    render(context) {
        context.fillRect(this.x, this.y, this.width, this.height); //ball 
    }
    reset(x, y, player){
        this.x = x;
        this.y = y;
        this.dy = generateRandomNumber(400, 600);
        if(player === 1){
            this.dx = generateRandomNumber(400, 600, -1);
        }else if(player === 2){
            this.dx = generateRandomNumber(400, 600, 1);
        }else{
            this.dx = generateRandomNumber(400, 600);
        }
        
    }
    didCollide(paddle){
        return (this.x < paddle.x + paddle.width 
        && paddle.x < this.x +this.width
        && this.y < paddle.y + paddle.height
        && paddle.y < this.y +this.height);
    }
}