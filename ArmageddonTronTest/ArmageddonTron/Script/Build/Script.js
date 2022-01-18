"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Bike extends ƒ.Node {
        State;
        // Walls from the bike
        ReadyToSetWall = true; // Will allow walls to be build 
        NumberOfWall = 0;
        PositionAgentTempX;
        PositionAgentTempZ;
        PostionForNextWall_X = 0;
        PostionForNextWall_Z = 0;
        StartNewWallOnZ = true; // Replace truc pair. Permet de fermer la boucle qui met a jour la coordeonnée de debut de virage
        StartNewWallOnX = false;
        // Controls of the Bike
        Direction;
        StartKey = false;
        KeyStatus_LeftTurn;
        KeyStatus_RightTurn;
        // Camera Agent
        RotationCameraTest_Left = 0;
        TheChosenOne_Left = 1;
        RotationCameraTest_Right = 0;
        TheChosenOne_Right = -1;
        constructor() {
            super("Bike");
            this.addComponent(new ƒ.ComponentTransform);
            //this.addComponent(new ƒ.ComponentLight);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
            // this.addComponent(new ƒ.ComponentMaterial(
            //     new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
            // );
            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            //this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 1));
        }
    }
    Script.Bike = Bike;
    (function (Bike) {
        let state;
        (function (state) {
            state[state["Dead"] = 0] = "Dead";
            state[state["Alive"] = 1] = "Alive";
        })(state = Bike.state || (Bike.state = {}));
    })(Bike = Script.Bike || (Script.Bike = {}));
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
        State;
        constructor() {
            super("BikeWall");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
        }
    }
    Script.BikeWall = BikeWall;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Bot extends ƒ.Node {
        bike;
        color;
        constructor() {
            super("Bot");
        }
    }
    Script.Bot = Bot;
    Script.OutlookBot = new Bot();
    Script.OutlookBot.color = new ƒ.Color(0, 1, 1, 1);
    function SetBikeBot(_bot, _spawnpoint) {
        _bot.bike = new Script.Bike();
        Script.graph.getChildrenByName("Bike")[0].addChild(_bot.bike);
        Script.SetSpawnPoint(_bot.bike, _spawnpoint);
        _bot.bike.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
    }
    Script.SetBikeBot = SetBikeBot;
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
    let agent;
    let fps = 60;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    // let Outlook: Bike;
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
    let Matrix4x4 = new ƒ.Matrix4x4();
    let Matrix4x4_2 = new ƒ.Matrix4x4();
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        Script.graph = viewport.getBranch();
        agent = new Script.Bike();
        Script.graph.getChildrenByName("Bike")[0].addChild(agent);
        agent.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
        Script.SetSpawnPoint(agent, Script.Lille);
        // let agentWall2: BikeWall;
        // agentWall2 = new BikeWall();
        // graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall2);
        Script.SetBikeBot(Script.OutlookBot, Script.Lyon);
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(-0, 10, -25); // 0 10 -25
        cmpCamera.mtxPivot.rotation = new ƒ.Vector3(12.5, 0, 0);
        camera.addComponent(cmpCamera);
        camera.addComponent(new ƒ.ComponentTransform());
        Script.graph.addChild(camera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", Script.graph, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
    }
    // Other Functions 
    // function SetNewPlayer(_bike: ƒ.Node,):void{
    //   graph.addChild("")
    // }
    async function SetNewBikeWall() {
        let agentWall;
        agentWall = new Script.BikeWall();
        Script.graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
    }
    function update(_event) {
        if (agent.ReadyToSetWall == true && agent.StartKey == true && agent.NumberOfWall % 2 == 0) {
            if (agent.StartNewWallOnZ == true) {
                agent.PostionForNextWall_Z = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                agent.StartNewWallOnZ = false;
                //SetNewBikeWall();      
            }
            let agentWall;
            agentWall = new Script.BikeWall();
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
            agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x, 0.5, agent.mtxLocal.translation.z - 1));
            agent.PositionAgentTempX = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            agent.PositionAgentTempZ = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4.scaling.set(0.2, 0.5, Math.abs(Math.abs(agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(agent.PostionForNextWall_Z)) + 0.5);
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(agent.PositionAgentTempX, 0.5, (agent.PostionForNextWall_Z + agent.PositionAgentTempZ) / 2 + 0.25);
            agent.StartNewWallOnX = true;
        }
        if (agent.ReadyToSetWall == true && agent.StartKey == true && agent.NumberOfWall % 2 == 1) { // % 2
            if (agent.StartNewWallOnX == true) {
                Matrix4x4.scaling.set(0.2, 0.5, 0.5);
                agent.PostionForNextWall_X = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                agent.StartNewWallOnX = false;
            }
            let agentWall;
            agentWall = new Script.BikeWall();
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
            agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x, 0.5, agent.mtxLocal.translation.z - 1));
            agent.PositionAgentTempX = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            agent.PositionAgentTempZ = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4.scaling.set(Math.abs(Math.abs(agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(agent.PostionForNextWall_X)) + 0.5, 0.5, 0.2);
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((agent.PostionForNextWall_X + agent.PositionAgentTempX) / 2 + 0.25, 0.5, agent.PositionAgentTempZ);
            agent.StartNewWallOnZ = true;
        }
        if (agent.ReadyToSetWall == false) {
            agent.NumberOfWall = agent.NumberOfWall + 1;
            agent.ReadyToSetWall = true;
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
            agent.StartKey = true;
        }
        if (agent.StartKey == true) {
            ctrForward.setInput(3 * deltaTime);
            agent.mtxLocal.translateZ(ctrForward.getOutput());
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true) {
                agent.mtxLocal.rotateY(90);
                KeyStatus_Left = false;
                RotationCameraTest_Left = RotationCameraTest_Left + 1;
                agent.ReadyToSetWall = false; // la
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true) {
                agent.mtxLocal.rotateY(-90);
                KeyStatus_Right = false;
                RotationCameraTest_Right = RotationCameraTest_Right + 1;
                agent.ReadyToSetWall = false; // la
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
        //---------- End of Movement Managment ----------
        if (agent.mtxWorld.translation.x >= 249.5 || agent.mtxWorld.translation.z >= 249.5 || agent.mtxWorld.translation.x < 0 || agent.mtxWorld.translation.z < 0) {
            agent.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
            agent.StartKey = false;
        }
        // ƒ.Physics.world.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let Name;
    (function (Name) {
        Name[Name["Lille"] = 0] = "Lille";
        Name[Name["Lyon"] = 1] = "Lyon";
        Name[Name["Toulouse"] = 2] = "Toulouse";
        Name[Name["Bordeaux"] = 3] = "Bordeaux"; // (-100, 0.5, -100 )
    })(Name || (Name = {}));
    class SpawnPoint extends ƒ.Node {
        Name;
        coordonates;
        orientation;
        direction;
        constructor() {
            super("SpawnPoint");
        }
    }
    Script.SpawnPoint = SpawnPoint;
    (function (SpawnPoint) {
        let Directions;
        (function (Directions) {
            Directions[Directions["North"] = 0] = "North";
            Directions[Directions["South"] = 1] = "South";
            Directions[Directions["East"] = 2] = "East";
            Directions[Directions["West"] = 3] = "West";
        })(Directions = SpawnPoint.Directions || (SpawnPoint.Directions = {}));
    })(SpawnPoint = Script.SpawnPoint || (Script.SpawnPoint = {}));
    Script.Lille = new SpawnPoint();
    Script.Lille.coordonates = new ƒ.Vector3(125, 0.5, 25);
    Script.Lille.orientation = new ƒ.Vector3(0, 0, 0);
    Script.Lille.direction = SpawnPoint.Directions.North;
    Script.Toulouse = new SpawnPoint();
    Script.Toulouse.coordonates = new ƒ.Vector3(125, 0.5, 225);
    Script.Toulouse.orientation = new ƒ.Vector3(0, 180, 0);
    Script.Toulouse.direction = SpawnPoint.Directions.South;
    Script.Lyon = new SpawnPoint();
    Script.Lyon.coordonates = new ƒ.Vector3(225, 0.5, 125);
    Script.Lyon.orientation = new ƒ.Vector3(0, 90, 0);
    Script.Lyon.direction = SpawnPoint.Directions.East;
    Script.Bordeaux = new SpawnPoint();
    Script.Bordeaux.coordonates = new ƒ.Vector3(25, 0.5, 125);
    Script.Bordeaux.orientation = new ƒ.Vector3(0, -90, 0);
    Script.Bordeaux.direction = SpawnPoint.Directions.West;
    function SetSpawnPoint(_bike, _spawnpoint) {
        _bike.mtxLocal.translation = _spawnpoint.coordonates;
        _bike.mtxLocal.rotation = _spawnpoint.orientation;
        _bike.Direction = _spawnpoint.direction;
    }
    Script.SetSpawnPoint = SetSpawnPoint;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map