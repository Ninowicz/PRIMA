"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let state;
    (function (state) {
        state[state["Alive"] = 0] = "Alive";
        state[state["Dead"] = 1] = "Dead";
    })(state || (state = {}));
    class Bike extends ƒ.Node {
        name = "Bojack";
        State;
        constructor() {
            super("Bike");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
            // this.addComponent(new ƒ.ComponentMaterial(
            //     new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
            // );
            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 1));
        }
    }
    Script.Bike = Bike;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let state;
    (function (state) {
        state[state["Alive"] = 0] = "Alive";
        state[state["Dead"] = 1] = "Dead";
    })(state || (state = {}));
    class BikeWall extends ƒ.Node {
        name = "Bojack";
        State;
        constructor() {
            super("BikeWall");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
            this.mtxLocal.scale(new ƒ.Vector3(1, 0.75, 0.2));
            this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 0));
        }
    }
    Script.BikeWall = BikeWall;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let vitesse = 1;
    //test for camera 
    let camera = new ƒ.Node("cameraNode");
    let cmpCamera = new ƒ.ComponentCamera;
    let fps = 60;
    let graph;
    let agent;
    let agentWall;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    //let ctrForwardWall: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
    //ctrForward.setDelay(200);
    let Outlook;
    //let OutlookStart : boolean = false;
    // let PowerPoint: Bike;
    // let Word: Bike;
    // let Excel: Bike;
    let RotationCameraTest_Left = 0;
    let TheChosenOne_Left = 1;
    let RotationCameraTest_Right = 0;
    let TheChosenOne_Right = -1;
    let Referee_Left = 0;
    let Referee2_Left = -1;
    let Referee_Right = 0;
    let Referee2_Right = -1;
    let KeyStatus_Left = true;
    let KeyStatus_Right = true;
    let StartKey = false;
    let Referee_Wall = 0;
    let Referee2_Wall = -1;
    let KeyStatus_Wall = true;
    let SetWall = true;
    //let WallVectorZ = new ƒ.Vector3(0.2,0.75,1);
    let CountdownWall = 1;
    let Matrix4x4 = new ƒ.Matrix4x4();
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        graph = viewport.getBranch();
        agent = new Script.Bike();
        graph.getChildrenByName("Bike")[0].addChild(agent);
        agent.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
        //graph.addChild(AllBikeWall);
        agentWall = new Script.BikeWall();
        graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
        agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x, 0.5, agent.mtxLocal.translation.z - 1));
        Outlook = new Script.Bike();
        graph.getChildrenByName("Bike")[0].addChild(Outlook);
        Outlook.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 30));
        Outlook.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 1, 1)))));
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(0, 10, -25); // 0 8 -12
        cmpCamera.mtxPivot.rotation = new ƒ.Vector3(12.5, 0, 0);
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
        if (SetWall == true && StartKey == true) {
            //agentWall.getComponent(ƒ.ComponentMesh).mtxWorld.scaleZ(1);
            agentWall.mtxLocal.translateZ(ctrForward.getOutput());
            CountdownWall = CountdownWall + 1;
        }
        // Camera left turn
        if (RotationCameraTest_Left > 0) {
            camera.mtxLocal.rotateY(3);
            TheChosenOne_Left = TheChosenOne_Left + 3;
            if (TheChosenOne_Left >= 90) {
                TheChosenOne_Left = 0;
                RotationCameraTest_Left = RotationCameraTest_Left - 1;
            }
        }
        //---------- Camera right turn ----------
        if (RotationCameraTest_Right > 0) {
            camera.mtxLocal.rotateY(-3);
            TheChosenOne_Right = TheChosenOne_Right + 3;
            if (TheChosenOne_Right >= 90) {
                TheChosenOne_Right = 0;
                RotationCameraTest_Right = RotationCameraTest_Right - 1;
            }
        }
        //---------- Camera Adjustment ----------
        if (RotationCameraTest_Left == 0 && RotationCameraTest_Right == 0) {
            if (Math.abs(camera.mtxLocal.rotation.y % 90) < 5) {
                camera.mtxLocal.rotateY(-(camera.mtxLocal.rotation.y % 90));
                // truc a faire pour que ce soit plus doux 
            }
        }
        camera.mtxLocal.translation = agent.mtxWorld.translation;
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        //---------- Movement Managment ----------
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            StartKey = true;
        }
        if (StartKey == true) {
            ctrForward.setInput(3 * deltaTime);
            agent.mtxLocal.translateZ(ctrForward.getOutput());
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true) {
                agent.mtxLocal.rotateY(90);
                KeyStatus_Left = false;
                RotationCameraTest_Left = RotationCameraTest_Left + 1;
                SetWall = false; // la
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true) {
                agent.mtxLocal.rotateY(-90);
                KeyStatus_Right = false;
                RotationCameraTest_Right = RotationCameraTest_Right + 1;
                SetWall = false; // la
            }
            //---------- Referee is there to control the keyup and keydown ----------
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
        }
        Matrix4x4.scaling.set(0.5, 0.75, agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z);
        agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
        console.log(agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling);
        agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(1, 0.5, agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z / 2);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.Y]) && KeyStatus_Wall == true) {
            KeyStatus_Wall = false;
            // Version qi marche : 
            // vitesse = vitesse +1;
            // Matrix4x4.scaling.set(vitesse, 1, 1);
            // Outlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            // console.log(Outlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling);
            // Outlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Outlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x+1/2, 0.5, 30);
            vitesse = vitesse + 1;
            Matrix4x4.scaling.set(vitesse, 1, 1);
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            console.log(agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling);
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x, 0.5, 0);
        }
        Referee2_Wall = Referee_Wall;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.Y])) {
            Referee_Wall = Referee_Wall + 1;
        }
        if (Referee2_Wall == Referee_Wall) {
            KeyStatus_Wall = true;
        }
        if (Referee_Wall > 200) {
            Referee_Wall = 0;
            Referee2_Wall = -1;
        }
        //---------- End of Movement Managment ----------
        if (Math.abs(agent.mtxWorld.translation.x) >= 124.5 || Math.abs(agent.mtxWorld.translation.z) >= 124.5) {
            agent.mtxLocal.translation = new ƒ.Vector3(1, 0.5, 1);
            StartKey = false;
        }
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map