"use strict";
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
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
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
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
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
    document.addEventListener("interactiveViewportStarted", start);
    //test for camera 
    let camera = new ƒ.Node("cameraNode");
    let cmpCamera = new ƒ.ComponentCamera;
    let fps = 60;
    let graph;
    let agent;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let CameraControl = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    //CameraControl.setDelay(500);
    let RotationCameraTest_Left = false;
    let TheChosenOne_Left = 1;
    let RotationCameraTest_Right = false;
    let TheChosenOne_Right = -1;
    let LongRun = false;
    let MemorieNumber = 0;
    let Referee_Left;
    let Referee2_Left;
    let Referee_Right;
    let Referee2_Right;
    Referee_Left = 0;
    Referee2_Left = -1;
    Referee_Right = 0;
    Referee2_Right = -1;
    let KeyStatus_Left;
    KeyStatus_Left = true;
    let KeyStatus_Right;
    KeyStatus_Right = true;
    let StartKey;
    StartKey = false;
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        //viewport.camera.mtxPivot.translateY(150);
        //viewport.camera.mtxPivot.rotateX(90);
        graph = viewport.getBranch();
        agent = graph.getChildrenByName("Bike")[0];
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(0, 6, -16); // 0 8 -12
        cmpCamera.mtxPivot.rotation = new ƒ.Vector3(18, 0, 0);
        camera.addComponent(cmpCamera);
        camera.addComponent(new ƒ.ComponentTransform());
        graph.addChild(camera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
    }
    function update(_event) {
        // Camera left turn
        if (RotationCameraTest_Left == true) {
            TheChosenOne_Left = 1;
            CameraControl.setInput(0.5 * TheChosenOne_Left);
            camera.mtxLocal.rotateY(CameraControl.getOutput());
            if (Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) < 1 || Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) > 180) {
                RotationCameraTest_Left = false;
                TheChosenOne_Left = 0;
                camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
                LongRun = false;
            }
        }
        // Camera right turn
        if (RotationCameraTest_Right == true) {
            TheChosenOne_Right = -1;
            CameraControl.setInput(0.5 * TheChosenOne_Right);
            camera.mtxLocal.rotateY(CameraControl.getOutput());
            if (Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) < 1 || Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) > 180) {
                RotationCameraTest_Right = false;
                TheChosenOne_Right = 0;
                camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
                LongRun = false;
            }
        }
        // Camera goes back to normal
        if (KeyStatus_Left == true && KeyStatus_Right == true) {
            MemorieNumber = MemorieNumber + 1;
            if (MemorieNumber > 100) {
                camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
                MemorieNumber = 0;
            }
        }
        else {
            MemorieNumber = 0;
        }
        console.log(MemorieNumber);
        camera.mtxLocal.translation = agent.mtxWorld.translation;
        //if (camera.mtxLocal.translation != agent.mtxWorld.translation){
        //  camera.mtxLocal.translation = new ƒ.Vector3(0,agent.mtxWorld.translation.y,-12);
        //}
        //camera.mtxLocal.rotation = new ƒ.Vector3(0, agent.mtxWorld.rotation.y, 0);
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        //---------- Movement Managment ----------
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            StartKey = true;
        }
        if (StartKey == true) {
            ctrForward.setInput(2 * deltaTime);
            agent.mtxLocal.translateZ(ctrForward.getOutput());
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true) {
            agent.mtxLocal.rotateY(90);
            //TheChosenOne_Left = -1;
            KeyStatus_Left = false;
            RotationCameraTest_Left = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true) {
            agent.mtxLocal.rotateY(-90);
            //TheChosenOne_Left = 1;
            KeyStatus_Right = false;
            RotationCameraTest_Right = true;
        }
        Referee2_Left = Referee_Left;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            Referee_Left = Referee_Left + 1;
        }
        if (Referee2_Left == Referee_Left) {
            KeyStatus_Left = true;
        }
        if (Referee_Left > 200) {
            Referee_Left = 0;
            Referee2_Left = -1;
        }
        Referee2_Right = Referee_Right;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            Referee_Right = Referee_Right + 1;
        }
        if (Referee2_Right == Referee_Right) {
            KeyStatus_Right = true;
        }
        if (Referee_Right > 200) {
            Referee_Right = 0;
            Referee2_Right = -1;
        }
        //---------- End of Movement Managment
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map