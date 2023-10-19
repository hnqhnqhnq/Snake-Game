const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const scoreOver = document.querySelector("#scoreOver");
const highOver = document.querySelector("#highOver");
const resetButton = document.querySelector("#resetButton");
const startButton = document.querySelector("#startButton");
const gameOverButton = document.querySelector("#gameOverButton");
const startGameDiv = document.querySelector("#startGame");
const gameOverDiv = document.querySelector("#gameOver");
const game = document.querySelector("#gameContainer");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const foodColor = "red";
const foodBorder = "black";
const snakeColor = "green";
const snakeBorder = "lightgreen";
const boardBackground = "lightcoral"
let foodX;
let foodY;
let score = 0;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let highScore = 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize*1, y:0},
    {x:0, y:0}
];

startButton.addEventListener("click",(e)=>{
    game.style.display = "block";
    startGameDiv.style.display = "none";
    gameStart();
});

gameOverButton.addEventListener("click",(e)=>{
    game.style.display = "block";
    gameOverDiv.style.display = "none";
    gameStart();
});

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

function gameStart(){
    if(!running){
        running = true;
        scoreText.textContent = score;
        createFood();
        drawFood();
        nextTick();
    }
}

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75);
    }
    else displayGameOver();
}

function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};


function createFood(){
    function randNum(min, max){
        const randNumber = Math.round((Math.random()*(max - min) + min) / unitSize) * unitSize;

        return randNumber;
    }

    foodX = randNum(0, gameWidth-unitSize);
    foodY = randNum(0, gameWidth-unitSize);
}

function drawFood(){
    context.fillStyle = foodColor;
    context.strokeStyle = foodBorder;
    context.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){
    const head = {x: snake[0].x + xVelocity, 
                y: snake[0].y + yVelocity};

    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    } 
    else{
        snake.pop();
    }

}

function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;

    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}


function changeDirection(event){
    let keyPressed = event.keyCode;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    
    switch(keyPressed){
        case LEFT:
            if(xVelocity != unitSize && yVelocity != 0){
                xVelocity = -unitSize;
                yVelocity = 0;
            }

            break;

        case UP:
            if(xVelocity != 0 && yVelocity != unitSize){
                xVelocity = 0;
                yVelocity = -unitSize;
            }
            
            break;

        case RIGHT:
            if(xVelocity != -unitSize && yVelocity != 0){
                xVelocity = unitSize;
                yVelocity = 0;
            }
            
            break;
        
        case DOWN:
            if(xVelocity != 0 && yVelocity != -unitSize){
                xVelocity = 0;
                yVelocity = unitSize;
            }
            
            break;
    }
}

function checkGameOver(){
    if(snake[0].x <= 0 - unitSize || snake[0].x >= gameWidth){
        running = false;
        setHighScore();
    }
        

    if(snake[0].y <= 0 - unitSize || snake[0].y >= gameHeight){
        running = false;
        setHighScore();
    }
        

    for(let i = 1; i<snake.length; i++)
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
            setHighScore();
        }
}

function displayGameOver(){
    game.style.display = "none";
    gameOverDiv.style.display = "block";
    scoreOver.textContent = "Score: " + score;
    highOver.textContent = "Highscore: " + highScore;

    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize*1, y:0},
        {x:0, y:0}
    ];

    clearBoard(); 
}


function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize*1, y:0},
        {x:0, y:0}
    ];

    gameStart(); 
}

function setHighScore(){
    if(score > highScore){
        highScore = score;
        window.alert("New Highscore! " + highScore);
    }
    
}
