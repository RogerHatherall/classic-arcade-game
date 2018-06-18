/* Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100 * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/

class Enemy {
  constructor (x, y, name, speed) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update (dt) {
    let gap = Math.floor(Math.random() * 3 + 1) * 100;
    let newSpeed = Math.floor(Math.random() * 3 + 1) * 100;
    //console.log('dt= ' + this.dt + ' gap ' + gap);
    this.x += this.speed * dt;  
    if (this.x > 500) {
      this.x = gap * -1;
      this.speed = newSpeed;
    }
    //console.log('enemies ' + allEnemies);
    //console.log('name ' + this.name + ' enemy name ' + enemy.name);
    //console.log('this x ' + this.x + ' this y ' + this.y);
    // Each time an emeny is updated check the position of the others
    allEnemies.forEach(enemy => {
        //If the enemy is not me...
        if (this.name != enemy.name) {
            //and we're both on the same track...
          //console.log('name ' + this.name + ' enemy name ' + enemy.name);
          if (this.y === enemy.y ) {
            //console.log(' this y ' + this.y + ' enemy y ' + enemy.y);
            //and the other enemy is in front and within 100px...
            if ((this.x > -100 && enemy.x > -100) && (enemy.x > this.x) && (enemy.x - this.x < 100)) {
                //console.log('name ' + this.name + ' enemy name ' + enemy.name);   
                //console.log('this x ' + this.x +' enemy x ' + enemy.x);
                //then drop back and match its speed to avoid a collision...
                this.x = enemy.x - 100;
                this.speed = enemy.speed;
            }
          }    
        }    
    });
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }
  update () {
    //Check for collision with player

    for (let i = 0; i < allEnemies.length; i++) {
        if (this.y === allEnemies[i].y && this.x >= allEnemies[i].x - 50 && this.x <= allEnemies[i].x + 50) {
            console.log(' this x ' + this.x + ' enemy x ' + allEnemies[i].x + ' this y ' + this.y + ' enemy y ' + allEnemies[i].y);
          this.x = 200;
          this.y = 400;
          break;
        }    
      };
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
  }
  handleInput (arrowKey) {
    //console.log('x= '+ this.x + ' y= ' + this.y);
    switch (arrowKey) {
      case 'left':
        if (this.x > 0) {
            this.x -= 100;
        }
        break;
      case 'up':
        if (this.y > 0) {
            this.y -= 85;
            }
            break;
      case 'right':
        if (this.x < 400) {
            this.x += 100;
        }
            break;
      case 'down':
        if (this.y < 400) {
            this.y += 85;
        }
            break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemy1 = new Enemy(-100, 230, 'enemy1', 100);
const enemy2 = new Enemy(-200, 145, 'enemy2', 100);
const enemy3 = new Enemy(-300, 60, 'enemy3', 100);
const enemy4 = new Enemy(-200, 230, 'enemy4', 100);
const enemy5 = new Enemy(-300, 145, 'enemy5', 100);
const enemy6 = new Enemy(-400, 60, 'enemy6', 100);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);
const player = new Player (200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
