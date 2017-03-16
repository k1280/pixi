// Prepared aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

// Create a Pixi stage and renderer and add the 
// renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(500, 500);
document.body.appendChild(renderer.view);

// load an image and run the `setup` function when it's done
loader
    .add([
        'images/Idle (1).png',
        'images/Idle (2).png',
        'images/Idle (3).png',
        'images/Idle (4).png',
        'images/Idle (5).png',
        'images/Idle (6).png',
        'images/Idle (7).png',
        'images/Idle (8).png',
        'images/Idle (9).png'
    ])
    //.on("progress", loadProgressHandler) - TODO: finish progress bar, implement functions etc.
    .load(setup);

// function loadProgressHandler() {
//     console.log("loading");
// }

function setup() {

    // Create `zombie` sprite, add it to the stage, and render it
    var zombie = new Sprite(resources['images/Idle (1).png'].texture);

    // new position for zombie - for now tossed in the air
    zombie.height = 120;
    zombie.width = 90;

    stage.addChild(zombie);
    renderer.render(stage);

    function gameLoop() {
        // Loop this function at 60 frames per second
        requestAnimationFrame(gameLoop);
        // more like pushing the zombie forward
        zombie.x += 1;
        //Render the stage to see the animation
        renderer.render(stage);
    }

    //Start the game loop
    gameLoop();
}

