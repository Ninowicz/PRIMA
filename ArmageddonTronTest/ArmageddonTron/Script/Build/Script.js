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
    let fps = 60;
    let graph;
    let agent;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
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
        viewport.camera.mtxPivot.translateY(150);
        viewport.camera.mtxPivot.rotateX(90);
        graph = viewport.getBranch();
        agent = graph.getChildrenByName("Bike")[0];
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
    }
    function update(_event) {
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            StartKey = true;
        }
        if (StartKey == true) {
            ctrForward.setInput(2 * deltaTime);
            agent.mtxLocal.translateZ(ctrForward.getOutput());
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true) {
            agent.mtxLocal.rotateY(90);
            KeyStatus_Left = false;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true) {
            agent.mtxLocal.rotateY(-90);
            KeyStatus_Right = false;
        }
        Referee2_Left = Referee_Left;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) { // || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])){
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
        //console.log(Referee_Left);
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map