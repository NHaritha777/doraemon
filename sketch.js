//global variables
var monkey , monkey_running,monkey_end;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score,survivalTime;
var ground,groundImg,bground,bgroundImg;
var gameState;
var END=0;
var PLAY=1;


function preload(){
  
  //loading animation and images
  monkey_running = loadAnimation( "doraeat.png")
  
  bananaImage = loadImage("doracake.png");
  obstacleImage = loadImage("obstacle.png");
  bgroundImg=loadImage("heidibg2.jpeg");
  monkeyimg=loadAnimation("dora.png");
}


function setup() {
 createCanvas(500,500); 

  //creating background
  bground=createSprite(300,290);
bground.addImage("moving",bgroundImg);
bground.scale=1.2;
bground.velocityX=-4;
  
  score=0;
survivalTime=1;
  
  //monkey
  monkey=createSprite(80,425,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.2;
  
  ground=createSprite(500,480,1000,10);
ground.velocityX=-4;
ground.visible=false;


   bananaGroup= new Group();
obstacleGroup= new Group();
  
  PLAY=1;
  END=0;
  gameState=1;
  
}


function draw() {
background("darkGreen");
  
  textSize(20);
text("Score: "+score,50,18);
//text("Survival Time: " +survivalTime,200,18);
text("Press up arrow key to jump", 180,18);

  //adding gravity
monkey.velocityY=monkey.velocityY+1;
monkey.collide(ground);
  
  //invisible ground
  if (ground.x<0){
ground.velocityX=-4;
ground.x=ground.width/2;
  }
 
  //background
  if (bground.x<300){
bground.velocityX=-4;
bground.x=bground.width/2;
  }

  //gamestate play
  if(gameState===PLAY){
   
  Banana();
Obstacle();
  
    //calculating survival time
  survivalTime= Math.ceil(frameCount/frameRate()); 
    
    //scoring
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score= score+5;
  }
    
    //monkey jumps when space key is pressed
  if (keyDown("UP_ARROW") && monkey.y>=100 ){
    monkey.velocityY=-10;
  }
    
    if (obstacleGroup.isTouching(monkey)){
      gameState=END;
      bground.velocityX=0;
      monkey.addAnimation("moving",monkeyimg);
    }
    
      } else if(gameState===END){
 
        //gamestate end
        
  obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
    
  obstacleGroup.destroyEach();
bananaGroup.destroyEach();
        
  }
  
  //adding depth
  monkey.depth=monkey.depth+1;
  Obstacle.depth=Obstacle.depth;
  
  Score();
  
drawSprites();  
}

function Banana(){
  
  if(frameCount % 80 ===0){
var banana= createSprite(200,300,5,5);    
banana.y= Math.round(random(150,300));
banana.addImage(bananaImage);
banana.lifetime=110;
banana.velocityX=-6;
banana.scale=0.1;
    
bananaGroup.add(banana);   
  } 
}

function Obstacle(){
  
  if(frameCount % 100 ===0){
var obstacle =createSprite(400,420,5,5);    
obstacle.x=Math.round(random(0,1000));
obstacle.addImage(obstacleImage);
obstacle.lifetime=90;    
obstacle.velocityX=-4;    
obstacle.scale=0.2;    
    
obstacleGroup.add(obstacle);   
  }
}

function Score(){
  
  switch (score){
  
  case 30: monkey.scale=0.14;
          break;
  case 60: monkey.scale=0.16; 
          break;
  case 90: monkey.scale=0.18;  
          break;
  case 120: monkey.scale=0.20; 
          break;
   default : break;
    
  }    
}