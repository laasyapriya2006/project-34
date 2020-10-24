//Create variables here
var dog;
var dogImg,happyDogImg;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("image/dogImg.png");
  happyDogImg = loadImage("image/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog = addImage(dogImg);

  database = firebase.databse();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  //add styles here
  noStroke();
  textSize(35);
  fill("white");
  text("Food remaining"+foodStock,100,450);

  textSize(10);
  fill("white");
  text("Note: Press UP_ARROW Key to Feed Jackie treats!!!!");

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food: x
  })
}


