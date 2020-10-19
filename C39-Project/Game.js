class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,370);
    //player1.setCollider("rectangle", 0, 0)
    //player1.debug = true;
    player1.velocityY = 2;
    player1.addImage("player1",player1_img);
    player1.scale = 0.1;
    player2 = createSprite(100,640);
    //player2.setCollider("rectangle", 0, 0)
    //player2.debug = true;
    player2.velocityY = 2;
    player2.addImage("player2",player2_img);
    player2.scale = 0.1;
   /* player3 = createSprite(500,550);
    player3.setCollider("rectangle", 0, 0)
    player3.debug = true;
    player3.velocityY = 2;
    player3.addImage("player3",player3_img);
    player3.scale = 0.15;
    player4 = createSprite(700,550);
    player4.setCollider("rectangle", 0, 0)
    player4.debug = true;
    player4.velocityY = 2;
    player4.addImage("player4",player4_img);
    player4.scale = 0.15;*/
    plays = [player1, player2];

        invisibleGround1 = createSprite(100, 400, displayWidth * 5, 20);
        //invisibleGround1.setCollider("rectangle", 0, 0);
        //invisibleGround1.debug = true;
        invisibleGround1.visible = false;
        invisibleGround2 = createSprite(100, 640, displayWidth * 5, 20);
        //invisibleGround2.setCollider("rectangle", 0, 0);
        //invisibleGround2.debug = true;
        invisibleGround2.visible = false;
        /*invisibleGround3 = createSprite(100, 950, displayWidth * 5, 20);
        invisibleGround3.setCollider("rectangle", 0, 0);
        invisibleGround3.debug = true;
        invisibleGround4 = createSprite(100, 1150, displayWidth * 5, 20);
        invisibleGround4.setCollider("rectangle", 0, 0);
        invisibleGround4.debug = true;*/
  }


  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getPlayersAtEnd();
    spawnObstacles();
    spawnObstacles1();
    //spawnObstacles2();
    //spawnObstacles3();

    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,20,displayWidth*5, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 50 ;
      var y = 100 ;

      player1.collide(invisibleGround1);
      player2.collide(invisibleGround2);
      //player3.collide(invisibleGround1);
      //player4.collide(invisibleGround2);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 245;
        
        //use data form the database to display the cars in y direction
        x = 360 - allPlayers[plr].distance;
        plays[index-1].x = x;
        plays[index-1].y = y;
        plays[index - 1].velocityY = 2;
        plays[index - 1].velocityY = 2;
       // console.log(index, player.index)

       
        if (index === player.index){
          //stroke(10);
          //fill("red");
          //ellipse(x,y,60,60);
          plays[index - 1].shapeColor = "red";
          camera.position.x = plays[index - 1].x;
          camera.position.y = plays[index - 1].y;
          player.x = x;
          player.y = y;
          
          if(keyDown("space")) {
            player1.y = 235;
          }
          //plays[index-1].velocityY = plays[index-1].velocityY + 0.8

          if(keyDown(UP_ARROW)) {
            player2.y = 455;
          }

        }
        
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
          player.distance -= 10
          player.update();
      }
      
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(player.distance == -6200){
      gameState = 2;
      player.rank +=1
      Player.updatePlayersAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}

function spawnObstacles() {
  var i = 0;
  if (frameCount % 300 === 0) {
      i = i + 1000
      var obstacle = createSprite(1500, 330);

      obstacle.velocityX = -2;
      obstacle.addImage(hurdle);
      obstacle.scale = 0.15;
      obstacle.lifetime = 4500;

  }
}

function spawnObstacles1() {
  if (frameCount % 300 === 0) {

      var obstacle1 = createSprite(5000, 585);

      obstacle1.velocityX = -2;
      obstacle1.addImage(hurdle);
      obstacle1.scale = 0.15;
      obstacle1.lifetime = 4500;
  
  }
}

/*function spawnObstacles2() {
  var i = 0;
  if (frameCount % 360 === 0) {
      i = i + 1000
      var obstacle = createSprite(6000, 325);

      obstacle.velocityX = -2;
      obstacle.addImage("hurdle.png");

      obstacle.scale = 0.80;
      obstacle.lifetime = 800;
      obstacle.setCollider("rectangle", -10, 0, 90, 150);
      obstacle.debug = true;
  }
}

function spawnObstacles3() {
  if (frameCount % 360 === 0) {

      var obstacle = createSprite(800, 585);

      obstacle.velocityX = -2;
      obstacle.addImage("hurdle.png");
      obstacle.scale = 0.80;
      obstacle.lifetime = 800;
      obstacle.setCollider("rectangle", -10, 0, 90, 150);
      obstacle.debug = true;

  }
}*/
