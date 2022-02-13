namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  //test for camera 
  let camera: ƒ.Node = new ƒ.Node("cameraNode");
  let cmpCamera = new ƒ.ComponentCamera;
  
  let fps: number = 60;
  export let graph: ƒ.Node;
  
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 15, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);



  let RotationCameraTest_Left : number = 0;
  let TheChosenOne_Left : number = 1;
  let RotationCameraTest_Right : number = 0;
  let TheChosenOne_Right : number = -1;

  let Referee_Left: number = 0;
  let Referee2_Left: number = -1;
  let Referee_Right: number = 0;
  let Referee2_Right: number = -1;

  let KeyStatus_Left: Boolean = true;
  let KeyStatus_Right: Boolean = true;

  let Matrix4x4 = new ƒ.Matrix4x4();


  function start(_event: CustomEvent): void {
    
    viewport = _event.detail;
    viewport.calculateTransforms();
    graph = viewport.getBranch();
 
    SetBikeBot(AgentBot,Lille);
    graph.getChildrenByName("PlayerList")[0].addChild(AgentBot);
    AgentBot.bike = new Bike();
    AgentBot.addChild(AgentBot.bike);
    setUpBikeAppearance();
    SetSpawnPoint(AgentBot.bike, Lille);

    SetBikeBot(OutlookBot,Lyon);
    graph.getChildrenByName("PlayerList")[0].addChild(OutlookBot);
    OutlookBot.bike = new Bike();
    OutlookBot.addChild(OutlookBot.bike);
    setUpBikeAppearanceOutlook();
    SetSpawnPoint(OutlookBot.bike, Lyon);

    SetBikeBot(Excel,Toulouse);
    graph.getChildrenByName("PlayerList")[0].addChild(Excel);
    Excel.bike = new Bike();
    Excel.addChild(Excel.bike);
    setUpBikeAppearanceExcel();
    SetSpawnPoint(Excel.bike, Toulouse);

    SetBikeBot(Word,Bordeaux);
    graph.getChildrenByName("PlayerList")[0].addChild(Word);
    Word.bike = new Bike();
    Word.addChild(Word.bike);
    setUpBikeAppearanceWord();
    SetSpawnPoint(Word.bike, Bordeaux);


    cmpCamera.mtxPivot.translation = new ƒ.Vector3(-0,10,-30); // 0 10 -25
    cmpCamera.mtxPivot.rotation = new ƒ.Vector3(12.5,0,0);
    camera.addComponent(cmpCamera);
    camera.addComponent(new ƒ.ComponentTransform());
    graph.addChild(camera);
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps); 
  }

  // Other Functions 

  async function setUpBikeAppearance(): Promise<void> {
    let graphBike: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-12-26T12:21:36.268Z|87935"];
    AgentBot.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike));
  }

  async function setUpBikeAppearanceOutlook(): Promise<void> {
    let graphBike2: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2022-02-26T12:21:00.268Z|87935"];
    OutlookBot.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike2));
  }

  async function setUpBikeAppearanceExcel(): Promise<void> {
    let graphBike3: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2022-12-26T12:21:00.268Z|87935"];
    Excel.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike3));
  }

  async function setUpBikeAppearanceWord(): Promise<void> {
    let graphBike4: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2022-02-33T22:21:00.268Z|87935"];
    Word.bike.appendChild(await ƒ.Project.createGraphInstance(graphBike4));
  }
  
  

  function update(_event: Event): void {

    if(AgentBot.bike.ReadyToSetWall == true && AgentBot.bike.StartKey == true && AgentBot.bike.NumberOfWall % 2 == 0){ 
 
      if(AgentBot.bike.StartNewWallOnZ == true){
        AgentBot.bike.PostionForNextWall_Z  = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z ;
        AgentBot.bike.StartNewWallOnZ = false; 

        AgentBot.bikeWall = new BikeWall();
        graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall); 
        AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));
        AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
        Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(AgentBot.bike.PostionForNextWall_Z)-AgentBot.bike.OffsetForWalls));//+2
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(AgentBot.bike.PositionAgentTempX, 0.5, (AgentBot.bike.PostionForNextWall_Z + AgentBot.bike.PositionAgentTempZ)/2 - AgentBot.bike.OffsetForWalls ); // +0.25
        AgentBot.bike.StartNewWallOnX = true;   
      }

      if(AgentBot.bike.DirectionNumber == 2){
        AgentBot.bike.OffsetForWalls = 0.25;
      }

      if(AgentBot.bike.DirectionNumber == 0){
        AgentBot.bike.OffsetForWalls = -0.25;
      }

      graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall); 
      AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));
      AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
      Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(AgentBot.bike.PostionForNextWall_Z)-AgentBot.bike.OffsetForWalls)); // +2
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(AgentBot.bike.PositionAgentTempX, 0.5, (AgentBot.bike.PostionForNextWall_Z + AgentBot.bike.PositionAgentTempZ)/2 - AgentBot.bike.OffsetForWalls ); // +0.25
      AgentBot.bike.StartNewWallOnX = true;

    }

    

    if(AgentBot.bike.ReadyToSetWall == true && AgentBot.bike.StartKey == true && AgentBot.bike.NumberOfWall % 2 == 1){ // % 2

      if(AgentBot.bike.StartNewWallOnX == true){
        
        Matrix4x4.scaling.set(0.2, 0.5, 0.5);
        AgentBot.bike.PostionForNextWall_X  = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x ;
        AgentBot.bike.StartNewWallOnX = false;

        AgentBot.bikeWall = new BikeWall();
        graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall);
        AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));

        AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

        Matrix4x4.scaling.set(Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(AgentBot.bike.PostionForNextWall_X))+2, 0.5, 0.4);
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((AgentBot.bike.PostionForNextWall_X + AgentBot.bike.PositionAgentTempX)/2 - AgentBot.bike.OffsetForWalls , 0.5, AgentBot.bike.PositionAgentTempZ); // X + 0.25

        AgentBot.bike.StartNewWallOnZ = true ;
      }

      if(AgentBot.bike.DirectionNumber == 1){
        AgentBot.bike.OffsetForWalls = -0.25; //bon 
      }

      if(AgentBot.bike.DirectionNumber == 3){
        AgentBot.bike.OffsetForWalls = -0.25;
      }

      
      graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall);
      AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));

      AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4.scaling.set(Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(AgentBot.bike.PostionForNextWall_X))+2, 0.5, 0.4);
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((AgentBot.bike.PostionForNextWall_X + AgentBot.bike.PositionAgentTempX)/2 -AgentBot.bike.OffsetForWalls , 0.5, AgentBot.bike.PositionAgentTempZ); // X + 0.25

      AgentBot.bike.StartNewWallOnZ = true ;
    }

    if(AgentBot.bike.ReadyToSetWall == false){
      AgentBot.bike.NumberOfWall = AgentBot.bike.NumberOfWall + 1;
      AgentBot.bike.ReadyToSetWall = true;
    }
    
    let VitesseCam : number = 5;
    // Camera left turn
    if(RotationCameraTest_Left > 0 ){
      camera.mtxLocal.rotateY(VitesseCam );
      TheChosenOne_Left = TheChosenOne_Left + VitesseCam;
      if (TheChosenOne_Left >= 90){
        TheChosenOne_Left = 0;
        RotationCameraTest_Left = RotationCameraTest_Left - 1;
        if(RotationCameraTest_Left > 5){
          RotationCameraTest_Left = RotationCameraTest_Left - 4;
        }
      } 
    }
    //---------- Camera right turn ----------
    if(RotationCameraTest_Right > 0 ){
      camera.mtxLocal.rotateY(-VitesseCam);
      TheChosenOne_Right = TheChosenOne_Right + VitesseCam;
      if (TheChosenOne_Right >= 90){
        TheChosenOne_Right = 0;
        RotationCameraTest_Right = RotationCameraTest_Right - 1;
        if(RotationCameraTest_Right > 5){
          RotationCameraTest_Right = RotationCameraTest_Right - 4;
        }
      } 
    }
    //---------- Camera Adjustment ----------
    if(RotationCameraTest_Left == 0 && RotationCameraTest_Right == 0 ){
      if(Math.abs(camera.mtxLocal.rotation.y % 90) < 5 ){
        camera.mtxLocal.rotateY(-(camera.mtxLocal.rotation.y % 90));
        // truc a faire pour que ce soit plus doux 
      }  
    }
    camera.mtxLocal.translation = AgentBot.bike.mtxLocal.translation; // mtxWorld
  
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    
    //---------- Movement Managment ----------

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])){   
      AgentBot.bike.StartKey = true;
    }
    if(AgentBot.bike.StartKey == true ){
      ctrForward.setInput(3 * deltaTime);
      AgentBot.bike.mtxLocal.translateZ(ctrForward.getOutput());
      //OutlookBot.bike.mtxLocal.translateZ(ctrForward.getOutput()); 

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true ){
        AgentBot.bike.mtxLocal.rotateY(90); 
        KeyStatus_Left = false;
        RotationCameraTest_Left = RotationCameraTest_Left + 1;
        AgentBot.bike.ReadyToSetWall = false; // la
        AgentBot.bike.DirectionNumber = AgentBot.bike.DirectionNumber + 1;
      }
          
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true){
        AgentBot.bike.mtxLocal.rotateY(-90);
        KeyStatus_Right = false;
        RotationCameraTest_Right = RotationCameraTest_Right + 1;
        AgentBot.bike.ReadyToSetWall = false; // la
        AgentBot.bike.DirectionNumber = AgentBot.bike.DirectionNumber - 1;
      }

      if(AgentBot.bike.DirectionNumber<0){
        AgentBot.bike.DirectionNumber = 3
      }
      if(AgentBot.bike.DirectionNumber >= 4){
        AgentBot.bike.DirectionNumber = 0
      }
      console.log(AgentBot.bike.DirectionNumber);
  
      //---------- Referee is there to control the keyup and keydown ----------
      Referee2_Left = Referee_Left;
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])){ 
        Referee_Left = Referee_Left + 1;
      }
      if(Referee2_Left == Referee_Left){
        KeyStatus_Left = true;
      }
      if (Referee_Left > 200 ){
        Referee_Left = 0;
        Referee2_Left = -1;
      }
  
      Referee2_Right = Referee_Right;
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])){ 
        Referee_Right = Referee_Right + 1;
      }
      if(Referee2_Right == Referee_Right){
        KeyStatus_Right = true;
      }
      if (Referee_Right > 200 ){
        Referee_Right = 0;
        Referee2_Right = -1;
      }
    } 

    //---------- End of Movement Managment ----------

    if(AgentBot.bike.mtxWorld.translation.x >= 249.5 || AgentBot.bike.mtxWorld.translation.z >= 249.5 || AgentBot.bike.mtxWorld.translation.x < 0 || AgentBot.bike.mtxWorld.translation.z < 0){
      AgentBot.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
      AgentBot.bike.StartKey = false;
    }

    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}


// if(AgentBot.bike.ReadyToSetWall == true && AgentBot.bike.StartKey == true && AgentBot.bike.NumberOfWall % 2 == 0){ 
 
//   if(AgentBot.bike.StartNewWallOnZ == true){
//     AgentBot.bike.PostionForNextWall_Z  = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z ;
//     AgentBot.bike.StartNewWallOnZ = false;    
//   }

//   if(AgentBot.bike.DirectionNumber == 2){
//     AgentBot.bike.OffsetForWalls = -0.5;
//   }

//   if(AgentBot.bike.DirectionNumber == 0){
//     AgentBot.bike.OffsetForWalls = 0.5;
//   }

//   AgentBot.bikeWall = new BikeWall();
//   graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall); 
//   AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));
//   AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
//   AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
//   Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(AgentBot.bike.PostionForNextWall_Z))+2);
//   AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
//   AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(AgentBot.bike.PositionAgentTempX, 0.5, (AgentBot.bike.PostionForNextWall_Z + AgentBot.bike.PositionAgentTempZ)/2 - AgentBot.bike.OffsetForWalls ); // +0.25
//   AgentBot.bike.StartNewWallOnX = true;

// }