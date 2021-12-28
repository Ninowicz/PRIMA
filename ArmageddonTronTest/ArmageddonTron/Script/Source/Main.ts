namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  let fps: number = 60;
  let graph: ƒ.Node;
  let agent: ƒ.Node;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);

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
    viewport.camera.mtxPivot.translateY(150);
    viewport.camera.mtxPivot.rotateX(90);
    graph = viewport.getBranch();
    
    agent = graph.getChildrenByName("Bike")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps); 
  }


  function update(_event: Event): void {
  
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
      KeyStatus_Left = false;
    }
        
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus_Right == true){
      agent.mtxLocal.rotateY(-90);
      KeyStatus_Right = false;
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


