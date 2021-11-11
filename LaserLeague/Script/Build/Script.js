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
            this.mtxLocal.scale(ƒ.Vector3.ONE(10));
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
// need to chance something in the main :
//  Agent is not "agent = root.getChildrenByName("Agents")[0].getChildrenByName("Agent_1R")[0];" but something else like : 
//  agent = new Agent();
// In the main : graph.<...>.addChild("agent");
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
    ƒ.Debug.info("Main Program Template running!");
    //----------------------------- Game Settings ----------------------------------------------
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let fps = 50;
    let root;
    //------------------------------------------------------------------------------------------
    let Laser;
    //let LaserSquad: ƒ.Node;
    //let agent: ƒ.Node;
    let agent;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    //---- test for the laser speed ------------------------------------------------------------
    let ctrForwardLaser = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForwardLaser.setDelay(200);
    let laserformation;
    //------------------------------------------------------------------------------------------
    async function start(_event) {
        viewport = _event.detail;
        root = viewport.getBranch();
        console.log(root);
        Laser = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0].getChildrenByName("LaserCore_1")[0];
        //LaserSquad = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0]; // For the transition 
        //agent = root.getChildrenByName("Agents")[0].getChildrenByName("Agent_1R")[0];
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
        //let laserTranslationSpeed: number = 1;
        Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(laserRotationSpeed * deltaTime);
        //LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(laserTranslationSpeed * deltaTime);
        //if (LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.getX <= new ƒ.Vector3(-10, -5, 0))
        //Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(-laserRotationSpeed * deltaTime);
        //console.log(LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.lookAt);
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
        for (let laser of lasersCheck) {
            let beams = laser.getChildren(); //ByName("LaserBeam");
            for (let beam of beams) {
                if (collisionTest(agent, beam))
                    ctrForward.setInput(0); //console.log("hit");
            }
        }
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
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map