const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let dx = 20, dy = 0;
let food = generateFood();
let score = 0;

function gameLoop() {
  if (checkCollision()) return;
  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    gameLoop();
  }, 100);
}

function clearCanvas() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && dx === 0) { dx = -20; dy = 0; }
  if (key === 38 && dy === 0) { dx = 0; dy = -20; }
  if (key === 39 && dx === 0) { dx = 20; dy = 0; }
  if (key === 40 && dy === 0) { dx = 0; dy = 20; }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);
}

function generateFood() {
  const x = Math.floor(Math.random() * 20) * 20;
  const y = Math.floor(Math.random() * 20) * 20;
  return { x, y };
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x >= canvas.width;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y >= canvas.height;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

document.addEventListener("keydown", changeDirection);
gameLoop();
