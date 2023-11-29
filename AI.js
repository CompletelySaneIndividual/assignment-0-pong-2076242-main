export default class ComputerPlayer{
    constructor(player){
        this.player = player;
    }
    move(ballX, ballY){
        console.log("BallX = " + ballX);
        console.log("canvas width = " + this.player.canvasWidth);
        console.log("this.player.canvasWidth * 0.75 = " + this.player.canvasWidth * 0.75);
        console.log(ballX >= (this.player.canvasWidth * 0.75));

        if(ballX >= (this.player.canvasWidth * 0.75)){//will only pay attention to the ball if it is in the quarter closest to it
            console.log("Paying attention to ball")
            if(ballY <= this.player.y + this.player.height && ballY >= this.player.y){
                this.player.stop();
            }else if(ballY > this.player.y + this.player.height){
                this.player.moveDown();
            }else if(ballY < this.player.y){
                this.player.moveUp();
            }
        }
    }
}