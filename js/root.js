var type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type)

var stage = new PIXI.Container(), //Create a container object - `stage`
    renderer = PIXI.autoDetectRenderer(500, 500); //Creating renderer
document.body.appendChild(renderer.view); //Adding canvas to the HTML document

PIXI.loader //Using built-in `loader` object to load images
    .add('images/Idle (1).png')
    .load(setup); 

function setup() {
    var zombie = new PIXI.Sprite(
        PIXI.loader.resources['images/Idle (1).png'].texture
    );

    stage.addChild(zombie); //Adding zombie to the stages
    renderer.render(stage); //Tell the `renderer` to `render` the `stage` 
}