"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Bike extends ƒ.Node {
        State;
        BikeAppearance;
        // Walls from the bike
        ReadyToSetWall = true; // Will allow walls to be build 
        NumberOfWall = 0;
        PositionAgentTempX;
        PositionAgentTempZ;
        PostionForNextWall_X = 0;
        PostionForNextWall_Z = 0;
        StartNewWallOnZ = true; // Replace truc pair. Permet de fermer la boucle qui met a jour la coordeonnée de debut de virage
        StartNewWallOnX = false;
        OffsetForWalls = 0.5;
        // Controls of the Bike
        Direction;
        DirectionNumber;
        StartKey = false;
        KeyStatus_LeftTurn;
        KeyStatus_RightTurn;
        Odds = -1;
        AllesGutZ = true;
        AllesGutX = true;
        EmergencyTurnX = false;
        EmergencyTurnZ = false;
        // Camera Agent
        RotationCameraTest_Left = 0;
        TheChosenOne_Left = 1;
        RotationCameraTest_Right = 0;
        TheChosenOne_Right = -1;
        constructor() {
            super("Bike");
            this.addComponent(new ƒ.ComponentTransform);
            //this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
            //this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));
            this.mtxLocal.scale(ƒ.Vector3.ONE(0.75));
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
    Script.CartGraph = FudgeCore.Project.resources["Graph|2021-12-26T12:21:36.268Z|87935"];
    function turnRight(_bike) {
        _bike.mtxLocal.rotateY(-90);
    }
    Script.turnRight = turnRight;
    function turnLeft(_bike) {
        _bike.mtxLocal.rotateY(90);
    }
    Script.turnLeft = turnLeft;
})(Script || (Script = {}));
// Graph for the bike : 
//
//
// Graph|2021-12-26T12:21:36.268Z|87935
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
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(Script.AgentBot.color)))); //new ƒ.Color(1, 0, 0, 0.5)
        }
    }
    Script.BikeWall = BikeWall;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let state;
    (function (state) {
        state[state["Alive"] = 0] = "Alive";
        state[state["Dead"] = 1] = "Dead";
    })(state || (state = {}));
    class BikeWallExcel extends ƒ.Node {
        State;
        constructor() {
            super("BikeWallExcel");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(Script.Excel.color)))); //new ƒ.Color(1, 0, 0, 0.5)
        }
    }
    Script.BikeWallExcel = BikeWallExcel;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let state;
    (function (state) {
        state[state["Alive"] = 0] = "Alive";
        state[state["Dead"] = 1] = "Dead";
    })(state || (state = {}));
    class BikeWallOutlook extends ƒ.Node {
        State;
        constructor() {
            super("BikeWallOutlook");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(Script.OutlookBot.color)))); //new ƒ.Color(1, 0, 0, 0.5)
        }
    }
    Script.BikeWallOutlook = BikeWallOutlook;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let state;
    (function (state) {
        state[state["Alive"] = 0] = "Alive";
        state[state["Dead"] = 1] = "Dead";
    })(state || (state = {}));
    class BikeWallWord extends ƒ.Node {
        State;
        constructor() {
            super("BikeWallWord");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(Script.Word.color)))); //new ƒ.Color(1, 0, 0, 0.5)
        }
    }
    Script.BikeWallWord = BikeWallWord;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Bot extends ƒ.Node {
        bike;
        color;
        BotNode = new ƒ.Node("BotNode");
        bikeWall;
        bikeWallOutlook;
        bikeWallExcel;
        bikeWallWord;
        name = "Unamed";
        LeftTurnAvailable = true;
        LeftTurnAvailableCount = 0;
        RightTurnAvailable = true;
        RightTurnAvailableCount = 0;
        StartingBug = 0;
        constructor() {
            super("Bot");
        }
    }
    Script.Bot = Bot;
    Script.OutlookBot = new Bot();
    Script.OutlookBot.color = new ƒ.Color(1, 1, 0, 0.5);
    Script.OutlookBot.name = "Outlook";
    Script.Excel = new Bot();
    Script.Excel.color = new ƒ.Color(0, 1, 0, 0.5);
    Script.Excel.name = "Excel";
    Script.Word = new Bot();
    Script.Word.color = new ƒ.Color(0, 0, 1, 0.5);
    Script.Word.name = "Word";
    Script.AgentBot = new Bot();
    Script.AgentBot.color = new ƒ.Color(1, 0, 0, 0.5);
    function SetBikeBot(_bot, _spawnpoint) {
        _bot = new Bot();
        Script.graph.getChildrenByName("PlayerList")[0].addChild(_bot);
        //_bot.bike = new Bike();
        //_bot.addChild(_bot.bike);
        //SetSpawnPoint(_bot.bike, _spawnpoint);
        //_bot.bike.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
    }
    Script.SetBikeBot = SetBikeBot;
    function BehaviorBot(_bot) {
        if (_bot.bike.StartKey == true) {
            if (_bot.bike.AllesGutX == false && _bot.bike.AllesGutZ == false) {
                _bot.bike.AllesGutX = true;
                _bot.bike.AllesGutZ = true;
            }
            if ((_bot.bike.mtxWorld.translation.x <= 235 && _bot.bike.mtxWorld.translation.x > 15) && _bot.bike.AllesGutX == false) {
                _bot.bike.AllesGutX = true;
            }
            if ((_bot.bike.mtxWorld.translation.z <= 235 && _bot.bike.mtxWorld.translation.z > 15) && _bot.bike.AllesGutZ == false) {
                _bot.bike.AllesGutZ = true;
            }
            if ((_bot.bike.mtxWorld.translation.x >= 240 || _bot.bike.mtxWorld.translation.x < 10) && _bot.bike.AllesGutX == true) {
                let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
                if (OutlookOddsToLive > 80 || 1) {
                    _bot.bike.EmergencyTurnX = true;
                    _bot.bike.AllesGutX = false;
                }
            }
            if ((_bot.bike.mtxWorld.translation.z >= 240 || _bot.bike.mtxWorld.translation.z < 10) && _bot.bike.AllesGutZ == true) {
                let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
                if (OutlookOddsToLive > 80 || 1) {
                    _bot.bike.EmergencyTurnZ = true;
                    _bot.bike.AllesGutZ = false;
                }
            }
            _bot.bike.Odds = Math.floor(Math.random() * 10000) + 1;
            if (_bot.bike.EmergencyTurnZ == true) {
                _bot.bike.Odds = 1;
                _bot.bike.EmergencyTurnZ = false;
            }
            if (_bot.bike.EmergencyTurnX == true) {
                _bot.bike.Odds = 1;
                _bot.bike.EmergencyTurnX = false;
            }
            if (_bot.bike.Odds < 50 && _bot.LeftTurnAvailable == true && _bot.bike.AllesGutX == true) {
                Script.turnLeft(_bot.bike);
                _bot.bike.ReadyToSetWall = false;
                _bot.LeftTurnAvailableCount = _bot.LeftTurnAvailableCount + 1;
                if (_bot.LeftTurnAvailableCount >= 2) {
                    _bot.LeftTurnAvailable = false;
                    _bot.LeftTurnAvailableCount = 0;
                }
                if (_bot.RightTurnAvailable == false) {
                    _bot.RightTurnAvailable = true;
                }
            }
            else if (_bot.bike.Odds > 9950 && _bot.RightTurnAvailable == true && _bot.bike.AllesGutZ == true) {
                Script.turnRight(_bot.bike);
                _bot.bike.ReadyToSetWall = false;
                _bot.RightTurnAvailableCount = _bot.RightTurnAvailableCount + 1;
                if (_bot.RightTurnAvailableCount >= 2) {
                    _bot.RightTurnAvailable = false;
                    _bot.RightTurnAvailableCount = 0;
                }
                if (_bot.LeftTurnAvailable == false) {
                    _bot.LeftTurnAvailable = true;
                }
            }
        }
    }
    Script.BehaviorBot = BehaviorBot;
})(Script || (Script = {}));
// let Outlook: Bike;
// let PowerPoint: Bike;
// let Word: Bike;
// let Excel: Bike;
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
    let ctrForward = new ƒ.Control("Forward", 12.5, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
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
    let Matrix4x4Outlook = new ƒ.Matrix4x4();
    let Matrix4x4Excel = new ƒ.Matrix4x4();
    let Matrix4x4Word = new ƒ.Matrix4x4();
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        Script.graph = viewport.getBranch();
        ƒ.AudioManager.default.listenTo(Script.graph);
        ƒ.AudioManager.default.listenWith(Script.graph.getComponent(ƒ.ComponentAudioListener));
        Script.SetBikeBot(Script.AgentBot, Script.Lille);
        Script.graph.getChildrenByName("PlayerList")[0].addChild(Script.AgentBot);
        Script.AgentBot.bike = new Script.Bike();
        Script.AgentBot.addChild(Script.AgentBot.bike);
        setUpBikeAppearance();
        Script.SetSpawnPoint(Script.AgentBot.bike, Script.Lille);
        Script.SetBikeBot(Script.OutlookBot, Script.Lyon);
        Script.graph.getChildrenByName("PlayerList")[0].addChild(Script.OutlookBot);
        Script.OutlookBot.bike = new Script.Bike();
        Script.OutlookBot.addChild(Script.OutlookBot.bike);
        setUpBikeAppearanceOutlook();
        Script.SetSpawnPoint(Script.OutlookBot.bike, Script.Lyon);
        Script.turnLeft(Script.OutlookBot.bike);
        //OutlookBot.bike.NumberOfWall = OutlookBot.bike.NumberOfWall +1;
        Script.SetBikeBot(Script.Excel, Script.Toulouse);
        Script.graph.getChildrenByName("PlayerList")[0].addChild(Script.Excel);
        Script.Excel.bike = new Script.Bike();
        Script.Excel.addChild(Script.Excel.bike);
        setUpBikeAppearanceExcel();
        Script.SetSpawnPoint(Script.Excel.bike, Script.Toulouse);
        Script.SetBikeBot(Script.Word, Script.Bordeaux);
        Script.graph.getChildrenByName("PlayerList")[0].addChild(Script.Word);
        Script.Word.bike = new Script.Bike();
        Script.Word.addChild(Script.Word.bike);
        setUpBikeAppearanceWord();
        Script.SetSpawnPoint(Script.Word.bike, Script.Bordeaux);
        Script.turnRight(Script.Word.bike);
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(-0, 10, -30); // 0 10 -25
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
    async function setUpBikeAppearance() {
        let graphBike = FudgeCore.Project.resources["Graph|2021-12-26T12:21:36.268Z|87935"];
        Script.AgentBot.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike));
    }
    async function setUpBikeAppearanceOutlook() {
        let graphBike2 = FudgeCore.Project.resources["Graph|2022-02-26T12:21:00.268Z|87935"];
        Script.OutlookBot.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike2));
    }
    async function setUpBikeAppearanceExcel() {
        let graphBike3 = FudgeCore.Project.resources["Graph|2022-12-26T12:21:00.268Z|87935"];
        Script.Excel.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike3));
    }
    async function setUpBikeAppearanceWord() {
        let graphBike4 = FudgeCore.Project.resources["Graph|2022-02-33T22:21:00.268Z|87935"];
        Script.Word.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike4));
    }
    function update(_event) {
        if (Script.AgentBot.bike.ReadyToSetWall == true && Script.AgentBot.bike.StartKey == true && Script.AgentBot.bike.NumberOfWall % 2 == 0) {
            if (Script.AgentBot.bike.StartNewWallOnZ == true) {
                Script.AgentBot.bike.PostionForNextWall_Z = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Script.AgentBot.bike.StartNewWallOnZ = false;
                Script.AgentBot.bikeWall = new Script.BikeWall();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.AgentBot.bikeWall);
                Script.AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(Script.AgentBot.bike.mtxLocal.translation.x, 0.5, Script.AgentBot.bike.mtxLocal.translation.z - 1));
                Script.AgentBot.bike.PositionAgentTempX = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.AgentBot.bike.PositionAgentTempZ = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.AgentBot.bike.PostionForNextWall_Z) + Script.AgentBot.bike.OffsetForWalls)); //+2
                Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
                Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.AgentBot.bike.PositionAgentTempX, 0.5, (Script.AgentBot.bike.PostionForNextWall_Z + Script.AgentBot.bike.PositionAgentTempZ) / 2); // +0.25
                Script.AgentBot.bike.StartNewWallOnX = true;
            }
            if (Script.AgentBot.bike.DirectionNumber == 2) {
                Script.AgentBot.bike.OffsetForWalls = 1; // -0.25
            }
            if (Script.AgentBot.bike.DirectionNumber == 0) {
                Script.AgentBot.bike.OffsetForWalls = -1; //-0.25
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.AgentBot.bikeWall);
            Script.AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(Script.AgentBot.bike.mtxLocal.translation.x, 0.5, Script.AgentBot.bike.mtxLocal.translation.z - 1));
            Script.AgentBot.bike.PositionAgentTempX = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.AgentBot.bike.PositionAgentTempZ = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.AgentBot.bike.PostionForNextWall_Z) + Script.AgentBot.bike.OffsetForWalls)); // +2
            Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.AgentBot.bike.PositionAgentTempX, 0.5, (Script.AgentBot.bike.PostionForNextWall_Z + Script.AgentBot.bike.PositionAgentTempZ) / 2); // +0.25
            Script.AgentBot.bike.StartNewWallOnX = true;
        }
        if (Script.AgentBot.bike.ReadyToSetWall == true && Script.AgentBot.bike.StartKey == true && Script.AgentBot.bike.NumberOfWall % 2 == 1) { // % 2
            if (Script.AgentBot.bike.StartNewWallOnX == true) {
                Matrix4x4.scaling.set(0.2, 0.5, 0.5);
                Script.AgentBot.bike.PostionForNextWall_X = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.AgentBot.bike.StartNewWallOnX = false;
                Script.AgentBot.bikeWall = new Script.BikeWall();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.AgentBot.bikeWall);
                Script.AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(Script.AgentBot.bike.mtxLocal.translation.x, 0.5, Script.AgentBot.bike.mtxLocal.translation.z - 1));
                Script.AgentBot.bike.PositionAgentTempX = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.AgentBot.bike.PositionAgentTempZ = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4.scaling.set(Math.abs(Math.abs(Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.AgentBot.bike.PostionForNextWall_X) + Script.AgentBot.bike.OffsetForWalls), 0.5, 0.4);
                Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
                Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.AgentBot.bike.PostionForNextWall_X + Script.AgentBot.bike.PositionAgentTempX) / 2, 0.5, Script.AgentBot.bike.PositionAgentTempZ); // X + 0.25
                Script.AgentBot.bike.StartNewWallOnZ = true;
            }
            if (Script.AgentBot.bike.DirectionNumber == 1) {
                Script.AgentBot.bike.OffsetForWalls = 1; //bon 
            }
            if (Script.AgentBot.bike.DirectionNumber == 3) {
                Script.AgentBot.bike.OffsetForWalls = 1;
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.AgentBot.bikeWall);
            Script.AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(Script.AgentBot.bike.mtxLocal.translation.x, 0.5, Script.AgentBot.bike.mtxLocal.translation.z - 1));
            Script.AgentBot.bike.PositionAgentTempX = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.AgentBot.bike.PositionAgentTempZ = Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4.scaling.set(Math.abs(Math.abs(Script.AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.AgentBot.bike.PostionForNextWall_X)) + Script.AgentBot.bike.OffsetForWalls, 0.5, 0.4);
            Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
            Script.AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.AgentBot.bike.PostionForNextWall_X + Script.AgentBot.bike.PositionAgentTempX) / 2, 0.5, Script.AgentBot.bike.PositionAgentTempZ); // X + 0.25
            Script.AgentBot.bike.StartNewWallOnZ = true;
        }
        if (Script.AgentBot.bike.ReadyToSetWall == false) {
            Script.AgentBot.bike.NumberOfWall = Script.AgentBot.bike.NumberOfWall + 1;
            Script.AgentBot.bike.ReadyToSetWall = true;
        }
        // Wall OutlookBot
        if (Script.OutlookBot.bike.ReadyToSetWall == true && Script.OutlookBot.bike.StartKey == true && Script.OutlookBot.bike.NumberOfWall % 2 == 0) {
            if (Script.OutlookBot.bike.StartNewWallOnZ == true) {
                Script.OutlookBot.bike.PostionForNextWall_Z = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Script.OutlookBot.bike.StartNewWallOnZ = false;
                Script.OutlookBot.bikeWallOutlook = new Script.BikeWallOutlook();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.OutlookBot.bikeWallOutlook);
                Script.OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(Script.OutlookBot.bike.mtxLocal.translation.x, 0.5, Script.OutlookBot.bike.mtxLocal.translation.z - 1));
                Script.OutlookBot.bike.PositionAgentTempX = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.OutlookBot.bike.PositionAgentTempZ = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Outlook.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.OutlookBot.bike.PostionForNextWall_Z) + Script.OutlookBot.bike.OffsetForWalls)); //+2
                Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
                Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.OutlookBot.bike.PositionAgentTempX, 0.5, (Script.OutlookBot.bike.PostionForNextWall_Z + Script.OutlookBot.bike.PositionAgentTempZ) / 2); // +0.25
                Script.OutlookBot.bike.StartNewWallOnX = true;
            }
            if (Script.OutlookBot.bike.DirectionNumber == 2) {
                Script.OutlookBot.bike.OffsetForWalls = 1; // -0.25
            }
            if (Script.OutlookBot.bike.DirectionNumber == 0) {
                Script.OutlookBot.bike.OffsetForWalls = -1; //-0.25
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.OutlookBot.bikeWallOutlook);
            Script.OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(Script.OutlookBot.bike.mtxLocal.translation.x, 0.5, Script.OutlookBot.bike.mtxLocal.translation.z - 1));
            Script.OutlookBot.bike.PositionAgentTempX = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.OutlookBot.bike.PositionAgentTempZ = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Outlook.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.OutlookBot.bike.PostionForNextWall_Z) + Script.OutlookBot.bike.OffsetForWalls)); // +2
            Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
            Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.OutlookBot.bike.PositionAgentTempX, 0.5, (Script.OutlookBot.bike.PostionForNextWall_Z + Script.OutlookBot.bike.PositionAgentTempZ) / 2); // +0.25
            Script.OutlookBot.bike.StartNewWallOnX = true;
        }
        if (Script.OutlookBot.bike.ReadyToSetWall == true && Script.OutlookBot.bike.StartKey == true && Script.OutlookBot.bike.NumberOfWall % 2 == 1) { // % 2
            if (Script.OutlookBot.bike.StartNewWallOnX == true) {
                Matrix4x4Outlook.scaling.set(0.2, 0.5, 0.5);
                Script.OutlookBot.bike.PostionForNextWall_X = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.OutlookBot.bike.StartNewWallOnX = false;
                Script.OutlookBot.bikeWallOutlook = new Script.BikeWallOutlook();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.OutlookBot.bikeWallOutlook);
                Script.OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(Script.OutlookBot.bike.mtxLocal.translation.x, 0.5, Script.OutlookBot.bike.mtxLocal.translation.z - 1));
                Script.OutlookBot.bike.PositionAgentTempX = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.OutlookBot.bike.PositionAgentTempZ = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Outlook.scaling.set(Math.abs(Math.abs(Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.OutlookBot.bike.PostionForNextWall_X) + Script.OutlookBot.bike.OffsetForWalls), 0.5, 0.4);
                Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
                Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.OutlookBot.bike.PostionForNextWall_X + Script.OutlookBot.bike.PositionAgentTempX) / 2, 0.5, Script.OutlookBot.bike.PositionAgentTempZ); // X + 0.25
                Script.OutlookBot.bike.StartNewWallOnZ = true;
            }
            if (Script.OutlookBot.bike.DirectionNumber == 1) {
                Script.OutlookBot.bike.OffsetForWalls = 1; //bon 
            }
            if (Script.OutlookBot.bike.DirectionNumber == 3) {
                Script.OutlookBot.bike.OffsetForWalls = 1;
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.OutlookBot.bikeWallOutlook);
            Script.OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(Script.OutlookBot.bike.mtxLocal.translation.x, 0.5, Script.OutlookBot.bike.mtxLocal.translation.z - 1));
            Script.OutlookBot.bike.PositionAgentTempX = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.OutlookBot.bike.PositionAgentTempZ = Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Outlook.scaling.set(Math.abs(Math.abs(Script.OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.OutlookBot.bike.PostionForNextWall_X)) + Script.OutlookBot.bike.OffsetForWalls, 0.5, 0.4);
            Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
            Script.OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.OutlookBot.bike.PostionForNextWall_X + Script.OutlookBot.bike.PositionAgentTempX) / 2, 0.5, Script.OutlookBot.bike.PositionAgentTempZ); // X + 0.25
            Script.OutlookBot.bike.StartNewWallOnZ = true;
        }
        if (Script.OutlookBot.bike.ReadyToSetWall == false) {
            Script.OutlookBot.bike.NumberOfWall = Script.OutlookBot.bike.NumberOfWall + 1;
            Script.OutlookBot.bike.ReadyToSetWall = true;
        }
        // Wall Excel
        if (Script.Excel.bike.ReadyToSetWall == true && Script.Excel.bike.StartKey == true && Script.Excel.bike.NumberOfWall % 2 == 0) {
            if (Script.Excel.bike.StartNewWallOnZ == true) {
                Script.Excel.bike.PostionForNextWall_Z = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Script.Excel.bike.StartNewWallOnZ = false;
                Script.Excel.bikeWallExcel = new Script.BikeWallExcel();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Excel.bikeWallExcel);
                Script.Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Script.Excel.bike.mtxLocal.translation.x, 0.5, Script.Excel.bike.mtxLocal.translation.z - 1));
                Script.Excel.bike.PositionAgentTempX = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Excel.bike.PositionAgentTempZ = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Excel.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.Excel.bike.PostionForNextWall_Z) + Script.Excel.bike.OffsetForWalls)); //+2
                Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
                Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.Excel.bike.PositionAgentTempX, 0.5, (Script.Excel.bike.PostionForNextWall_Z + Script.Excel.bike.PositionAgentTempZ) / 2); // +0.25
                Script.Excel.bike.StartNewWallOnX = true;
            }
            if (Script.Excel.bike.DirectionNumber == 2) {
                Script.Excel.bike.OffsetForWalls = 1; // -0.25
            }
            if (Script.Excel.bike.DirectionNumber == 0) {
                Script.Excel.bike.OffsetForWalls = -1; //-0.25
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Excel.bikeWallExcel);
            Script.Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Script.Excel.bike.mtxLocal.translation.x, 0.5, Script.Excel.bike.mtxLocal.translation.z - 1));
            Script.Excel.bike.PositionAgentTempX = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.Excel.bike.PositionAgentTempZ = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Excel.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.Excel.bike.PostionForNextWall_Z) + Script.Excel.bike.OffsetForWalls)); // +2
            Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
            Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.Excel.bike.PositionAgentTempX, 0.5, (Script.Excel.bike.PostionForNextWall_Z + Script.Excel.bike.PositionAgentTempZ) / 2); // +0.25
            Script.Excel.bike.StartNewWallOnX = true;
        }
        if (Script.Excel.bike.ReadyToSetWall == true && Script.Excel.bike.StartKey == true && Script.Excel.bike.NumberOfWall % 2 == 1) { // % 2
            if (Script.Excel.bike.StartNewWallOnX == true) {
                Matrix4x4Excel.scaling.set(0.2, 0.5, 0.5);
                Script.Excel.bike.PostionForNextWall_X = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Excel.bike.StartNewWallOnX = false;
                Script.Excel.bikeWallExcel = new Script.BikeWallExcel();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Excel.bikeWallExcel);
                Script.Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Script.Excel.bike.mtxLocal.translation.x, 0.5, Script.Excel.bike.mtxLocal.translation.z - 1));
                Script.Excel.bike.PositionAgentTempX = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Excel.bike.PositionAgentTempZ = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Excel.scaling.set(Math.abs(Math.abs(Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.Excel.bike.PostionForNextWall_X) + Script.Excel.bike.OffsetForWalls), 0.5, 0.4);
                Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
                Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.Excel.bike.PostionForNextWall_X + Script.Excel.bike.PositionAgentTempX) / 2, 0.5, Script.Excel.bike.PositionAgentTempZ); // X + 0.25
                Script.Excel.bike.StartNewWallOnZ = true;
            }
            if (Script.Excel.bike.DirectionNumber == 1) {
                Script.Excel.bike.OffsetForWalls = 1; //bon 
            }
            if (Script.Excel.bike.DirectionNumber == 3) {
                Script.Excel.bike.OffsetForWalls = 1;
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Excel.bikeWallExcel);
            Script.Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Script.Excel.bike.mtxLocal.translation.x, 0.5, Script.Excel.bike.mtxLocal.translation.z - 1));
            Script.Excel.bike.PositionAgentTempX = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.Excel.bike.PositionAgentTempZ = Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Excel.scaling.set(Math.abs(Math.abs(Script.Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.Excel.bike.PostionForNextWall_X)) + Script.Excel.bike.OffsetForWalls, 0.5, 0.4);
            Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
            Script.Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.Excel.bike.PostionForNextWall_X + Script.Excel.bike.PositionAgentTempX) / 2, 0.5, Script.Excel.bike.PositionAgentTempZ); // X + 0.25
            Script.Excel.bike.StartNewWallOnZ = true;
        }
        if (Script.Excel.bike.ReadyToSetWall == false) {
            Script.Excel.bike.NumberOfWall = Script.Excel.bike.NumberOfWall + 1;
            Script.Excel.bike.ReadyToSetWall = true;
        }
        // Wall Word
        if (Script.Word.bike.ReadyToSetWall == true && Script.Word.bike.StartKey == true && Script.Word.bike.NumberOfWall % 2 == 0) {
            if (Script.Word.bike.StartNewWallOnZ == true) {
                Script.Word.bike.PostionForNextWall_Z = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Script.Word.bike.StartNewWallOnZ = false;
                Script.Word.bikeWallWord = new Script.BikeWallWord();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Word.bikeWallWord);
                Script.Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Script.Word.bike.mtxLocal.translation.x, 0.5, Script.Word.bike.mtxLocal.translation.z - 1));
                Script.Word.bike.PositionAgentTempX = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Word.bike.PositionAgentTempZ = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Word.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.Word.bike.PostionForNextWall_Z) + Script.Word.bike.OffsetForWalls)); //+2
                Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
                Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.Word.bike.PositionAgentTempX, 0.5, (Script.Word.bike.PostionForNextWall_Z + Script.Word.bike.PositionAgentTempZ) / 2); // +0.25
                Script.Word.bike.StartNewWallOnX = true;
            }
            if (Script.Word.bike.DirectionNumber == 2) {
                Script.Word.bike.OffsetForWalls = 1; // -0.25
            }
            if (Script.Word.bike.DirectionNumber == 0) {
                Script.Word.bike.OffsetForWalls = -1; //-0.25
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Word.bikeWallWord);
            Script.Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Script.Word.bike.mtxLocal.translation.x, 0.5, Script.Word.bike.mtxLocal.translation.z - 1));
            Script.Word.bike.PositionAgentTempX = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.Word.bike.PositionAgentTempZ = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Word.scaling.set(0.4, 0.5, Math.abs(Math.abs(Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Script.Word.bike.PostionForNextWall_Z) + Script.Word.bike.OffsetForWalls)); // +2
            Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
            Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Script.Word.bike.PositionAgentTempX, 0.5, (Script.Word.bike.PostionForNextWall_Z + Script.Word.bike.PositionAgentTempZ) / 2); // +0.25
            Script.Word.bike.StartNewWallOnX = true;
        }
        if (Script.Word.bike.ReadyToSetWall == true && Script.Word.bike.StartKey == true && Script.Word.bike.NumberOfWall % 2 == 1) { // % 2
            if (Script.Word.bike.StartNewWallOnX == true) {
                Matrix4x4Word.scaling.set(0.2, 0.5, 0.5);
                Script.Word.bike.PostionForNextWall_X = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Word.bike.StartNewWallOnX = false;
                Script.Word.bikeWallWord = new Script.BikeWallWord();
                Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Word.bikeWallWord);
                Script.Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Script.Word.bike.mtxLocal.translation.x, 0.5, Script.Word.bike.mtxLocal.translation.z - 1));
                Script.Word.bike.PositionAgentTempX = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                Script.Word.bike.PositionAgentTempZ = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
                Matrix4x4Word.scaling.set(Math.abs(Math.abs(Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.Word.bike.PostionForNextWall_X) + Script.Word.bike.OffsetForWalls), 0.5, 0.4);
                Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
                Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.Word.bike.PostionForNextWall_X + Script.Word.bike.PositionAgentTempX) / 2, 0.5, Script.Word.bike.PositionAgentTempZ); // X + 0.25
                Script.Word.bike.StartNewWallOnZ = true;
            }
            if (Script.Word.bike.DirectionNumber == 1) {
                Script.Word.bike.OffsetForWalls = 1; //bon 
            }
            if (Script.Word.bike.DirectionNumber == 3) {
                Script.Word.bike.OffsetForWalls = 1;
            }
            Script.graph.getChildrenByName("AllBikeWall")[0].addChild(Script.Word.bikeWallWord);
            Script.Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Script.Word.bike.mtxLocal.translation.x, 0.5, Script.Word.bike.mtxLocal.translation.z - 1));
            Script.Word.bike.PositionAgentTempX = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
            Script.Word.bike.PositionAgentTempZ = Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
            Matrix4x4Word.scaling.set(Math.abs(Math.abs(Script.Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Script.Word.bike.PostionForNextWall_X)) + Script.Word.bike.OffsetForWalls, 0.5, 0.4);
            Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
            Script.Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Script.Word.bike.PostionForNextWall_X + Script.Word.bike.PositionAgentTempX) / 2, 0.5, Script.Word.bike.PositionAgentTempZ); // X + 0.25
            Script.Word.bike.StartNewWallOnZ = true;
        }
        if (Script.Word.bike.ReadyToSetWall == false) {
            Script.Word.bike.NumberOfWall = Script.Word.bike.NumberOfWall + 1;
            Script.Word.bike.ReadyToSetWall = true;
        }
        let VitesseCam = 3;
        // Camera left turn
        if (RotationCameraTest_Left > 0) {
            camera.mtxLocal.rotateY(VitesseCam);
            TheChosenOne_Left = TheChosenOne_Left + VitesseCam;
            if (TheChosenOne_Left >= 90) {
                TheChosenOne_Left = 0;
                RotationCameraTest_Left = RotationCameraTest_Left - 1;
                if (RotationCameraTest_Left > 5) {
                    RotationCameraTest_Left = RotationCameraTest_Left - 4;
                }
            }
        }
        //---------- Camera right turn ----------
        if (RotationCameraTest_Right > 0) {
            camera.mtxLocal.rotateY(-VitesseCam);
            TheChosenOne_Right = TheChosenOne_Right + VitesseCam;
            if (TheChosenOne_Right >= 90) {
                TheChosenOne_Right = 0;
                RotationCameraTest_Right = RotationCameraTest_Right - 1;
                if (RotationCameraTest_Right > 5) {
                    RotationCameraTest_Right = RotationCameraTest_Right - 4;
                }
            }
        }
        //---------- Camera Adjustment ----------
        if (RotationCameraTest_Left == 0 && RotationCameraTest_Right == 0) {
            if (Math.abs(camera.mtxLocal.rotation.y % 90) < 5) {
                camera.mtxLocal.rotateY(-(camera.mtxLocal.rotation.y % 90));
                // truc a faire pour que ce soit plus doux 
            }
        }
        camera.mtxLocal.translation = Script.AgentBot.bike.mtxLocal.translation; // mtxWorld
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        //---------- Movement Managment ----------
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            Script.AgentBot.bike.StartKey = true;
            Script.OutlookBot.bike.StartKey = true;
            Script.Excel.bike.StartKey = true;
            Script.Word.bike.StartKey = true;
        }
        if (Script.AgentBot.bike.StartKey == true) {
            ctrForward.setInput(3 * deltaTime);
            Script.AgentBot.bike.mtxLocal.translateZ(ctrForward.getOutput());
            Script.OutlookBot.bike.mtxLocal.translateZ(ctrForward.getOutput());
            Script.Excel.bike.mtxLocal.translateZ(ctrForward.getOutput());
            Script.Word.bike.mtxLocal.translateZ(ctrForward.getOutput());
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true) {
                Script.AgentBot.bike.mtxLocal.rotateY(90);
                KeyStatus_Left = false;
                RotationCameraTest_Left = RotationCameraTest_Left + 1;
                Script.AgentBot.bike.ReadyToSetWall = false; // la
                Script.AgentBot.bike.DirectionNumber = Script.AgentBot.bike.DirectionNumber + 1;
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true) {
                Script.AgentBot.bike.mtxLocal.rotateY(-90);
                KeyStatus_Right = false;
                RotationCameraTest_Right = RotationCameraTest_Right + 1;
                Script.AgentBot.bike.ReadyToSetWall = false; // la
                Script.AgentBot.bike.DirectionNumber = Script.AgentBot.bike.DirectionNumber - 1;
            }
            if (Script.AgentBot.bike.DirectionNumber < 0) {
                Script.AgentBot.bike.DirectionNumber = 3;
            }
            if (Script.AgentBot.bike.DirectionNumber >= 4) {
                Script.AgentBot.bike.DirectionNumber = 0;
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
        if (Script.AgentBot.bike.mtxWorld.translation.x >= 249.5 || Script.AgentBot.bike.mtxWorld.translation.z >= 249.5 || Script.AgentBot.bike.mtxWorld.translation.x < 0 || Script.AgentBot.bike.mtxWorld.translation.z < 0) {
            Script.AgentBot.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
            Script.AgentBot.bike.StartKey = false;
        }
        if (Script.OutlookBot.bike.mtxWorld.translation.x >= 249.5 || Script.OutlookBot.bike.mtxWorld.translation.z >= 249.5 || Script.OutlookBot.bike.mtxWorld.translation.x < 0 || Script.OutlookBot.bike.mtxWorld.translation.z < 0) {
            //OutlookBot.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
            Script.OutlookBot.bike.StartKey = false;
            //graph.getChildrenByName("AllBikeWall")[0].removeChild(OutlookBot.bikeWallOutlook);
            Script.graph.getChildrenByName("PlayerList")[0].removeChild(Script.OutlookBot);
        }
        if (Script.Excel.bike.mtxWorld.translation.x >= 249.5 || Script.Excel.bike.mtxWorld.translation.z >= 249.5 || Script.Excel.bike.mtxWorld.translation.x < 0 || Script.Excel.bike.mtxWorld.translation.z < 0) {
            //Excel.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
            Script.Excel.bike.StartKey = false;
            //graph.getChildrenByName("AllBikeWall")[0].removeChild(Excel.bikeWallExcel);
            Script.graph.getChildrenByName("PlayerList")[0].removeChild(Script.Excel);
        }
        if (Script.Word.bike.mtxWorld.translation.x >= 249.5 || Script.Word.bike.mtxWorld.translation.z >= 249.5 || Script.Word.bike.mtxWorld.translation.x < 0 || Script.Word.bike.mtxWorld.translation.z < 0) {
            //Word.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
            Script.Word.bike.StartKey = false;
            Script.graph.getChildrenByName("PlayerList")[0].removeChild(Script.Word);
        }
        // Behaviour
        //Outlook
        if (Script.OutlookBot.bike.StartKey == true) {
            if (Script.OutlookBot.StartingBug < 15) {
                Script.OutlookBot.StartingBug = Script.OutlookBot.StartingBug + 1;
            }
            if (Script.OutlookBot.bike.AllesGutX == false && Script.OutlookBot.bike.AllesGutZ == false) {
                Script.OutlookBot.bike.AllesGutX = true;
                Script.OutlookBot.bike.AllesGutZ = true;
            }
            if ((Script.OutlookBot.bike.mtxWorld.translation.x <= 235 && Script.OutlookBot.bike.mtxWorld.translation.x > 15) && Script.OutlookBot.bike.AllesGutX == false) {
                Script.OutlookBot.bike.AllesGutX = true;
            }
            if ((Script.OutlookBot.bike.mtxWorld.translation.z <= 235 && Script.OutlookBot.bike.mtxWorld.translation.z > 15) && Script.OutlookBot.bike.AllesGutZ == false) {
                Script.OutlookBot.bike.AllesGutZ = true;
            }
            if ((Script.OutlookBot.bike.mtxWorld.translation.x >= 240 || Script.OutlookBot.bike.mtxWorld.translation.x < 10) && Script.OutlookBot.bike.AllesGutX == true) {
                let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
                if (OutlookOddsToLive > 80 || 1) {
                    Script.OutlookBot.bike.EmergencyTurnX = true;
                    Script.OutlookBot.bike.AllesGutX = false;
                }
            }
            if ((Script.OutlookBot.bike.mtxWorld.translation.z >= 240 || Script.OutlookBot.bike.mtxWorld.translation.z < 10) && Script.OutlookBot.bike.AllesGutZ == true) {
                let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
                if (OutlookOddsToLive > 80 || 1) {
                    Script.OutlookBot.bike.EmergencyTurnZ = true;
                    Script.OutlookBot.bike.AllesGutZ = false;
                }
            }
            Script.OutlookBot.bike.Odds = Math.floor(Math.random() * 10000) + 1;
            if (Script.OutlookBot.bike.EmergencyTurnZ == true) {
                Script.OutlookBot.bike.Odds = 1;
                Script.OutlookBot.bike.EmergencyTurnZ = false;
            }
            if (Script.OutlookBot.bike.EmergencyTurnX == true) {
                Script.OutlookBot.bike.Odds = 1;
                Script.OutlookBot.bike.EmergencyTurnX = false;
            }
            console.log(Script.OutlookBot.bike.Odds);
            if (Script.OutlookBot.bike.Odds < 40 && Script.OutlookBot.LeftTurnAvailable == true && Script.OutlookBot.bike.AllesGutX == true) {
                Script.turnLeft(Script.OutlookBot.bike);
                Script.OutlookBot.bike.ReadyToSetWall = false;
                Script.OutlookBot.LeftTurnAvailableCount = Script.OutlookBot.LeftTurnAvailableCount + 1;
                if (Script.OutlookBot.LeftTurnAvailableCount >= 2) {
                    Script.OutlookBot.LeftTurnAvailable = false;
                    Script.OutlookBot.LeftTurnAvailableCount = 0;
                }
                if (Script.OutlookBot.RightTurnAvailable == false) {
                    Script.OutlookBot.RightTurnAvailable = true;
                }
            }
            else if (Script.OutlookBot.bike.Odds > 9960 && Script.OutlookBot.RightTurnAvailable == true && Script.OutlookBot.bike.AllesGutZ == true || Script.OutlookBot.StartingBug == 10) {
                Script.turnRight(Script.OutlookBot.bike);
                Script.OutlookBot.bike.ReadyToSetWall = false;
                Script.OutlookBot.RightTurnAvailableCount = Script.OutlookBot.RightTurnAvailableCount + 1;
                if (Script.OutlookBot.RightTurnAvailableCount >= 2) {
                    Script.OutlookBot.RightTurnAvailable = false;
                    Script.OutlookBot.RightTurnAvailableCount = 0;
                }
                if (Script.OutlookBot.LeftTurnAvailable == false) {
                    Script.OutlookBot.LeftTurnAvailable = true;
                }
            }
        }
        Script.BehaviorBot(Script.Word);
        Script.BehaviorBot(Script.Excel);
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
            Directions[Directions["West"] = 3] = "West"; // 3
        })(Directions = SpawnPoint.Directions || (SpawnPoint.Directions = {}));
    })(SpawnPoint = Script.SpawnPoint || (Script.SpawnPoint = {}));
    Script.Lille = new SpawnPoint();
    Script.Lille.coordonates = new ƒ.Vector3(125, 0.5, 25); //125 0.5 25
    Script.Lille.orientation = new ƒ.Vector3(0, 0, 0);
    Script.Lille.direction = SpawnPoint.Directions.South;
    Script.Toulouse = new SpawnPoint();
    Script.Toulouse.coordonates = new ƒ.Vector3(125, 0.5, 225); //225
    Script.Toulouse.orientation = new ƒ.Vector3(0, 180, 0);
    Script.Toulouse.direction = SpawnPoint.Directions.North;
    Script.Lyon = new SpawnPoint();
    Script.Lyon.coordonates = new ƒ.Vector3(225, 0.5, 125);
    Script.Lyon.orientation = new ƒ.Vector3(0, -90, 0);
    Script.Lyon.direction = SpawnPoint.Directions.West;
    Script.Bordeaux = new SpawnPoint();
    Script.Bordeaux.coordonates = new ƒ.Vector3(25, 0.5, 125);
    Script.Bordeaux.orientation = new ƒ.Vector3(0, 90, 0);
    Script.Bordeaux.direction = SpawnPoint.Directions.East;
    function SetSpawnPoint(_bike, _spawnpoint) {
        _bike.mtxLocal.translation = _spawnpoint.coordonates;
        _bike.mtxLocal.rotation = _spawnpoint.orientation;
        _bike.Direction = _spawnpoint.direction;
        if (_bike.Direction == SpawnPoint.Directions.North) {
            _bike.DirectionNumber = 0;
        }
        if (_bike.Direction == SpawnPoint.Directions.South) {
            _bike.DirectionNumber = 2;
        }
        if (_bike.Direction == SpawnPoint.Directions.East) {
            _bike.DirectionNumber = 1;
        }
        if (_bike.Direction == SpawnPoint.Directions.West) {
            _bike.DirectionNumber = 3;
        }
    }
    Script.SetSpawnPoint = SetSpawnPoint;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map