window.onload = function() {
 var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload:
preload, create: create, update: update, render: render} );


function preload() {

    this.game.load.image('person', '/assets/heart1.png');
	this.game.load.spritesheet('guy','/assets/police-spritesheet.png',30,36.5,12);
	this.game.load.image('background', '/assets/tilebackground2.jpg');
	this.load.image('key', 'assets/key2.png');
	this.load.image('door', 'assets/door.png');
this.game.load.spritesheet('zombleft','/assets/zombieleft.png',57,52,7);
this.game.load.spritesheet('zombright','/assets/zombieright.png',57.12,52,7);

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

function create() {
    game.world.setBounds(-1000, -1000, 2000, 2000);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 800, 600, 'background');
    land.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('TilePolice', 'gameTiles');
    //this.backgroundlayer = this.map.createLayer('backgroundLayer');
    //this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    //this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    //this.backgroundlayer.resizeWorld();

    //game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    //game.physics.arcade.gravity.y = 200;
    // Set stage background color
    //this.game.stage.backgroundColor = 0x4488cc;

    key = game.add.sprite(-10, -10, 'key');
    game.physics.enable(key, Phaser.Physics.ARCADE);
    key.scale.set(.05,.05);

    door = game.add.sprite(50, 50, 'door');
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.scale.set(.25,.25);

    player = game.add.sprite(32, 32, 'guy');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
	game.camera.follow(player);

    ZL = game.add.sprite(-10, 32, 'zombright');
    game.physics.enable(ZL, Phaser.Physics.ARCADE);
    //player.body.bounce.y = 0.2;
    ZL.body.collideWorldBounds = true;
    ZL.body.velocity.x = 100;

    ZR = game.add.sprite(10, 32, 'zombleft');
    game.physics.enable(ZR, Phaser.Physics.ARCADE);
    //player.body.bounce.y = 0.2;
    ZR.body.collideWorldBounds = true;
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


	//game.time.events.loop(1500, leftcome, this);
	//game.time.events.loop(1500, rightcome, this);

cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


function getkey(body1, body2){

	body1.kill();
	haskey = true;
}

function enterdoor(body1, body2){
	if(haskey != false){
		body1.kill();
	}
	else{
	
	}

}

function hitzombie(body1, body2){
	  health = health-1;

}

function update() {


   land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

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
    game.physics.arcade.collide(key, player, getkey, null, this);
    game.physics.arcade.overlap(player, door, enterdoor, null, this);
    game.physics.arcade.overlap(player, ZR, hitzombie, null, this);
    game.physics.arcade.overlap(player, ZL, hitzombie, null, this);

}

function render () {

     game.debug.text('Health: ' + health, 32, 32);

}
//http://www.rhinebeckcfc.com/themag1.jpg
//http://thumbs.dreamstime.com/z/abstract-square-tile-seamless-white-gray-texture-background-same-transparency-grid-39463263.jpg
//http://i1081.photobucket.com/albums/j355/Shaddowval/ModernNPC1_zps0569f73a.png

}

