"use strict";
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health = 1;
        name = "Bojack";
        constructor() {
            super("Agent");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshSphere("MeshAgent")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            this.mtxLocal.translate(new ƒ.Vector3(10, 0, 1));
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
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
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class LaserScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(LaserScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "LaserScript added to ";
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
    LaserLeague.LaserScript = LaserScript;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    //export import ƒui = FudgeUserInterface;
    ƒ.Debug.info("Main Program Template running!");
    //----------------------------- Game Settings ----------------------------------------------
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let fps = 50;
    let root;
    //------------------------------------------------------------------------------------------
    let Laser;
    let agent;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let laserformation;
    //------------------------------------------------------------------------------------------
    async function start(_event) {
        viewport = _event.detail;
        root = viewport.getBranch();
        console.log(root);
        Laser = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0].getChildrenByName("LaserCore_1")[0];
        let graph = viewport.getBranch();
        agent = new LaserLeague.Agent();
        graph.getChildrenByName("Agents")[0].addChild(agent);
        //let domName: HTMLElement = document.querySelector("#Hud>h1");
        //domName.textContent = agent.name;
        laserformation = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0];
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        // Camera adjustment
        viewport.camera.mtxPivot.translateZ(-60);
    }
    function update(_event) {
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        //  ===== Laser movement =====
        let laserRotationSpeed = 200;
        Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(laserRotationSpeed * deltaTime);
        //  ===== Agent movement =====
        let agentRotationSpeed = 250;
        let value = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        ctrForward.setInput(value * deltaTime);
        agent.mtxLocal.translateY(ctrForward.getOutput());
        // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            agent.mtxLocal.rotateZ(agentRotationSpeed * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            agent.mtxLocal.rotateZ(-agentRotationSpeed * deltaTime);
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let lasersCheck = laserformation.getChildren(); // LaserCheck --> LaserCore_1
        AgentPositionTest(agent);
        for (let laser of lasersCheck) {
            let beams = laser.getChildren();
            for (let beam of beams) {
                if (collisionTest(agent, beam))
                    agent.mtxLocal.translation = new ƒ.Vector3(10, 0, 1); //console.log("hit");
            }
        }
        // Line to get the camera on the agent.
        // let PositionAgentForCamera: ƒ.Vector3 = agent.mtxLocal.translation;
        // viewport.camera.mtxPivot.translation = new ƒ.Vector3( -PositionAgentForCamera.x, PositionAgentForCamera.y, -60);
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    // Other functions
    function collisionTest(_agent, _beam) {
        let testPosition = ƒ.Vector3.TRANSFORMATION(_agent.mtxWorld.translation, _beam.mtxWorldInverse);
        let distance = ƒ.Vector2.DIFFERENCE(testPosition.toVector2(), _beam.mtxLocal.translation.toVector2());
        if (distance.x < -0.65 || distance.x > 0.65 || distance.y < -0.5 || distance.y > 4.5) // r = d/2 = 0.5 ; w = 0.3 ; h = 4
            return false;
        else
            return true;
    }
    function AgentPositionTest(_agent) {
        let PositionAgent = _agent.mtxLocal.translation;
        if (PositionAgent.x > 20)
            _agent.mtxLocal.translation = new ƒ.Vector3(-19, PositionAgent.y, 1);
        if (PositionAgent.x < -20)
            _agent.mtxLocal.translation = new ƒ.Vector3(19, PositionAgent.y, 1);
        if (PositionAgent.y > 12)
            _agent.mtxLocal.translation = new ƒ.Vector3(PositionAgent.x, -10, 1);
        if (PositionAgent.y < -12)
            _agent.mtxLocal.translation = new ƒ.Vector3(PositionAgent.x, 10, 1);
    }
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map