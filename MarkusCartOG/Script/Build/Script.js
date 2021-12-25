"use strict";
var MarkusCart;
(function (MarkusCart) {
    var ƒ = FudgeCore;
    class Car extends ƒ.Node {
        health = 1;
        name = "McQueen";
        constructor() {
            super("Car");
            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            this.mtxLocal.translate(new ƒ.Vector3(0, 0, 0));
        }
    }
    MarkusCart.Car = Car;
})(MarkusCart || (MarkusCart = {}));
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
var MarkusCart;
(function (MarkusCart) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    window.addEventListener("load", start);
    let fps = 50;
    let graph;
    //let car: Car;
    let car;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    function start(_event) {
        viewport = _event.detail;
        graph = viewport.getBranch();
        console.log(graph);
        car = graph.getChildrenByName("Car")[0];
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
        //viewport.camera.mtxPivot.translateZ(-60);
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        let agentRotationSpeed = 250;
        let value = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrForward.setInput(value * deltaTime);
        car.mtxLocal.translateY(ctrForward.getOutput());
        // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            car.mtxLocal.rotateZ(agentRotationSpeed * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            car.mtxLocal.rotateZ(-agentRotationSpeed * deltaTime);
        let PositionAgentForCamera = car.mtxLocal.translation;
        viewport.camera.mtxPivot.translation = new ƒ.Vector3((-PositionAgentForCamera.x - 10), PositionAgentForCamera.y, (PositionAgentForCamera.z + 10));
        viewport.camera.mtxPivot.rotateY(-33);
        viewport.draw();
        //ƒ.AudioManager.default.update();
    }
})(MarkusCart || (MarkusCart = {}));
//# sourceMappingURL=Script.js.map