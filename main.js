import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import ComputerPlayer from "./AI.js";

const sounds = {
    score: new Audio('./sounds/score.wav'),
};

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const VICTORY_SCORE = 10;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1')

document.body.appendChild(canvas);

let lastTime = 0;
let gameState = 'start';

let player1Score = 0;
let player2Score = 0;
let servingPlayer;
let winningPlayer;

const ball = new Ball(CANVAS_WIDTH/2 -10, CANVAS_HEIGHT/2 -10, 20, 20, CANVAS_HEIGHT, CANVAS_WIDTH);

const player1 = new Paddle(30, 30, 20, 200, CANVAS_HEIGHT);
const player2 = new Paddle(CANVAS_WIDTH - 50, CANVAS_HEIGHT - 230, 20, 200, CANVAS_HEIGHT, CANVAS_WIDTH);
const PADDLE_SPEED = 1000;

const AI = new ComputerPlayer(player2);

const keys = {};

canvas.addEventListener('keydown', (event) => {
    keys[event.key] = true;
})
canvas.addEventListener('keyup', (event) => {
    keys[event.key] = false;
})

function gameLoop( curentTime = 0) {
    const deltaTime = (curentTime - lastTime) /1000

    update(deltaTime);
    lastTime = curentTime;
    requestAnimationFrame(gameLoop);
}

function update(dt){
    if (keys.Enter) {
        keys.Enter = false;
    
        if (gameState === 'start') {
            gameState = 'serve';
        }else if (gameState === 'victory') {
            player1Score = 0;
            player2Score = 0;
            servingPlayer = winningPlayer;
        
            ball.reset(CANVAS_WIDTH / 2 - 10, CANVAS_HEIGHT / 2 - 10, servingPlayer);
            gameState = 'serve';
        }
    }
    if (gameState === 'serve') {
        gameState = 'play';
    }
    if (gameState === 'play'){
        //player 1 movement
        if(keys.w){
            player1.moveUp();
        }else if(keys.s){
            player1.moveDown();
        }else{
            player1.stop();
        }

        //player 2 movement
        //if(keys.ArrowUp){
        //    player2.moveUp();
        //}else if(keys.ArrowDown){
        //    player2.moveDown();
        //}else{
        //    player2.stop();
        //}
        AI.move(ball.x, ball.y)

        if(ball.x + ball.width < 0){
            servingPlayer = 2;
            player2Score++;
            sounds.score.play();

            if(player2Score === VICTORY_SCORE){
                winningPlayer = 2;
                gameState = 'victory';
            }else{
                ball.reset(CANVAS_WIDTH / 2 - 10, CANVAS_HEIGHT / 2 - 10, servingPlayer);
                gameState = 'serve';
            }

        }else if(ball.x > CANVAS_WIDTH){
            servingPlayer = 1;
            player1Score++;
            sounds.score.play();

            if(player1Score === VICTORY_SCORE){
                winningPlayer = 1;
                gameState = 'victory';
            }else{
                ball.reset(CANVAS_WIDTH / 2 - 10, CANVAS_HEIGHT / 2 - 10, servingPlayer);
                gameState = 'serve';
            }
        }

        player1.update(dt);
        player2.update(dt);
        ball.update(dt, player1, player2);
    }

    render()
}

function render(){
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if(gameState == 'start'){
        context.fillText("Welcome to Pong!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }else if(gameState == 'play' || gameState == 'serve'){
        player1.render(context)
        ball.render(context);
        player2.render(context);

        //score:
        context.font = '60px Arial';
        context.fillText(player1Score, CANVAS_WIDTH * 0.25, 75);    
        context.fillText(player2Score, CANVAS_WIDTH * 0.75, 75); 
    }else if (gameState === 'victory') {
        context.fillText(`🎉 Player ${winningPlayer} wins! 🎉`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
        context.fillText(`Press Enter to restart!`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4 + 40);
    }
}

gameLoop();

