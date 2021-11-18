namespace LaserLeague {
  import ƒ = FudgeCore;
  //export import ƒui = FudgeUserInterface;
  ƒ.Debug.info("Main Program Template running!")



  //----------------------------- Game Settings ----------------------------------------------

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);
  let fps: number = 50;
  let root: ƒ.Node;

  //------------------------------------------------------------------------------------------
  let Laser: ƒ.Node;
  let agent: Agent;
  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);

  let laserformation: ƒ.Node;
  //------------------------------------------------------------------------------------------

  
  

  async function start(_event: CustomEvent): Promise<void> {

    viewport = _event.detail;

    root = viewport.getBranch();
    console.log(root);


    Laser = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0].getChildrenByName("LaserCore_1")[0];
    
    

    let graph: ƒ.Node = viewport.getBranch();
    agent = new Agent();
    graph.getChildrenByName("Agents")[0].addChild(agent);
    //let domName: HTMLElement = document.querySelector("#Hud>h1");
    //domName.textContent = agent.name;

    laserformation = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a





    // Camera adjustment
    viewport.camera.mtxPivot.translateZ(-60);
  }


  function update(_event: Event): void {

    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    
    

    //  ===== Laser movement =====
    
    let laserRotationSpeed: number = 200 ;
    

    Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(laserRotationSpeed * deltaTime);
    //  ===== Agent movement =====

    let agentRotationSpeed: number = 250;

    let value: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrForward.setInput(value * deltaTime);
    agent.mtxLocal.translateY(ctrForward.getOutput());

    // agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agent.mtxLocal.rotateZ(agentRotationSpeed * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agent.mtxLocal.rotateZ(-agentRotationSpeed * deltaTime);

    // ƒ.Physics.world.simulate();  // if physics is included and used




    let lasersCheck: ƒ.Node[] = laserformation.getChildren(); // LaserCheck --> LaserCore_1

    AgentPositionTest(agent);  

    for (let laser of lasersCheck) {
      let beams: ƒ.Node[] = laser.getChildren();
      for (let beam of beams) {
        if (collisionTest(agent, beam))
          agent.mtxLocal.translation = new ƒ.Vector3(10, 0, 1);//console.log("hit");
      }
    }

    // Line to get the camera on the agent.
    // let PositionAgentForCamera: ƒ.Vector3 = agent.mtxLocal.translation;
    // viewport.camera.mtxPivot.translation = new ƒ.Vector3( -PositionAgentForCamera.x, PositionAgentForCamera.y, -60);
    
    
    viewport.draw();
    ƒ.AudioManager.default.update();
  }


  // Other functions

  function collisionTest(_agent: ƒ.Node, _beam: ƒ.Node): boolean {
    let testPosition: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(_agent.mtxWorld.translation, _beam.mtxWorldInverse);
    let distance: ƒ.Vector2 = ƒ.Vector2.DIFFERENCE(testPosition.toVector2(), _beam.mtxLocal.translation.toVector2());

    if (distance.x < -0.65 || distance.x > 0.65 || distance.y < -0.5 || distance.y > 4.5) // r = d/2 = 0.5 ; w = 0.3 ; h = 4
      return false;
    else
      return true;
  }


  function AgentPositionTest(_agent : ƒ.Node): void {
    let PositionAgent: ƒ.Vector3 = _agent.mtxLocal.translation;
    
    if (PositionAgent.x > 20)
      _agent.mtxLocal.translation = new ƒ.Vector3(-19, PositionAgent.y, 1);
    
    if (PositionAgent.x < -20)
      _agent.mtxLocal.translation = new ƒ.Vector3(19, PositionAgent.y, 1);

    if (PositionAgent.y > 12)
      _agent.mtxLocal.translation = new ƒ.Vector3(PositionAgent.x, -10, 1);
    
    if (PositionAgent.y < -12)
      _agent.mtxLocal.translation = new ƒ.Vector3(PositionAgent.x, 10, 1);

  }
}