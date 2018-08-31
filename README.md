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
´´´javascript
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

- splashScreen
splash(2
- removeGameOver (if there is one)
- build splash DOM ()
- addEventListenners()
)


- gameScreen
startGame( 1
-remove splash
- remove GameOver (if there is one)
- build game DOM ()
- create new Game()
- gameStart()  
)


- gameoverScreen
GameOver(
- game destroy
- build GameOver DOM ()
- addEventListenner(1 && 2)
)


## Task

1. Create screen transitions to go from Splash to Game, from game to game over and from Game Over to Splash or Game. With buttons and TimeOut. Test.

2. Create canvas. Test.

3. Write Player constructor with attributes and methods. Test.

4. Write Player not out the canvas.

5. Write Enemy constructor with attributes and methods. Test. 

6. Make ONE Enemy move to Player position.

7. Write collision Enemy and Player. Loose lives. 



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