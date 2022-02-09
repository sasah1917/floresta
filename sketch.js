/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var floresta, florestaImg, invisibleGround;

var shrub1, shrub2,shrub3, shrubsGroup;

var menino, meninoImg;

var score=0;

var gameOver, restart;

function preload(){
  meninoImg = loadImage("menino.png");
  florestaImg = loadImage("floresta.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  gameOverImg = loadImage("assets/fimdejogo.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  
}

function setup() {
  createCanvas(800, 400);

  floresta = createSprite(400,100,400,20);
  floresta.addImage(florestaImg);
  floresta.scale=0.3
  //jungle.x = width /2;

  menino = createSprite(50,200,20,50);
  menino.addImage(meninoImg);
  menino.scale = 0.15;
  menino.setCollider("circle",0,0,300)
    
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  shrubsGroup = new Group();
  
  
  score = 0;

}

function draw() {
  background(255);
  
  
   
  if (gameState===PLAY){

  
    if(keyDown("space")&& menino.y>270) {
      jumpSound.play();
      menino.velocityY = -16;
    }
  
    //menino.velocityY = menino.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    menino.collide(invisibleGround);
    
   
    if(shrubsGroup.isTouching(kangaroo)){
      score = score + 1;
      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x = 200;
    restart.x = 300
    gameOver.visible = true;
    restart.visible = true;
    menino.velocityY = 0;
    
    shrubsGroup.setVelocityXEach(0);


    shrubsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  else if (gameState === WIN) {
    
    menino.velocityY = 0;
    shrubsGroup.setVelocityXEach(0);
    shrubsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score,50);
  
  if(score >= 5){
    menino.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Parabéns!! Você venceu o jogo!! ", 70,200);
    gameState = WIN;
  }
}

function spawnShrubs() {
 
  if (frameCount % 150 === 0) {

    var shrub = createSprite(500,330,40,10);

    //shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
       
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  menino.visible = true;
  shrubsGroup.destroyEach();
  score = 0;
}

