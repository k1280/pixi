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
var zombie;
function setup() {

    // Create `zombie` sprite, add it to the stage, and render it
    zombie = new Sprite(resources['images/Idle (1).png'].texture);

    // new position for zombie - for now tossed in the air
    zombie.height = 120;
    zombie.width = 90;

    stage.addChild(zombie);

    //     //Capture the keyboard arrow keys
    //   var left = keyboard(37),
    //       up = keyboard(38),
    //       right = keyboard(39),
    //       down = keyboard(40);

    //Start the game loop
    gameLoop();

}
function gameLoop() {
    // Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    // more like pushing the zombie forward
    zombie.x += 1;
    //Render the stage to see the animation
    renderer.render(stage);
}


// TODO: I was following tutorial step by step; 
// TODO: investigate why it doesn't work?? -> error in browser console; how to set up gamepad??
// function setup() {

//     // Create the `zombie` sprite
//     zombie = new Sprite("images/zombie.png");
//     zombie.y = 96;
//     zombie.vx = 0;
//     zombie.vy = 0;
//     stage.addChild(zombie);

//     //Capture the keyboard arrow keys
//     var left = keyboard(37),
//         up = keyboard(38),
//         right = keyboard(39),
//         down = keyboard(40);

//     //Left arrow key `press` method
//     left.press = function () {

//         //Change the zombie's velocity when the key is pressed
//         zombie.vx = -5;
//         zombie.vy = 0;
//     };

//     //Left arrow key `release` method
//     left.release = function () {

//         //If the left arrow has been released, and the right arrow isn't down,
//         //and the zombie isn't moving vertically:
//         //Stop the zombie
//         if (!right.isDown && zombie.vy === 0) {
//             zombie.vx = 0;
//         }
//     };

//     //Up
//     up.press = function () {
//         zombie.vy = -5;
//         zombie.vx = 0;
//     };
//     up.release = function () {
//         if (!down.isDown && zombie.vx === 0) {
//             zombie.vy = 0;
//         }
//     };

//     //Right
//     right.press = function () {
//         zombie.vx = 5;
//         zombie.vy = 0;
//     };
//     right.release = function () {
//         if (!left.isDown && zombie.vy === 0) {
//             zombie.vx = 0;
//         }
//     };

//     //Down
//     down.press = function () {
//         zombie.vy = 5;
//         zombie.vx = 0;
//     };
//     down.release = function () {
//         if (!up.isDown && zombie.vx === 0) {
//             zombie.vy = 0;
//         }
//     };

//     //Set the game state
//     state = play;

//     //Start the game loop
//     gameLoop();
// }

// function gameLoop() {
//     requestAnimationFrame(gameLoop);
//     state();
//     renderer.render(stage);
// }

// function play() {

//     //Use the zombie's velocity to make it move
//     zombie.x += zombie.vx;
//     zombie.y += zombie.vy
// }
