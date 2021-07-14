var PLAY=1;
var END=0;
var gameState=PLAY;
var tower,t;
var boy,b;
var ing;
var apple,banana,grapes;
var stone;
var score=0;
var restart,rs;

function preload(){
  
  forest=loadImage("for.png");
 boy=loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png");
  
  apple=loadImage("coin1.png");
  grapes=loadImage("coin2.png");
  banana=loadImage("coin3.png");
  stone=loadImage("stone.png");
  
 restart=loadImage("res.png");
  
}
function setup() {
  createCanvas(300, 200);
  
  b=createSprite(50,180,10,10);
  b.addAnimation("boy",boy);
  b.scale=0.25;
  //g.velocityX=3;
  
   
  f=createSprite(200,100,10,10);
  f.addImage("f",forest);
  f.scale=1.5;
  f.velocityX=-3;
  f.x = f.width /2;
  
  ing=createSprite(10,180,800,10);
  
  f.depth=b.depth;
 // b.depth=text.depth;
  b.depth=b.depth+1;
  //text.depth=text.depth+1;
  
  stoneGroup=new Group();
  fruitGroup=new Group();
  
  score=0;
  
  rs= createSprite(150,100);
  rs.addImage(restart);
  rs.scale = 0.1;
  rs.visible = false;
}

function draw() {
   background("pink");
  textSize(20);
  fill("green");
  text("Score: "+ score,200,20);
if(gameState===PLAY){
  
  rs.visible=false;
  
if(keyDown("space")&&b.y>=100){
  b.velocityY=-12;
}
  b.velocityY=b.velocityY+0.8;
  
if (f.x <100){
      f.x = f.width/2;
    }
  
   b.collide(ing);
  
   fruit();
  obstacle();
  
if(fruitGroup.isTouching(b)){
  score=score+1;
  fruitGroup.destroyEach();
}
  if(stoneGroup.isTouching(b)){
    gameState=END;
  }
}
else if(gameState===END){
   rs.visible=true;
   f.velocityX = 0;
   b.velocityY = 0;
   stoneGroup.setVelocityXEach(0);
   fruitGroup.setVelocityXEach(0);
   stoneGroup.setLifetimeEach(-1);
   fruitGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(rs)) {
      reset();
    }
  }
 drawSprites();
}

function fruit(){
  if(frameCount%150===0){
    var fruit=createSprite(350,100,10,10);
     fruit.velocityX=-3;
     fruit.y=Math.round(random(50,100));
 var rand=Math.round(random(1,3));
    switch(rand){
      case 1:fruit.addImage(banana);
              break;
      case 2:fruit.addImage(grapes);
              break;
      case 3:fruit.addImage(apple);
              break;
    }
    fruit.setLifetime=150;
    fruit.scale=0.15;
    fruitGroup.add(fruit);
  }
}
function obstacle(){
  if(frameCount%300===0){
    var s=createSprite(300,150,10,10);
    s.addImage(stone);
    s.scale=0.15;
    s.velocityX=-3;
     stoneGroup.add(s);
  }
}
function reset(){
  gameState = PLAY;
  stoneGroup.destroyEach();
  fruitGroup.destroyEach();
  score=0;
  f.velocityX=-3;
  f.x = f.width /2;
  rs.visible=false;
}