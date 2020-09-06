var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ObstaclesGroup,CloudsGroup;
var gamestate="play";
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png")
 cloudImage = loadAnimation("cloud.png");
obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,80,40,10);
    cloud.y=random(0,100);
    cloud.addAnimation("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 204;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
  
    var rand = Math.round(random(1,6));
  console.log(rand);
    switch (rand){
         
    case 1 : 
      obstacle.addImage(obstacle1Image);
      break;
        case 2 : 
      obstacle.addImage(obstacle2Image);
      break;
      case 3 : 
      obstacle.addImage(obstacle3Image);
      break;
      case 4 : 
      obstacle.addImage(obstacle4Image);
      break;
      case 5 : 
      obstacle.addImage(obstacle5Image);
      break;
      case 6 : 
      obstacle.addImage(obstacle6Image);
      break;
  }
   
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
 obstacle.shapeColor="red";
ObstaclesGroup.add(obstacle);
  }
}
function draw() {
  background(125);
  if(gamestate==="play"){
    spawnObstacles();
     spawnClouds();
   
    ground.velocityX=-6;
 
      
  }
  if(keyWentDown("r")&&(gamestate==="out")){
  gamestate="play";
  ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
     }
  if(keyDown("space")&&(trex.y>150)) {
    trex.velocityY = -14;
  }
 
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
   
    ground.x = ground.width/2;
  }
  ground.velocityX=-6;
  
  if (gamestate==="out"){
    ObstaclesGroup.setVelocityXEach(0);
 ObstaclesGroup.setLifetimeEach(-1);
    ground.velocityX=0;
 
      CloudsGroup.setVelocityXEach(0);   
       CloudsGroup.setLifetimeEach(-1);
  }
  
  trex.collide(invisibleGround);
  drawSprites();
  if(trex.isTouching(ObstaclesGroup)){
   gamestate="out"
  trex.changeAnimation("collided",trex_collided);
 
  }
}