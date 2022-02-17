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
  
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 12.5, ƒ.CONTROL_TYPE.PROPORTIONAL);
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
  let Matrix4x4Outlook = new ƒ.Matrix4x4();
  let Matrix4x4Excel = new ƒ.Matrix4x4();
  let Matrix4x4Word = new ƒ.Matrix4x4();


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
    turnLeft(OutlookBot.bike);
    //OutlookBot.bike.NumberOfWall = OutlookBot.bike.NumberOfWall +1;

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
    turnRight(Word.bike);


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
        Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(AgentBot.bike.PostionForNextWall_Z) + AgentBot.bike.OffsetForWalls));//+2
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(AgentBot.bike.PositionAgentTempX, 0.5, (AgentBot.bike.PostionForNextWall_Z + AgentBot.bike.PositionAgentTempZ)/2 ); // +0.25
        AgentBot.bike.StartNewWallOnX = true;   
      }

      if(AgentBot.bike.DirectionNumber == 2){
        AgentBot.bike.OffsetForWalls = 1; // -0.25
      }

      if(AgentBot.bike.DirectionNumber == 0){
        AgentBot.bike.OffsetForWalls = -1; //-0.25
      }

      graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall); 
      AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));
      AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
      Matrix4x4.scaling.set(0.4, 0.5, Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(AgentBot.bike.PostionForNextWall_Z)+AgentBot.bike.OffsetForWalls)); // +2
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(AgentBot.bike.PositionAgentTempX, 0.5, (AgentBot.bike.PostionForNextWall_Z + AgentBot.bike.PositionAgentTempZ)/2 ); // +0.25
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

        Matrix4x4.scaling.set(Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(AgentBot.bike.PostionForNextWall_X)+AgentBot.bike.OffsetForWalls), 0.5, 0.4);
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
        AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((AgentBot.bike.PostionForNextWall_X + AgentBot.bike.PositionAgentTempX)/2 , 0.5, AgentBot.bike.PositionAgentTempZ); // X + 0.25

        AgentBot.bike.StartNewWallOnZ = true ;
      }

      if(AgentBot.bike.DirectionNumber == 1){
        AgentBot.bike.OffsetForWalls = 1; //bon 
      }

      if(AgentBot.bike.DirectionNumber == 3){
        AgentBot.bike.OffsetForWalls = 1;
      }

      
      graph.getChildrenByName("AllBikeWall")[0].addChild(AgentBot.bikeWall);
      AgentBot.bikeWall.mtxLocal.translate(new ƒ.Vector3(AgentBot.bike.mtxLocal.translation.x , 0.5, AgentBot.bike.mtxLocal.translation.z -1));

      AgentBot.bike.PositionAgentTempX = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      AgentBot.bike.PositionAgentTempZ = AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4.scaling.set(Math.abs(Math.abs(AgentBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(AgentBot.bike.PostionForNextWall_X))+AgentBot.bike.OffsetForWalls, 0.5, 0.4);
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
      AgentBot.bikeWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((AgentBot.bike.PostionForNextWall_X + AgentBot.bike.PositionAgentTempX)/2, 0.5, AgentBot.bike.PositionAgentTempZ); // X + 0.25

      AgentBot.bike.StartNewWallOnZ = true ;
    }

    if(AgentBot.bike.ReadyToSetWall == false){
      AgentBot.bike.NumberOfWall = AgentBot.bike.NumberOfWall + 1;
      AgentBot.bike.ReadyToSetWall = true;
    }

    // Wall OutlookBot

    
    if(OutlookBot.bike.ReadyToSetWall == true && OutlookBot.bike.StartKey == true && OutlookBot.bike.NumberOfWall % 2 == 0){ 
 
      if(OutlookBot.bike.StartNewWallOnZ == true){
        OutlookBot.bike.PostionForNextWall_Z  = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z ;
        OutlookBot.bike.StartNewWallOnZ = false; 

        OutlookBot.bikeWallOutlook = new BikeWallOutlook();
        graph.getChildrenByName("AllBikeWall")[0].addChild(OutlookBot.bikeWallOutlook); 
        OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(OutlookBot.bike.mtxLocal.translation.x , 0.5, OutlookBot.bike.mtxLocal.translation.z -1));
        OutlookBot.bike.PositionAgentTempX = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        OutlookBot.bike.PositionAgentTempZ = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
        Matrix4x4Outlook.scaling.set(0.4, 0.5, Math.abs(Math.abs(OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(OutlookBot.bike.PostionForNextWall_Z) + OutlookBot.bike.OffsetForWalls));//+2
        OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
        OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(OutlookBot.bike.PositionAgentTempX, 0.5, (OutlookBot.bike.PostionForNextWall_Z + OutlookBot.bike.PositionAgentTempZ)/2 ); // +0.25
        OutlookBot.bike.StartNewWallOnX = true;   
      }

      if(OutlookBot.bike.DirectionNumber == 2){
        OutlookBot.bike.OffsetForWalls = 1; // -0.25
      }

      if(OutlookBot.bike.DirectionNumber == 0){
        OutlookBot.bike.OffsetForWalls = -1; //-0.25
      }

      graph.getChildrenByName("AllBikeWall")[0].addChild(OutlookBot.bikeWallOutlook); 
      OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(OutlookBot.bike.mtxLocal.translation.x , 0.5, OutlookBot.bike.mtxLocal.translation.z -1));
      OutlookBot.bike.PositionAgentTempX = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      OutlookBot.bike.PositionAgentTempZ = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
      Matrix4x4Outlook.scaling.set(0.4, 0.5, Math.abs(Math.abs(OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(OutlookBot.bike.PostionForNextWall_Z)+OutlookBot.bike.OffsetForWalls)); // +2
      OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
      OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(OutlookBot.bike.PositionAgentTempX, 0.5, (OutlookBot.bike.PostionForNextWall_Z + OutlookBot.bike.PositionAgentTempZ)/2 ); // +0.25
      OutlookBot.bike.StartNewWallOnX = true;

    }

    if(OutlookBot.bike.ReadyToSetWall == true && OutlookBot.bike.StartKey == true && OutlookBot.bike.NumberOfWall % 2 == 1){ // % 2

      if(OutlookBot.bike.StartNewWallOnX == true){
        
        Matrix4x4Outlook.scaling.set(0.2, 0.5, 0.5);
        OutlookBot.bike.PostionForNextWall_X  = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x ;
        OutlookBot.bike.StartNewWallOnX = false;

        OutlookBot.bikeWallOutlook = new BikeWallOutlook();
        graph.getChildrenByName("AllBikeWall")[0].addChild(OutlookBot.bikeWallOutlook);
        OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(OutlookBot.bike.mtxLocal.translation.x , 0.5, OutlookBot.bike.mtxLocal.translation.z -1));

        OutlookBot.bike.PositionAgentTempX = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        OutlookBot.bike.PositionAgentTempZ = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

        Matrix4x4Outlook.scaling.set(Math.abs(Math.abs(OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(OutlookBot.bike.PostionForNextWall_X)+OutlookBot.bike.OffsetForWalls), 0.5, 0.4);
        OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
        OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((OutlookBot.bike.PostionForNextWall_X + OutlookBot.bike.PositionAgentTempX)/2 , 0.5, OutlookBot.bike.PositionAgentTempZ); // X + 0.25

        OutlookBot.bike.StartNewWallOnZ = true ;
      }

      if(OutlookBot.bike.DirectionNumber == 1){
        OutlookBot.bike.OffsetForWalls = 1; //bon 
      }

      if(OutlookBot.bike.DirectionNumber == 3){
        OutlookBot.bike.OffsetForWalls = 1;
      }

      
      graph.getChildrenByName("AllBikeWall")[0].addChild(OutlookBot.bikeWallOutlook);
      OutlookBot.bikeWallOutlook.mtxLocal.translate(new ƒ.Vector3(OutlookBot.bike.mtxLocal.translation.x , 0.5, OutlookBot.bike.mtxLocal.translation.z -1));

      OutlookBot.bike.PositionAgentTempX = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      OutlookBot.bike.PositionAgentTempZ = OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4Outlook.scaling.set(Math.abs(Math.abs(OutlookBot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(OutlookBot.bike.PostionForNextWall_X))+OutlookBot.bike.OffsetForWalls, 0.5, 0.4);
      OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Outlook.scaling;
      OutlookBot.bikeWallOutlook.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((OutlookBot.bike.PostionForNextWall_X + OutlookBot.bike.PositionAgentTempX)/2, 0.5, OutlookBot.bike.PositionAgentTempZ); // X + 0.25

      OutlookBot.bike.StartNewWallOnZ = true ;
    }

    if(OutlookBot.bike.ReadyToSetWall == false){
      OutlookBot.bike.NumberOfWall = OutlookBot.bike.NumberOfWall + 1;
      OutlookBot.bike.ReadyToSetWall = true;
    }

    // Wall Excel

    
    if(Excel.bike.ReadyToSetWall == true && Excel.bike.StartKey == true && Excel.bike.NumberOfWall % 2 == 0){ 
 
      if(Excel.bike.StartNewWallOnZ == true){
        Excel.bike.PostionForNextWall_Z  = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z ;
        Excel.bike.StartNewWallOnZ = false; 

        Excel.bikeWallExcel = new BikeWallExcel();
        graph.getChildrenByName("AllBikeWall")[0].addChild(Excel.bikeWallExcel); 
        Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Excel.bike.mtxLocal.translation.x , 0.5, Excel.bike.mtxLocal.translation.z -1));
        Excel.bike.PositionAgentTempX = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        Excel.bike.PositionAgentTempZ = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
        Matrix4x4Excel.scaling.set(0.4, 0.5, Math.abs(Math.abs(Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Excel.bike.PostionForNextWall_Z) + Excel.bike.OffsetForWalls));//+2
        Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
        Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Excel.bike.PositionAgentTempX, 0.5, (Excel.bike.PostionForNextWall_Z + Excel.bike.PositionAgentTempZ)/2 ); // +0.25
        Excel.bike.StartNewWallOnX = true;   
      }

      if(Excel.bike.DirectionNumber == 2){
        Excel.bike.OffsetForWalls = 1; // -0.25
      }

      if(Excel.bike.DirectionNumber == 0){
        Excel.bike.OffsetForWalls = -1; //-0.25
      }

      graph.getChildrenByName("AllBikeWall")[0].addChild(Excel.bikeWallExcel); 
      Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Excel.bike.mtxLocal.translation.x , 0.5, Excel.bike.mtxLocal.translation.z -1));
      Excel.bike.PositionAgentTempX = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      Excel.bike.PositionAgentTempZ = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
      Matrix4x4Excel.scaling.set(0.4, 0.5, Math.abs(Math.abs(Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Excel.bike.PostionForNextWall_Z)+Excel.bike.OffsetForWalls)); // +2
      Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
      Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Excel.bike.PositionAgentTempX, 0.5, (Excel.bike.PostionForNextWall_Z + Excel.bike.PositionAgentTempZ)/2 ); // +0.25
      Excel.bike.StartNewWallOnX = true;

    }

    if(Excel.bike.ReadyToSetWall == true && Excel.bike.StartKey == true && Excel.bike.NumberOfWall % 2 == 1){ // % 2

      if(Excel.bike.StartNewWallOnX == true){
        
        Matrix4x4Excel.scaling.set(0.2, 0.5, 0.5);
        Excel.bike.PostionForNextWall_X  = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x ;
        Excel.bike.StartNewWallOnX = false;

        Excel.bikeWallExcel = new BikeWallExcel();
        graph.getChildrenByName("AllBikeWall")[0].addChild(Excel.bikeWallExcel);
        Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Excel.bike.mtxLocal.translation.x , 0.5, Excel.bike.mtxLocal.translation.z -1));

        Excel.bike.PositionAgentTempX = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        Excel.bike.PositionAgentTempZ = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

        Matrix4x4Excel.scaling.set(Math.abs(Math.abs(Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Excel.bike.PostionForNextWall_X)+Excel.bike.OffsetForWalls), 0.5, 0.4);
        Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
        Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Excel.bike.PostionForNextWall_X + Excel.bike.PositionAgentTempX)/2 , 0.5, Excel.bike.PositionAgentTempZ); // X + 0.25

        Excel.bike.StartNewWallOnZ = true ;
      }

      if(Excel.bike.DirectionNumber == 1){
        Excel.bike.OffsetForWalls = 1; //bon 
      }

      if(Excel.bike.DirectionNumber == 3){
        Excel.bike.OffsetForWalls = 1;
      }

      
      graph.getChildrenByName("AllBikeWall")[0].addChild(Excel.bikeWallExcel);
      Excel.bikeWallExcel.mtxLocal.translate(new ƒ.Vector3(Excel.bike.mtxLocal.translation.x , 0.5, Excel.bike.mtxLocal.translation.z -1));

      Excel.bike.PositionAgentTempX = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      Excel.bike.PositionAgentTempZ = Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4Excel.scaling.set(Math.abs(Math.abs(Excel.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Excel.bike.PostionForNextWall_X))+Excel.bike.OffsetForWalls, 0.5, 0.4);
      Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Excel.scaling;
      Excel.bikeWallExcel.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Excel.bike.PostionForNextWall_X + Excel.bike.PositionAgentTempX)/2, 0.5, Excel.bike.PositionAgentTempZ); // X + 0.25

      Excel.bike.StartNewWallOnZ = true ;
    }

    if(Excel.bike.ReadyToSetWall == false){
      Excel.bike.NumberOfWall = Excel.bike.NumberOfWall + 1;
      Excel.bike.ReadyToSetWall = true;
    }
    // Wall Word
    if(Word.bike.ReadyToSetWall == true && Word.bike.StartKey == true && Word.bike.NumberOfWall % 2 == 0){ 
 
      if(Word.bike.StartNewWallOnZ == true){
        Word.bike.PostionForNextWall_Z  = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z ;
        Word.bike.StartNewWallOnZ = false; 

        Word.bikeWallWord = new BikeWallWord();
        graph.getChildrenByName("AllBikeWall")[0].addChild(Word.bikeWallWord); 
        Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Word.bike.mtxLocal.translation.x , 0.5, Word.bike.mtxLocal.translation.z -1));
        Word.bike.PositionAgentTempX = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        Word.bike.PositionAgentTempZ = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
        Matrix4x4Word.scaling.set(0.4, 0.5, Math.abs(Math.abs(Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Word.bike.PostionForNextWall_Z) + Word.bike.OffsetForWalls));//+2
        Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
        Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Word.bike.PositionAgentTempX, 0.5, (Word.bike.PostionForNextWall_Z + Word.bike.PositionAgentTempZ)/2 ); // +0.25
        Word.bike.StartNewWallOnX = true;   
      }

      if(Word.bike.DirectionNumber == 2){
        Word.bike.OffsetForWalls = 1; // -0.25
      }

      if(Word.bike.DirectionNumber == 0){
        Word.bike.OffsetForWalls = -1; //-0.25
      }

      graph.getChildrenByName("AllBikeWall")[0].addChild(Word.bikeWallWord); 
      Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Word.bike.mtxLocal.translation.x , 0.5, Word.bike.mtxLocal.translation.z -1));
      Word.bike.PositionAgentTempX = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      Word.bike.PositionAgentTempZ = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;
      Matrix4x4Word.scaling.set(0.4, 0.5, Math.abs(Math.abs(Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z) - Math.abs(Word.bike.PostionForNextWall_Z)+Word.bike.OffsetForWalls)); // +2
      Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
      Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(Word.bike.PositionAgentTempX, 0.5, (Word.bike.PostionForNextWall_Z + Word.bike.PositionAgentTempZ)/2 ); // +0.25
      Word.bike.StartNewWallOnX = true;

    }

    if(Word.bike.ReadyToSetWall == true && Word.bike.StartKey == true && Word.bike.NumberOfWall % 2 == 1){ // % 2

      if(Word.bike.StartNewWallOnX == true){
        
        Matrix4x4Word.scaling.set(0.2, 0.5, 0.5);
        Word.bike.PostionForNextWall_X  = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x ;
        Word.bike.StartNewWallOnX = false;

        Word.bikeWallWord = new BikeWallWord();
        graph.getChildrenByName("AllBikeWall")[0].addChild(Word.bikeWallWord);
        Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Word.bike.mtxLocal.translation.x , 0.5, Word.bike.mtxLocal.translation.z -1));

        Word.bike.PositionAgentTempX = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
        Word.bike.PositionAgentTempZ = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

        Matrix4x4Word.scaling.set(Math.abs(Math.abs(Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Word.bike.PostionForNextWall_X)+Word.bike.OffsetForWalls), 0.5, 0.4);
        Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
        Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Word.bike.PostionForNextWall_X + Word.bike.PositionAgentTempX)/2 , 0.5, Word.bike.PositionAgentTempZ); // X + 0.25

        Word.bike.StartNewWallOnZ = true ;
      }

      if(Word.bike.DirectionNumber == 1){
        Word.bike.OffsetForWalls = 1; //bon 
      }

      if(Word.bike.DirectionNumber == 3){
        Word.bike.OffsetForWalls = 1;
      }

      
      graph.getChildrenByName("AllBikeWall")[0].addChild(Word.bikeWallWord);
      Word.bikeWallWord.mtxLocal.translate(new ƒ.Vector3(Word.bike.mtxLocal.translation.x , 0.5, Word.bike.mtxLocal.translation.z -1));

      Word.bike.PositionAgentTempX = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      Word.bike.PositionAgentTempZ = Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4Word.scaling.set(Math.abs(Math.abs(Word.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x) - Math.abs(Word.bike.PostionForNextWall_X))+Word.bike.OffsetForWalls, 0.5, 0.4);
      Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4Word.scaling;
      Word.bikeWallWord.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3((Word.bike.PostionForNextWall_X + Word.bike.PositionAgentTempX)/2, 0.5, Word.bike.PositionAgentTempZ); // X + 0.25

      Word.bike.StartNewWallOnZ = true ;
    }

    if(Word.bike.ReadyToSetWall == false){
      Word.bike.NumberOfWall = Word.bike.NumberOfWall + 1;
      Word.bike.ReadyToSetWall = true;
    }
    
    let VitesseCam : number = 3;
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
      OutlookBot.bike.StartKey = true;
      Excel.bike.StartKey = true;
      Word.bike.StartKey = true;

    }
    if(AgentBot.bike.StartKey == true ){
      ctrForward.setInput(3 * deltaTime);
      AgentBot.bike.mtxLocal.translateZ(ctrForward.getOutput());
      OutlookBot.bike.mtxLocal.translateZ(ctrForward.getOutput());
      Excel.bike.mtxLocal.translateZ(ctrForward.getOutput());
      Word.bike.mtxLocal.translateZ(ctrForward.getOutput()); 

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

    if(OutlookBot.bike.mtxWorld.translation.x >= 249.5 || OutlookBot.bike.mtxWorld.translation.z >= 249.5 || OutlookBot.bike.mtxWorld.translation.x < 0 || OutlookBot.bike.mtxWorld.translation.z < 0){
      OutlookBot.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
    }

    if(Excel.bike.mtxWorld.translation.x >= 249.5 || Excel.bike.mtxWorld.translation.z >= 249.5 || Excel.bike.mtxWorld.translation.x < 0 || Excel.bike.mtxWorld.translation.z < 0){
      Excel.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
    }

    if(Word.bike.mtxWorld.translation.x >= 249.5 || Word.bike.mtxWorld.translation.z >= 249.5 || Word.bike.mtxWorld.translation.x < 0 || Word.bike.mtxWorld.translation.z < 0){
      Word.bike.mtxLocal.translation = new ƒ.Vector3(125, 0.5, 125);
    }

    // Behaviour

    //Outlook
    if (OutlookBot.bike.StartKey == true){

      if(OutlookBot.StartingBug < 15){
        OutlookBot.StartingBug = OutlookBot.StartingBug + 1;
      }
      if(OutlookBot.bike.AllesGutX == false && OutlookBot.bike.AllesGutZ == false){
        OutlookBot.bike.AllesGutX = true;
        OutlookBot.bike.AllesGutZ = true;
      }
      
      if((OutlookBot.bike.mtxWorld.translation.x <= 235 && OutlookBot.bike.mtxWorld.translation.x > 15) && OutlookBot.bike.AllesGutX == false){
        OutlookBot.bike.AllesGutX = true;
      }

      if((OutlookBot.bike.mtxWorld.translation.z <= 235 && OutlookBot.bike.mtxWorld.translation.z > 15) && OutlookBot.bike.AllesGutZ == false){
        OutlookBot.bike.AllesGutZ = true;
      }

      if((OutlookBot.bike.mtxWorld.translation.x >= 240 || OutlookBot.bike.mtxWorld.translation.x < 10)&&OutlookBot.bike.AllesGutX == true){
        let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
        if(OutlookOddsToLive > 80 || 1){
          OutlookBot.bike.EmergencyTurnX = true;
          OutlookBot.bike.AllesGutX = false;
          console.log("oui1");
        }
      }
      if((OutlookBot.bike.mtxWorld.translation.z >= 240 || OutlookBot.bike.mtxWorld.translation.z < 10) && OutlookBot.bike.AllesGutZ == true){
        let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
        if(OutlookOddsToLive > 80 || 1){
          OutlookBot.bike.EmergencyTurnZ = true;
          OutlookBot.bike.AllesGutZ = false;
          console.log("oui2");
        }
      }

      OutlookBot.bike.Odds = Math.floor(Math.random() * 10000) + 1;

      if(OutlookBot.bike.EmergencyTurnZ == true){
        OutlookBot.bike.Odds = 1;
        OutlookBot.bike.EmergencyTurnZ = false;
      }
      if(OutlookBot.bike.EmergencyTurnX == true){
        OutlookBot.bike.Odds = 1;
        OutlookBot.bike.EmergencyTurnX = false;
      }
      console.log(OutlookBot.bike.Odds);

      if(OutlookBot.bike.Odds < 40 && OutlookBot.LeftTurnAvailable == true && OutlookBot.bike.AllesGutX == true){
        turnLeft(OutlookBot.bike);
        OutlookBot.bike.ReadyToSetWall = false;
        OutlookBot.LeftTurnAvailableCount = OutlookBot.LeftTurnAvailableCount +1;
        if(OutlookBot.LeftTurnAvailableCount >= 2){
          OutlookBot.LeftTurnAvailable = false;
          OutlookBot.LeftTurnAvailableCount = 0;
        }
        if(OutlookBot.RightTurnAvailable == false){
          OutlookBot.RightTurnAvailable = true;
        }
      }

      else if(OutlookBot.bike.Odds > 9960 && OutlookBot.RightTurnAvailable == true && OutlookBot.bike.AllesGutZ == true || OutlookBot.StartingBug == 10){
        turnRight(OutlookBot.bike);
        OutlookBot.bike.ReadyToSetWall = false;
        OutlookBot.RightTurnAvailableCount = OutlookBot.RightTurnAvailableCount +1;
        if(OutlookBot.RightTurnAvailableCount >= 2){
          OutlookBot.RightTurnAvailable = false;
          OutlookBot.RightTurnAvailableCount = 0;
        }
        if(OutlookBot.LeftTurnAvailable == false){
          OutlookBot.LeftTurnAvailable = true;
        }
      }
      

      
    }
    BehaviorBot(Word);
    BehaviorBot(Excel);
  
  
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}