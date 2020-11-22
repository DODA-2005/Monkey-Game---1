
var monkey , monkey_running
var bananaImage, obstacleImage
var bananasGroup, obstacleGroup
var score
var ground, iGround
var obstacle, banana

function preload(){
  
  
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  //creating monkey;
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  //creating ground;
  ground=createSprite(300,350,900,10);
  
  ground.x=ground.width/2;
  console.log(monkey.x)
  
  iGround=createSprite(300,350,5000,5);
  
  if (iGround.x < 0){
      iGround.x = iGround.width/2;
    }
  
  
  //creating survival time;
  var survivalTime=0;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  //create Obstacle and Cloud Groups
  bananasGroup = createGroup();
  obsGroup = createGroup();
  
  score=0;
}


function draw() {
  background("white");
  
  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //spawn the clouds
  sBananas();
  
  //spawn obstacles on the ground
  sObstacles();
  
  stroke=("green");
  textSize(20);
  fill("green");
  text("score = "+score,140,80 )
  
  stroke=("black")
  textSize(20);
  fill("orange");
  survivalTime=Math.ceil(frameCount/3.5);
  text("survival Time = "+survivalTime,100,50);
  
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
    }
  
  monkey.collide(ground);
  monkey.collide(iGround);
    
  
  
  
  //making 
  function sObstacles(){
   if (frameCount % 165 === 0){
     obstacle = createSprite(400,330,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -(3 + 3* survivalTime/100)
     obstacle.scale=0.1
     obsGroup.add(obstacle);
   }
  }
  
  function sBananas() {
  if (World.frameCount % 120 == 0) {
    banana =         createSprite(400,Math.round(random(300, 190)), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -(4 + 3* survivalTime/100)
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananasGroup.add(banana);
  }}
  
  
if(monkey.isTouching(bananasGroup)){
    score=score+1;
    bananasGroup.destroyEach();
  }
  
  if(monkey.isTouching(obsGroup)){
    score=score-1;
    obstacle.destroy();
  }
  
    
  drawSprites();

}