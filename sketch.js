var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var bananaImage,obstacle1Image, obstacle2Image, obstacle3Image;
var FoodGroup, obstacleGroup;
var score;
var gameOverImage,restartImage;

function preload(){
  
  
monkey_running = loadAnimation ("sprite_0.png", "sprite_1.png","sprite_2.png","sprite_3.png", "sprite_4.png","sprite_5.png","sprite_6.png", "sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacle1Image = loadImage("obstacle.png");
  obstacle2Image = loadImage("spines.png");
  obstacle3Image = loadImage("enemy.jpg");
  
  restartImage = loadImage("1.png")
  gameOverImage = loadImage("10.jpg")
 
}



function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
  
  edges = createEdgeSprites();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,160);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  obstaclesGroup = createGroup();
  banannaGroup = createGroup();
  
  score = 0;
}


function draw() {
background("white");
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8

    spawnObstacles();
    spawnbanannas();
    
    if(banannaGroup.isTouching(monkey)){
         banannaGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      monkey.velocityY = 0
    
    obstaclesGroup.setLifetimeEach(-1);
    banannaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     banannaGroup.setVelocityXEach(0);
   if(mousePressedOver(restart)) {
      reset();
    }
   }
  
  
  
monkey.collide(edges[3]);
drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score=0;
  obstaclesGroup.destroyEach();
  banannaGroup.destroyEach();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              obstacle.scale = 0.1;
              break;
      case 2: obstacle.addImage(obstacle2Image);
              obstacle.scale = 0.2;
              break;
      case 3: obstacle.addImage(obstacle3Image);
               obstacle.scale = 0.3;
              break;
      default: break;
    }
   
    
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanannas(){
 if (frameCount % 80 === 0){
   
   var bananna = createSprite(600,100,10,40);
   bananna.velocityX = -(6 + score/100);
   bananna.addImage(bananaImage);
   
   bananna.scale = 0.13;
   
   bananna.lifetime = 300;
   banannaGroup.add(bananna);
 }
}