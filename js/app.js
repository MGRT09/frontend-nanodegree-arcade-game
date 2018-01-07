//Box for collision testing - found in udacity forum - really handy!
//function drawBox(x, y, width, height, color) {
//    ctx.beginPath();
//    ctx.rect(x, y, width, height);
//    ctx.lineWidth = 2;
//    ctx.strokeStyle = color;
//    ctx.stroke();
//}


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    //this.width = 101;
    //this.height = 171;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Once the bug has passed a certain point, then redraw on other side of screen - simulate roatation
    if (this.x > 500){
        this.x = -100;
        //Can we change speed too?
        //(Math.random() * 1000);
        //debugger;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   //drawBox(this.x, this.y + 77, 100, 67, "yellow");
};


//function to check collisons - using 
function checkCollisions() {
    allEnemies.forEach(function (enemy) {
        if (enemy.x < player.x + 80 &&
            enemy.x + 80 > player.x &&
            enemy.y < player.y + 60 &&
            enemy.y + 60 > player.y) {
            player.score = player.score - 1;
            player.start();
          //console.log("COLLISION!!!" + "enemyX is " + enemy.x + "enemyY is " + enemy.y);
            //console.log("Player x and y are" + player.x + "- " + player.y);
            //player.status = false;
        }  // end if
    })
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//Player Class - Standard elements - image, x and y, number of lives, score and a restart to position function. 
var Player = function (x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.lives = 3;
    this.score = 0;
    this.start();
}


//Place player back on the bottom row
Player.prototype.start = function () {
    this.x = 150;
    this.y = 390;
    //Can I make this random within a certain area?
};
//Allows player to move - include catch for when player successfully get to water line.
Player.prototype.update = function (dt) {
    //this.start();
    this.x * (dt);
    this.y * (dt);
  
    
    if (this.y === -10){
        this.start();
        console.log("made it")
        this.score = this.score + 10;
        console.log("Score " + this.score);
    }
    
}




Player.prototype.handleInput = function (keyStroke) {
    switch (keyStroke) {
        case "left":
            //console.log(this.sprite);
            if (this.x > 0){
            this.x = this.x - 50;
            //console.log(this.x)
            }
            break;
        case "right":
            if (this.x < 400){
            this.x += 50;
            //console.log(this.x)
            }
            break;
        case "up":
            if (this.y > -10){
            this.y -= 50;
            //console.log(this.y)
            }
            break;
        case "down":
            if (this.y < 440) {
            this.y += 50;
            //console.log(this.y)
            }
            break;
        case "pause":
            gameState = 'pause';
            console.log("Pressed Pause")
            break;
        case "restart":
            gameState = 'run';
            break;
    }
};

Player.prototype.render = function() {
  
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   // drawBox(this.x + 10, this.y + 61, 85, 80, "blue");
};


var enemy1 = new Enemy(-100, 60, (Math.random() * 100));
var enemy2 = new Enemy(-100, 145, (Math.random() * 200));
var enemy3 = new Enemy(-100, 225, (Math.random() * 150));



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];




// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'restart',
        80: 'pause'
    };
 //console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
    //debugger;
});
