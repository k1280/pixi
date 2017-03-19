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
    .load(setup);

let zombie, state, background;

function setup() {
    background = new Sprite(resources['images/BG.png'].texture);
    background.scale.x = 0.7;
    background.scale.y = 0.6;
    
    zombie = new Sprite(resources['images/idle/Idle (1).png'].texture);
    zombie.scale.x = 0.3;
    zombie.scale.y = 0.3;
    zombie.x = renderer.view.width / 2 - zombie.width / 2;
    zombie.x = renderer.view.height / 2 - zombie.height / 2;

    zombie.vx = 0;
    zombie.vy = 0;
    stage.addChild(background);
    stage.addChild(zombie);

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
    };
    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the zombie isn't moving vertically, stop the sprite from moving
        //by setting its velocity to zero
        if (!right.isDown && zombie.vy === 0) {
            zombie.vx = 0;
        }
    };
    //Up
    up.press = () => {
        zombie.vy = -5;
        zombie.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && zombie.vx === 0) {
            zombie.vy = 0;
        }
    };
    //Right
    right.press = () => {
        zombie.vx = 5;
        zombie.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && zombie.vy === 0) {
            zombie.vx = 0;
        }
    };
    //Down
    down.press = () => {
        zombie.vy = 5;
        zombie.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && zombie.vx === 0) {
            zombie.vy = 0;
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
    zombie.x += zombie.vx;
    zombie.y += zombie.vy;
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

// TODO: review chapter about friction, prepare flying zombies
