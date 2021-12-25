namespace MarkusCart {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  window.addEventListener("load", <EventListener>start);
  //document.addEventListener("interactiveViewportStarted", <EventListener>start);
  let fps: number = 50;
  
  //let graph: ƒ.Node;
  //let car: Car;
  let car: ƒ.Node;
  

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);

  


  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    //viewport.calculateTransforms();

    let graph: ƒ.Node = viewport.getBranch();
    console.log(graph);

    car = graph.getChildrenByName("Car")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
    //viewport.camera.mtxPivot.translateZ(-60);
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;

    let agentRotationSpeed: number = 250;

    let value: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrForward.setInput(value * deltaTime);
    car.mtxLocal.translateY(ctrForward.getOutput());

    // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      car.mtxLocal.rotateZ(agentRotationSpeed * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      car.mtxLocal.rotateZ(-agentRotationSpeed * deltaTime);

    let PositionAgentForCamera: ƒ.Vector3 = car.mtxLocal.translation;
    viewport.camera.mtxPivot.translation = new ƒ.Vector3( (-PositionAgentForCamera.x - 10), PositionAgentForCamera.y, (PositionAgentForCamera.z + 10));
    viewport.camera.mtxPivot.rotateY(-33);


    viewport.draw();
    //ƒ.AudioManager.default.update();
  }
}