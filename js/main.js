window.onload = function() {
 var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload:
preload, create: create, update: update, render: render} );

//index.html
function preload() {
	   game.load.spritesheet('guy','assets/police-spritesheet.png',30,36.5,12);
	game.load.image('background', 'assets/tilebackground2.jpg');
	game.load.image('key', 'assets/key2.png');
	game.load.image('door', 'assets/door.png');
game.load.spritesheet('zombleft','assets/zombieleft.png',57,52,7);
game.load.spritesheet('zombright','assets/zombieright.png',57.12,52,7);
    game.load.audio('song',['assets/Fallen-Angel.mp3',
'assets/Fallen-Angel.ogg']);
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('gun', 'assets/gun.png');
	game.load.audio('gunshot',['assets/gunshot.mp3', 'assets/gunshot.ogg']);
	game.load.image('block', 'assets/block1.png');
	game.load.image('block5', 'assets/block-5.png');

}

var guy;
var player;
var facing = 'left';
var jumpTimer = 0;
var bg;
var cursors;
var jumpButton;
var map;
var backgroundlayer;
var blockedLayer;
var land;
var key;
var door;
var haskey = false;
var ZR;
var ZL;
var health = 100;
var zombiesr;
var zombiesl;
var bullets;
var bullet;
var fireRate = 100;
var nextFire = 0;
var sprite;
var sprite2;
var hasgun = false;
var score = 0;
var music;
var gunshot;
var block;
var block2;
var blocks2;
var block55;

function create() {
    game.world.setBounds(-1000, -1000, 2000, 2000);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 800, 600, 'background');
    land.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //this.backgroundlayer = this.map.createLayer('backgroundLayer');
    //this.blockedLayer = this.map.createLayer('blockedLayer');

	music = game.add.audio('song');
	music.play();

    //collision on blockedLayer
    //this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    //this.backgroundlayer.resizeWorld();

    //game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    //game.physics.arcade.gravity.y = 200;
    // Set stage background color
    //this.game.stage.backgroundColor = 0x4488cc;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    key = game.add.sprite(-500, -700, 'key');
    game.physics.enable(key, Phaser.Physics.ARCADE);
    key.scale.set(.05,.05);

    door = game.add.sprite(800, 900, 'door');
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.scale.set(.25,.25);

    gun = game.add.sprite(-600, 800, 'gun');
    game.physics.enable(gun, Phaser.Physics.ARCADE);
    gun.scale.set(.05,.05);

	blocks = game.add.group();
	blocks.enableBody = true;
	blocks2 = game.add.group();
	blocks2.enableBody = true;




    player = game.add.sprite(32, 32, 'guy');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
	game.camera.follow(player);

    ZL = game.add.sprite(-100, 320, 'zombright');
    game.physics.enable(ZL, Phaser.Physics.ARCADE);
    //player.body.bounce.y = 0.2;
    //ZL.body.collideWorldBounds = true;
    ZL.body.velocity.x = 100;

    ZR = game.add.sprite(-100, -200, 'zombleft');
    game.physics.enable(ZR, Phaser.Physics.ARCADE);
    //player.body.bounce.y = 0.2;
    //ZR.body.collideWorldBounds = true;
    ZR.body.velocity.x = -100;
    zombiesr = game.add.group();
    zombiesr.enableBody = true;
    zombiesl = game.add.group();
    zombiesl.enableBody = true;

    ZL.animations.add('walk',[0,1,2,3,4,5,6],7,true);
    ZL.animations.play('walk', 2, true);
    ZR.animations.add('walk',[0,1,2,3,4,5,6],7,true);
    ZR.animations.play('walk', 2, true);

    player.animations.add('left', [3,4,5], 3, true);
    //player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [6,7,8], 3, true);
    player.animations.add('idle', [0,1,2], 3, true);
    player.animations.add('up', [9,10,11], 3, true);

	game.time.events.repeat(Phaser.Timer.SECOND * .25, 10000, leftcome, this);
	game.time.events.repeat(Phaser.Timer.SECOND * .25, 10000, rightcome,
this);
	game.time.events.repeat(Phaser.Timer.SECOND * .0025, 30, createblock,
this);
	game.time.events.repeat(Phaser.Timer.SECOND * .0025, 30, createblock2,
this);
	//game.time.events.loop(1500, leftcome, this);
	//game.time.events.loop(1500, rightcome, this);

cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


function getgun(body1, body2){
	hasgun = true;
	body1.kill();
	

}

function leftcome(){
    ZR = zombiesr.create(game.world.randomX, game.world.randomY,
'zombleft');
    game.physics.enable(ZR, Phaser.Physics.ARCADE);
    ZR.animations.add('walk',[0,1,2,3,4,5,6],7,true);
    ZR.animations.play('walk', 2, true);
    ZR.body.velocity.x = -100;


}


function createblock2(){
    block55 = blocks2.create(game.world.randomX, game.world.randomY,
'block5');
    game.physics.enable(block55, Phaser.Physics.ARCADE);
    block55.scale.set(1,2);
    block55.body.immovable = true;

}

function createblock(){
    block2 = blocks.create(game.world.randomX, game.world.randomY, 'block');
    game.physics.enable(block2, Phaser.Physics.ARCADE);
    block2.scale.set(2,1);
    block2.body.immovable = true;

}


function rightcome(){
    ZL = zombiesl.create(game.world.randomX, game.world.randomY,
'zombright');
    game.physics.enable(ZL, Phaser.Physics.ARCADE);
    ZL.animations.add('walk',[0,1,2,3,4,5,6],7,true);
    ZL.animations.play('walk', 2, true);
    ZL.body.velocity.x = 100;

}


function getkey(body1, body2){

	body1.kill();
	haskey = true;
}


function enterdoor(body1, body2){
	if(haskey != false){
		body1.kill();
	var style3 = {font: "30px Arial", fill:"#330F53"};
	var scoringstuff = "Your score is: " + score;
        var winstatement = 		game.add.text(500,700,scoringstuff,style3);
//800 900
		gamepause();
	}
	else{
	
	}

}

function hitzombie(body1, body2){
	  health = health-1;

}


function kz(body3, body4){
	body3.kill();
	body4.kill();
	score ++;
}

function gamepause(){

	game.paused = true;
}

function nothing(){

}

function fire () {
if(hasgun == true){
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
	gunshot = game.add.audio('gunshot');
	gunshot.play();
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(player.x, player.y);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet,
1000, game.input.activePointer, 500);
    }
}

}

function update() {


   land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;


    if (game.input.activePointer.isDown)
    {
        fire();
    }
if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
else if (cursors.down.isDown)
    {
        player.body.velocity.y = 250;

        if (facing != 'idle')
        {
            player.animations.play('idle');
            facing = 'idle';
        }
    }
else if (cursors.up.isDown)
    {
        player.body.velocity.y = -250;

        if (facing != 'up')
        {
            player.animations.play('up');
            facing = 'up';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
	        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }


    }
     else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
	game.world.wrap(ZL, 0, true);
	game.world.wrap(ZR, 0, true);
game.physics.arcade.collide(gun, player, getgun, null, this);
    game.physics.arcade.collide(key, player, getkey, null, this);
    game.physics.arcade.collide(blocks, player, nothing, null, this);
game.physics.arcade.collide(blocks2, player, nothing, null, this);
 game.physics.arcade.overlap(bullets, zombiesr, kz, null, this);
 game.physics.arcade.overlap(bullets, zombiesl, kz, null, this);
    game.physics.arcade.overlap(player, door, enterdoor, null, this);
    game.physics.arcade.overlap(player, zombiesr, hitzombie, null, this);
    game.physics.arcade.overlap(player, zombiesl, hitzombie, null, this);

    game.physics.arcade.overlap(player, ZL, hitzombie, null, this);

    if (health < 0){
	gamepause();
	}

}

function render () {
     game.debug.text('Score: ' + score, 700, 32);
     game.debug.text('Health: ' + health, 32, 32);

}





game.StateB = function (game) {

    var text;
	var style1;
	var wintext;

};

game.StateB.prototype = {

    create: function () {
	game.stage.backgroundColor = '#008060';
	style1 = {font: "30px Arial", fill:"#ff0044"};
    	wintext = game.add.text(650, 15, "Score: 0",style1);

}
}

//http://www.rhinebeckcfc.com/themag1.jpg
//http://thumbs.dreamstime.com/z/abstract-square-tile-seamless-white-gray-texture-background-same-transparency-grid-39463263.jpg
//http://i1081.photobucket.com/albums/j355/Shaddowval/ModernNPC1_zps0569f73a.png
//https://wiki.themanaworld.org/images/d/da/Example-skeleton.png
//http://www.springfield-armory.com/wp-content/uploads/2014/03/XD9649HCSP06_1200x782.png
//http://www.newgrounds.com/audio/listen/594917
//http://www.soundjay.com/gun-sound-effect.html
}

