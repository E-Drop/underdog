# underdog

## Description
Game based on one hunter going around different maps with "zombies" trying to catch him. Both the hunter and the enemies can shoot. The hunter will go through different levels were there will be more enemies. 


## MVP (DOM - CANVAS)

CANVAS
One ball moving around all the screen and smaller balls trying to get to the big one. You lose if they catch you. 


## Backlog
### Path finding
- The enemies follow your path.

### Shooting
- The player and the enemies are able to shoot and take lives or be destroyed.

### Levels
- Once the player has killed all the enemies goes to the next level. 

### Music
- Add adventure music.

### Images
- Add images to the background player and enemies.

### Map and obstacles
- Build different maps with different obstacles.


## Data structure
### Game
```javascript
function Game(
 self.gameIsOver = false;
 self.gameIsPause = false;
 self.score = 0;
 self.username = input;
 self.ctx:
)

Game.start()
Game.startLoop(
 function loop (if !gameOver && !gamePaused)
   update ()
   clearCanvas()
   draw ()
)

Game.checkIfEnemiesCollidePlayer()
Game.onOver()
Game.gameOver()
Game.destroy()
```

### Player

```javascript
function Player ((canvas, lives,)
 self.x;
 self.y;
 self.direction;
 self.size;
 self.canvas;
 self.ctx;
 self.lives;
)
Player.setDirection()
Player.checkcollision()
Player.collied(--lives)
Player.update()
Player.draw()

```

### Enemy

```javascript
function Enemy (Player, canvas, x, y, speed)
 self.x;
 self.y;
 self.direction;
 self.size;
 self.canvas;
 self.ctx;
)
Enemy.setDirection(Player)
Enemy.checkcollision()
Enemy.update()
Enemy.draw()

```


## States y States Transitions
Definition of the different states and their transition (transition functions)

### Splash
- splashScreen
splash( 2
- removeGameOver (if there is one)
- build splash DOM ()
- addEventListenners()
)

### Game
- gameScreen
startGame( 1
-remove splash
- remove GameOver (if there is one)
- build game DOM ()
- create new Game()
- gameStart()  
)

### Game Over
- gameoverScreen
GameOver(
- game destroy
- build GameOver DOM ()
- addEventListenner(1 && 2)
)


## Task

### 1.States and transitions

#### 1.1 Write states
- Creat main.js
- Write build DOM function
- Write main function
- Call main function when load page
- Build splash DOM
- Write buttons for the splash
- write build gameOver
- Build gameOver DOM
- Creat game.js 
- Build Game DOM
- Create canvas with width and height of the parent


#### 1.2 Write transitions
- Write startGame in main
- Write destroy splash
- Write destroy game
- Write destroy gameOver
- Write destroy main


### Game
- Write the loop
- Start loop 
- Create new Player
- Add event listeners
- Inside the loop update and draw


### Player
- Write Player constructor with attributes.
- Write update and draw methods.
- Write method set direction with eventListenner 


### Enemy
- Write Enemy constructor with attributes.
- Write update and draw methods.  
- Write check if in screen ??
- Make ONE Enemy move to Player position.


### Collision 
- Write Player not out the canvas in the Player.update.


### Enemy direction
- Write method enemy goes were player is


### Collision 
- Write Player not out the canvas in the Player.update.
- Write collision Enemy and Player. Loose lives.


### Lives and score
- Update lives and score. 


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
https://github.com/axelgar/underdog
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)