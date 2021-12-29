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
  let agent: ƒ.Node;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);

  let CameraControl =new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  //CameraControl.setDelay(500);

  let RotationCameraTest_Left : boolean = false;
  let TheChosenOne_Left : number = 1;
  let RotationCameraTest_Right : boolean = false;
  let TheChosenOne_Right : number = -1;
  let LongRun :boolean = false;
  let MemorieNumber : number = 0;

  let Referee_Left:number;
  let Referee2_Left:number;
  let Referee_Right:number;
  let Referee2_Right:number;

  Referee_Left = 0;
  Referee2_Left = -1;
  Referee_Right = 0;
  Referee2_Right = -1;

  let KeyStatus_Left: Boolean ;
  KeyStatus_Left = true;

  let KeyStatus_Right: Boolean ;
  KeyStatus_Right = true;

  let StartKey: Boolean;
  StartKey = false;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.calculateTransforms();
    //viewport.camera.mtxPivot.translateY(150);
    //viewport.camera.mtxPivot.rotateX(90);
    graph = viewport.getBranch();
    
    agent = graph.getChildrenByName("Bike")[0];

    cmpCamera.mtxPivot.translation = new ƒ.Vector3(0,6,-16); // 0 8 -12
    cmpCamera.mtxPivot.rotation = new ƒ.Vector3(18,0,0);
    
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
    // Camera left turn
    if(RotationCameraTest_Left == true ){
      TheChosenOne_Left = 1;
      CameraControl.setInput(0.5 * TheChosenOne_Left);
      camera.mtxLocal.rotateY(CameraControl.getOutput());


      if(Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) < 1 || Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) > 180){
        
        RotationCameraTest_Left = false;
        TheChosenOne_Left = 0;
        camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
        LongRun = false;
      }
    }
    // Camera right turn
    if(RotationCameraTest_Right == true){
      TheChosenOne_Right = -1;
      CameraControl.setInput(0.5 * TheChosenOne_Right);
      camera.mtxLocal.rotateY(CameraControl.getOutput());


      if(Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) < 1 || Math.abs(camera.mtxLocal.rotation.y - agent.mtxLocal.rotation.y) > 180){
        
        RotationCameraTest_Right = false;
        TheChosenOne_Right = 0;
        camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
        LongRun = false;
      }
    }

    // Camera goes back to normal
    if (KeyStatus_Left == true && KeyStatus_Right == true){
      MemorieNumber = MemorieNumber + 1;
      if(MemorieNumber > 100){
        camera.mtxLocal.rotation.y = agent.mtxLocal.rotation.y;
        MemorieNumber = 0;
      }
    }
    else{
      MemorieNumber = 0;
    }
    
    console.log(MemorieNumber);
    camera.mtxLocal.translation = agent.mtxWorld.translation;
    //if (camera.mtxLocal.translation != agent.mtxWorld.translation){
    //  camera.mtxLocal.translation = new ƒ.Vector3(0,agent.mtxWorld.translation.y,-12);
    //}
    
    //camera.mtxLocal.rotation = new ƒ.Vector3(0, agent.mtxWorld.rotation.y, 0);
   
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    
    
    //---------- Movement Managment ----------

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])){   
      StartKey = true;
    }
    if(StartKey == true){
      ctrForward.setInput(2 * deltaTime);
      agent.mtxLocal.translateZ(ctrForward.getOutput());
    }  
      
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus_Left == true ){
      agent.mtxLocal.rotateY(90); 
      //TheChosenOne_Left = -1;
      KeyStatus_Left = false;
      RotationCameraTest_Left = true;
    }
        
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true){
      agent.mtxLocal.rotateY(-90);
      //TheChosenOne_Left = 1;
      KeyStatus_Right = false;
      RotationCameraTest_Right = true;
      
    }
    
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

    //---------- End of Movement Managment



    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}


