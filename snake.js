const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 400;

const ctx = canvas.getContext('2d');
document.body.style.background = '#779';
document.addEventListener('keydown', keyPush);

const point = document.getElementById('score');

const size = 20;

let snake, food, score, direction;

function start() {
    snake = [
        { x: 2*size, y: 4*size },
        { x: 3*size, y: 4*size },
        { x: 4*size, y: 4*size }
    ];
    
    generateFood();

    score = 0;
    point.innerHTML = score; 
    direction = 'null';
}

function draw() {
    //BACKGROUND
    for (let i = 0; i < canvas.width; i+=size) {
        for (let j = 0; j <canvas.height; j+= size) {
            ctx.fillStyle = '#22a';
            ctx.fillRect(i, j, size, size);
            ctx.strokeStyle = '#eef';
            ctx.strokeRect(i, j, size, size);
        }
    }

    //SNAKE
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#272';
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
        ctx.strokeStyle = '#151';
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
    }

    //FOOD
    ctx.fillStyle = '#a22';
    ctx.fillRect(food.x, food.y, size, size);

    control();
    finish();
    eatFood();
}

function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            if (direction!== 'RIGHT') {
                direction = 'LEFT';
            }
            break;
        case 38:
            if (direction!== 'DOWN') {
                direction = 'UP';
            }
            break;
        case 39:
            if (direction!== 'LEFT') {
                direction = 'RIGHT';
            }
            break;
        case 40:
            if (direction!== 'UP') {
                direction = 'DOWN';
            }
            break;
        default:
            direction = 'PAUSE';
    }
}

function control() {
    switch(direction) {
        case 'LEFT':
            snake.pop();
            snake.unshift({
                x: (snake[0].x/size - 1)*size,
                y: snake[0].y
            });
            break;
        case 'UP':
            snake.pop();
            snake.unshift({
                x: snake[0].x,
                y: (snake[0].y/size - 1)*size,
            });
            break;
        case 'RIGHT':
            snake.pop();
            snake.unshift({
                x: (snake[0].x/size + 1)*size,
                y: snake[0].y
            });
            break;
        case 'DOWN':
            snake.pop();
            snake.unshift({
                x: snake[0].x,
                y: (snake[0].y/size + 1)*size,
            });
            break;
    }
}

function eatFood() {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            score++;
            if (score < (canvas.width/size) * (canvas.height/size) - 3) {
                generateFood();
            }
            let lastTail = {
                x: snake[snake.length-1].x,
                y: snake[snake.length-1].y
            };
            snake.push(lastTail);
            point.innerHTML = score;
        }
    }
}

function generateFood() {
    let foodX, foodY, valid;

    do {
        valid = true
        foodX = Math.floor(Math.random() * canvas.width/size) * size;
        foodY = Math.floor(Math.random() * canvas.height/size) * size;
        for (let square of snake) {
            if (square.x === foodX && square.y === foodY) {
                valid = false;
            }
        }
    } while(!valid);
    food = {
        x: foodX,
        y: foodY
    };
}

function finish() {
    if (score === ((canvas.width/size)*(canvas.height/size)) - 3) {
        direction = 'null';
        alert('Has ganado!!');
        start();
    }
    if (snake[0].x >= canvas.width || snake[0].x < 0 || snake[0].y >= canvas.height || snake[0].y < 0) {
        start();
    }
}

start();

setInterval(draw, 1000/10);
