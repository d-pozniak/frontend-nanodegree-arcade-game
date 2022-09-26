const xStep = 101,
      yStep = 83,
      yShift = 20,
      numCol = 5,
      fieldWidth = numCol*xStep;
const cellCenterY = (colNo = numCol, num = yStep, shift = yShift) => colNo*num - shift;
const setCoordByCellNum = (cellNum = -1, cellWidth = xStep) => cellNum*cellWidth;

// Enemies our player must avoid
const Enemy = function(xCoord = setCoordByCellNum(), yCoord = cellCenterY(1), minSpeed = 100, maxSpeed = 700) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xCoord;
    this.y = yCoord;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed);
};
Enemy.prototype.update = function(dt) {
    this.collidedWith(player);
    if(this.x < fieldWidth){
        this.x += this.speed*dt;
    } else this.restart();
};
Enemy.prototype.restart = function() {
    this.speed = Math.floor(Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
    this.x = setCoordByCellNum();
};
Enemy.prototype.collidedWith = function(player){
    if (this.x > (player.x - xStep/3) &&
        this.x < (player.x + xStep/3) &&
        this.y === player.y) {
        player.restart();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = setCoordByCellNum(Math.floor(numCol/2));
    this.y = cellCenterY();
};
Player.prototype.update = function() {
    if (this.y < yShift) this.restart();
};
Player.prototype.restart = function (){
    this.x = setCoordByCellNum(Math.floor(numCol/2));
    this.y = cellCenterY();
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction) {
        switch (direction) {
            case 'left':
                if (this.x>0 ) this.x -= xStep;
                break;
            case 'up':
                if (this.y>yShift) this.y -= yStep;
                break;
            case 'right':
                if (this.x < fieldWidth - xStep) this.x += xStep;
                break;
            case 'down':
                if (this.y < cellCenterY()) this.y += yStep;
                break;
            default:
                this.x += 0;
                this.y += 0;
        }
};

const allEnemies = [new Enemy(setCoordByCellNum(), cellCenterY(1)),
                    new Enemy(setCoordByCellNum(), cellCenterY(2)),
                    new Enemy(setCoordByCellNum(), cellCenterY(3))
                    ];
const player = new Player();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
