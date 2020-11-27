//declaring variables for monkey, food, obstacles and ground sprites
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground1,ground2;
// declaring gameStates. 
var gameState, PLAY = 1, END = 0;

function preload(){
  
  // adding animation for the monkey. 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,800);
  // pre declaring the gameState as PLAY.
  gameState = PLAY;
  
  // creating monkey, ground 1 and ground 2 sprites.
  monkey = createSprite(150,350,15,15);
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.scale = 0.15;

  ground1 = createSprite(300,399,800,10);
  ground1.velocityX = -10;

  
  ground2 = createSprite(900,399,800,10);
  ground2.velocityX = -10;
  
  // declaring new obstacles and food groups. 
  obstacleGroup = new Group();  
  FoodGroup = new Group();
  

  
} 


function draw() {
  
  background("white");
    
  
  monkey.x = 150;
// differenciating two grounds with different colors.
  ground1.shapeColor = "green";
  ground2.shapeColor = "darkgreen";
  // command to print scores on the screen.
   text("Score: "+score,300,50);
  text("Survival Time: "+ Math.round(getFrameRate()), 400,50 );
    monkey.velocityY = monkey.velocityY + 2;

  //PLAY gameState block.
if(gameState === PLAY){
  
  ground1.velocityX = -10;
  ground2.velocityX = -10;

  
 // Monkey needs to be on the ground.
  monkey.collide(ground1);
  monkey.collide(ground2);
  // command to get back theground at the end of the line,
  // ground 1 behind ground 2 once it disappears and vice versa. 
  if(ground1.x < -400 ){
    ground1.x = ground2.x+800;
  }
  if(ground2.x < -400){
    ground2.x = ground1.x+800;
  }
  
  // jump block
  // allowing to jump with up arrow too.
  if(keyWentDown("space") || keyWentDown(UP_ARROW)){
    monkey.velocityY = -30;
  }
  
  // displaying food and obstacles block
  if(frameCount%300 === 0){
    banana = createSprite(800,Math.round(random(100,300)),10,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 80;
    FoodGroup.add(banana);
    
  }
  if(frameCount%300 === 0){
    obstacle = createSprite(800,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -10;
    obstacle.scale = 0.23;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 80;
    obstacle.setCollider("circle",0,0,150);
  }
  
  // when a point is earned.
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
  }
  // when the monkey touches an obstacle
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    ground1.velocityX = 0; 
    ground2.velocityX = 0;
    monkey.collide(ground1);
    monkey.collide(ground2);
    monkey.velocityY = monkey.velocityY + 2;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
    
  }
  
}
  // END gameState block
  if(gameState === END){
    monkey.collide(ground1);
    monkey.collide(ground2);
    obstacle.velocityX = 0;
    obstacle.y = 350;
    banana.velocityY =0;
    text("Game Over",400,200);
    text("Press Space to Restart",400,250);
    if(keyDown("space")){
      gameState = PLAY;
      score = 0;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
    }
    
  }
  
  
  drawSprites();
}

 




