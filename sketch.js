//var
var monkey , monkey_running;
var banana ,bananaImage, obstacles, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;




function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(400,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(80, 315, 900, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  //score
  score = 0;
  survivalTime = 0;
  
}


function draw() {
  
//background
  background ("lightgreen");
  
//score
  stroke("darkgreen");
  textSize(20);
  fill("darkgreen");
  text("Score:"+  score, 300, 50);
  
//survival time
  stroke("darkgreen");
  textSize(20);
  fill("darkgreen");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
//monkey+ground=collide
  monkey.collide(ground);
  
  
  
//play state
  if(gameState === PLAY){
  
//monkey
    monkey.changeAnimation("running", monkey_running);
    monkey.velocityY = monkey.velocityY + 0.8; 
    
    
//monkey move
    if(keyDown("space")) {
        monkey.velocityY = -10;
    }    

//ground position
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
//monkey score
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  
 //obstacles 
    obstacleGroup.setLifetimeEach(-1);
  
  //functions
  food();
  obstacles();
    
    
      
    
    
//end game
  if(obstacleGroup.isTouching(monkey)){
        
      gameState = END;
      
    }
    
}
  //END
   if (gameState === END) {

//group over
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
//end of survival time  
    survivalTime.visible = false;
     

//game over
    stroke("darkgreen");
    textSize(30);
    fill("darkgreen");
    text("Game Over!", 110, 200);
     
    stroke("darkgreen");
      textSize(30);
     fill("darkgreen");
     text("Game Over!", 110, 200);
   }
 
  
  //draw Sprites
  drawSprites();
}

//food(banana) function
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,400,40,40);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//obstacles function
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,315,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1 ;
    
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }

}


