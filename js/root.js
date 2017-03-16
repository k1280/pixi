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
    zombie.x = -90;
    zombie.y = -90;

    stage.addChild(zombie);
    renderer.render(stage);
}