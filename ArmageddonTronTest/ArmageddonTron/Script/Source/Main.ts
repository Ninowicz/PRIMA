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

  let KeyStatus: Boolean ;
  KeyStatus = true;

  let NbFrameRequire : number;
  NbFrameRequire = 0;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateY(200);
    viewport.camera.mtxPivot.rotateX(90);
    graph = viewport.getBranch();
    
    agent = graph.getChildrenByName("Bike")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps); 
  }
   function KeyStatusManagment(_NbFrameRequire : number): boolean {
    if (_NbFrameRequire > 490){
      return true;
    }
    else{
      return false;
    }
  }

  function NbFrameRequireManagement(_NbFrameRequire: number):number{
    _NbFrameRequire = _NbFrameRequire + 1;
      if( _NbFrameRequire > 500 ){
        _NbFrameRequire = 0;
      }
    return _NbFrameRequire;
  }

  function update(_event: Event): void {
  
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
      
  
      let value: number = (
        ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
        + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
      );
      ctrForward.setInput(value * deltaTime);
      agent.mtxLocal.translateZ(ctrForward.getOutput());
      
      if (KeyStatus == false){
        NbFrameRequire = NbFrameRequireManagement(NbFrameRequire);
        KeyStatus = KeyStatusManagment(NbFrameRequire);
      }
      
      
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && KeyStatus == true ){
        agent.mtxLocal.rotateY(90);   
        KeyStatus = false;
      }
        
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && KeyStatus == true){
        agent.mtxLocal.rotateY(-90);
        KeyStatus = false;
      }

      console.log(KeyStatus);
    // ƒ.Physics.world.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}


