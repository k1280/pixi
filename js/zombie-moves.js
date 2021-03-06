let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let stage = new Container(),
    renderer = autoDetectRenderer(1100, 600);
document.body.appendChild(renderer.view);

//setting for canvas (border style, background color)
renderer.view.style.border = '1px dashed black';
renderer.backgroundColor = '0x000000';

//my zombie
loader
    .add('images/BG.png')
    .add('images/idle/Idle (1).png')
    .add(['images/bullets/skull.png'])
    .load(setup);

let zombie, state, background, skull;

function setup() {
    background = new Sprite(resources['images/BG.png'].texture);
    background.scale.x = 0.7;
    background.scale.y = 0.6;

    skull = new Sprite(resources['images/bullets/skull.png'].texture);
    skull.scale.x = 0.8;
    skull.scale.y = 0.8;

    skull.x = renderer.view.width / 2;
    skull.y = renderer.view.height/2 - skull.width / 2;

    zombie = new Sprite(resources['images/idle/Idle (1).png'].texture);
    zombie.scale.x = 0.3;
    zombie.scale.y = 0.3;
    zombie.x = renderer.view.width / 2 - zombie.width / 2;
    zombie.x= renderer.view.height / 2 - zombie.height / 2;

    zombie.vx = 0;
    zombie.vy = 0;

    //acceleration and friction added to moves, TODO: boundries
    zombie.accelerationX = 0;
    zombie.accelerationY = 0;
    zombie.frictionX = 1;
    zombie.frictionY = 1;

    zombie.speed = 0.5;
    zombie.drag = 0.95;

    stage.addChild(background);
    stage.addChild(zombie);
    stage.addChild(skull);

    //capture keyboard arrows (based on tutorial for pixiJS)
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the sprite's velocity when the key is pressed
        zombie.vx = -5;
        zombie.vy = 0;
        zombie.accelerationX = -zombie.speed;
        zombie.frictionX = 1;
    };
    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the zombie isn't moving vertically, stop the sprite from moving
        //by setting its velocity to zero
        if (!right.isDown) {
            zombie.accelerationX = 0;
            zombie.frictionX = zombie.drag;
        }
    };
    //Up
    up.press = () => {
        zombie.vy = -5;
        zombie.vx = 0;
        zombie.accelerationY = -zombie.speed;
        zombie.frictionY = 1;
    };
    up.release = () => {
        if (!down.isDown) {
            zombie.accelerationY = 0;
            zombie.frictionY = zombie.drag;
        }
    };
    //Right
    right.press = () => {
        zombie.vx = 5;
        zombie.vy = 0;
        zombie.accelerationX = zombie.speed;
        zombie.frictionX = 1;
    };
    right.release = () => {
        if (!left.isDown) {
            zombie.accelerationX = 0;
            zombie.frictionX = zombie.drag;
        }
    };
    //Down
    down.press = () => {
        zombie.vy = 5;
        zombie.vx = 0;
        zombie.accelerationY = zombie.speed;
        zombie.frictionY = 1;
    };
    down.release = () => {
        if (!up.isDown) {
            zombie.accelerationY = 0;
            zombie.frictionY = zombie.drag;
        }
    };

    state = play;
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

function play() {

    zombie.vx += zombie.accelerationX;
    zombie.vy += zombie.accelerationY;

    zombie.vx *= zombie.frictionX;
    zombie.vy *= zombie.frictionY;

    zombie.vy += 0.1; //gravity

    zombie.x += zombie.vx;
    zombie.y += zombie.vy;

    //Use the `contain` function to keep the sprite inside the canvas

    let collision = contain(
        zombie,
        //The sprite you want to contain
        {
            //An object that defines the area
            x: 0, //`x` position
            y: 0, //`y` position
            width: renderer.view.width, //`width`
            height: renderer.view.height //`height`
        }
    );


    //Check for a collision. If the value of `collision` isn't
    //`undefined` then you know the sprite hit a boundary

    if (collision) {

        //Reverse the sprite's `vx` value if it hits the left or right
        if (collision.has("left") || collision.has("right")) {
            zombie.vx = -zombie.vx;
        }

        //Reverse the sprite's `vy` value if it hits the top or bottom
        if (collision.has("top") || collision.has("bottom")) {
            zombie.vy = -zombie.vy;
        }
    }
}



// FUNCTIONS BELOW BASED ON TUTORIAL COMPLETELY!!!!
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    //Return the `key` object
    return key;
}
keyObject.press = () => {
    //key object pressed
};
keyObject.release = () => {
    //key object released
};

// Contain function:

function contain(sprite, container) {

    //Create a `Set` called `collision` to keep track of the
    //boundaries with which the sprite is colliding
    var collision = new Set();

    //Left
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision.add("left");
    }

    //Top
    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision.add("top");
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision.add("right");
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision.add("bottom");
    }

    //If there were no collisions, set `collision` to `undefined`
    if (collision.size === 0) collision = undefined;

    //Return the `collision` value
    return collision;
}

b = new Bump(PIXI);
b.hitTestRectangle(zombie, skull);

