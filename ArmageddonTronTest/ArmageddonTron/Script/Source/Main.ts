namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  //test for camera 
  let camera: ƒ.Node = new ƒ.Node("cameraNode");
  let cmpCamera = new ƒ.ComponentCamera;

  let fps: number = 60;
  let graph: ƒ.Node;
  let agent: Bike;
  let agentWall: BikeWall;
  let agentWall2: BikeWall;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);

  let Outlook: Bike;
  //let OutlookStart : boolean = false;
  // let PowerPoint: Bike;
  // let Word: Bike;
  // let Excel: Bike;

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
  let StartKey: Boolean = false;
  
  let NewWall: Boolean = true;
  let SetWall: boolean = true;
  //let WallVectorZ = new ƒ.Vector3(0.2,0.75,1);
  let CountWall:number = 0;

  let Matrix4x4 = new ƒ.Matrix4x4();
  let Matrix4x4_2 = new ƒ.Matrix4x4();






  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.calculateTransforms();
    graph = viewport.getBranch();
    
    agent = new Bike();
    



    








    graph.getChildrenByName("Bike")[0].addChild(agent);
    agent.addComponent(new ƒ.ComponentMaterial(
      new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
    );


    //graph.addChild(AllBikeWall);
    agentWall = new BikeWall();
    graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
    agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x , 0.5, agent.mtxLocal.translation.z - 1));
    agentWall2 = new BikeWall();
    graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall2);
    

    Outlook = new Bike();
    graph.getChildrenByName("Bike")[0].addChild(Outlook);
    Outlook.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 30));    
    Outlook.addComponent(new ƒ.ComponentMaterial(
      new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 1, 1))))
    );

    cmpCamera.mtxPivot.translation = new ƒ.Vector3(0,10,-25); // 0 8 -12
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


  function update(_event: Event): void {

    let PositionAgentTempX_memorie :number;
    let PositionAgentTempZ_memorie :number;

    if(SetWall == true && StartKey == true && CountWall  == 0){ // % 2 == 0
      // if( NewWall == true){

        
        
      //   graph.getChildrenByName("AllBikeWall")[CountWall].addChild(agentWall);
      //   graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
      //   agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x , 0.5, agent.mtxLocal.translation.z - 1));
      //   NewWall = false;
        
      // }

      let PositionAgentTempX : number = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
      let PositionAgentTempZ : number = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z/2;

      Matrix4x4.scaling.set(0.2, 0.5, agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z+0.5);
      agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4.scaling;
      agentWall.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(PositionAgentTempX, 0.5, PositionAgentTempZ+0.25);
      PositionAgentTempZ_memorie = PositionAgentTempZ;
      
    }
    console.log(PositionAgentTempZ_memorie);
    if(SetWall == true && StartKey == true && CountWall  == 1){ // % 2

      // if( NewWall == true){

      //   let CountWall : ƒ.Node ;
      //   agentWall = new BikeWall();
      //   graph.getChildrenByName("AllBikeWall")[0].addChild(CountWall);
      //   graph.getChildrenByName("AllBikeWall")[0].addChild(agentWall);
      //   agentWall.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x , 0.5, agent.mtxLocal.translation.z - 1));
      //   NewWall = false;
      // }

      let PositionAgentTempX : number = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x/2;
      let PositionAgentTempZ : number = agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z;

      Matrix4x4_2.scaling.set(0.2, 0.5, agent.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x+0.5);
      agentWall2.getComponent(ƒ.ComponentTransform).mtxLocal.scaling = Matrix4x4_2.scaling;
      agentWall2.getComponent(ƒ.ComponentTransform).mtxLocal.rotation.y = 90;
      agentWall2.getComponent(ƒ.ComponentTransform).mtxLocal.translation = new ƒ.Vector3(PositionAgentTempX+0.25, 0.5, PositionAgentTempZ);
      //agentWall2.mtxLocal.translate(new ƒ.Vector3(agent.mtxLocal.translation.x , 0.5, agent.mtxLocal.translation.z - 1));
    }
    if(SetWall == false){
      CountWall = CountWall + 1;
      SetWall = true;
      NewWall = true;
    }
    
    // Camera left turn
    if(RotationCameraTest_Left > 0 ){
      camera.mtxLocal.rotateY(3);
      TheChosenOne_Left = TheChosenOne_Left + 3;
      if (TheChosenOne_Left >= 90){
        TheChosenOne_Left = 0;
        RotationCameraTest_Left = RotationCameraTest_Left - 1;
      } 
    }
    //---------- Camera right turn ----------
    if(RotationCameraTest_Right > 0 ){
      camera.mtxLocal.rotateY(-3);
      TheChosenOne_Right = TheChosenOne_Right + 3;
      if (TheChosenOne_Right >= 90){
        TheChosenOne_Right = 0;
        RotationCameraTest_Right = RotationCameraTest_Right - 1;
      } 
    }
    //---------- Camera Adjustment ----------
    if(RotationCameraTest_Left == 0 && RotationCameraTest_Right == 0 ){
      if(Math.abs(camera.mtxLocal.rotation.y % 90) < 5 ){
        camera.mtxLocal.rotateY(-(camera.mtxLocal.rotation.y % 90));
        // truc a faire pour que ce soit plus doux 
      }  
    }
    camera.mtxLocal.translation = agent.mtxWorld.translation;
   



    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    
    //---------- Movement Managment ----------

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])){   
      StartKey = true;
    }
    if(StartKey == true ){
      ctrForward.setInput(3 * deltaTime);
      agent.mtxLocal.translateZ(ctrForward.getOutput());

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true ){
        agent.mtxLocal.rotateY(90); 
        KeyStatus_Left = false;
        RotationCameraTest_Left = RotationCameraTest_Left + 1;
        SetWall = false; // la
      }
          
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true){
        agent.mtxLocal.rotateY(-90);
        KeyStatus_Right = false;
        RotationCameraTest_Right = RotationCameraTest_Right + 1;
        SetWall = false; // la
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

    if(Math.abs(agent.mtxWorld.translation.x) >= 124.5 || Math.abs(agent.mtxWorld.translation.z) >= 124.5  ){
      agent.mtxLocal.translation = new ƒ.Vector3(1, 0.5, 1);
      StartKey = false;
    }
    

    
    
    
    
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}


