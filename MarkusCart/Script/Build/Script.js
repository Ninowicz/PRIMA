"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Cart extends ƒ.Node {
        //public health: number = 1;
        //public name: string = "McQueen";
        constructor() {
            super("Car");
            this.addComponent(new ƒ.ComponentTransform);
            this.mtxLocal.rotateZ(-90);
            //this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            //this.mtxLocal.translate(new ƒ.Vector3(0, 0, 0));
        }
    }
    Script.Cart = Cart;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    //test for camera 
    let camera = new ƒ.Node("cameraNode");
    let cmpCamera = new ƒ.ComponentCamera;
    //========
    let root;
    let mtxTerrain;
    let meshTerrain;
    let Cart;
    let Cart_oon;
    let cart;
    let body;
    let isGrounded = false;
    let dampTranslation;
    let dampRotation;
    let ctrForward = new ƒ.Control("Forward", 7010, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let ctrTurn = new ƒ.Control("Turn", 1000, 0 /* PROPORTIONAL */);
    ctrTurn.setDelay(50);
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        root = viewport.getBranch();
        setUpCart();
        let cmpMeshTerrain = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
        meshTerrain = cmpMeshTerrain.mesh;
        mtxTerrain = cmpMeshTerrain.mtxWorld;
        cart = viewport.getBranch().getChildrenByName("Cart")[0];
        body = cart.getComponent(ƒ.ComponentRigidbody);
        dampTranslation = body.dampTranslation;
        dampRotation = body.dampRotation;
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(0, 6, -10); // 0 8 -12
        cmpCamera.mtxPivot.rotation = new ƒ.Vector3(18, 0, 0);
        camera.addComponent(cmpCamera);
        camera.addComponent(new ƒ.ComponentTransform());
        root.addChild(camera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    async function setUpCart() {
        Cart_oon = root.getChildrenByName("Cart")[0];
        let CartGraph = FudgeCore.Project.resources["Graph|2021-11-24T11:44:00.967Z|63210"];
        Cart = await ƒ.Project.createGraphInstance(CartGraph);
        Cart_oon.appendChild(Cart);
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        //let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
        //let gear = 1;
        //let PressKeyGear: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.F], [ƒ.KEYBOARD_CODE.V]);
        camera.mtxLocal.translation = cart.mtxWorld.translation;
        camera.mtxLocal.rotation = new ƒ.Vector3(0, cart.mtxWorld.rotation.y + 90, 0);
        //let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
        //ctrTurn.setInput(turn);
        //cart.mtxLocal.rotateY(ctrTurn.getOutput() * deltaTime);
        //let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        //ctrForward.setInput(forward);
        //if(PressKeyGear == 1){
        //  gear = 3;
        //}
        //if(PressKeyGear == -1){
        // gear = 1;
        //}
        //cart.mtxLocal.translateX(ctrForward.getOutput() * deltaTime * gear);
        //let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
        //cart.mtxLocal.translation = terrainInfo.position;
        //cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);
        //physics
        let maxHeight = 0.3;
        let minHeight = 0.2;
        let forceNodes = cart.getChildren();
        let force = ƒ.Vector3.SCALE(ƒ.Physics.world.getGravity(), -body.mass / forceNodes.length);
        isGrounded = true; //false
        for (let forceNode of forceNodes) {
            let posForce = forceNode.getComponent(ƒ.ComponentMesh).mtxWorld.translation;
            let terrainInfo = meshTerrain.getTerrainInfo(posForce, mtxTerrain);
            let height = posForce.y - terrainInfo.position.y;
            if (height < maxHeight) {
                body.applyForceAtPoint(ƒ.Vector3.SCALE(force, (maxHeight - height) / (maxHeight - minHeight)), posForce);
                isGrounded = true;
            }
        }
        if (isGrounded) {
            body.dampTranslation = dampTranslation;
            body.dampRotation = dampRotation;
            let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            ctrTurn.setInput(turn);
            body.applyTorque(ƒ.Vector3.SCALE(cart.mtxLocal.getY(), ctrTurn.getOutput()));
            let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
            ctrForward.setInput(forward);
            body.applyForce(ƒ.Vector3.SCALE(cart.mtxLocal.getX(), ctrForward.getOutput()));
        }
        else
            body.dampRotation = body.dampTranslation = 0;
        ƒ.Physics.world.simulate();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
// Graph|2021-11-24T11:44:00.967Z|63210   ==> car 
//# sourceMappingURL=Script.js.map