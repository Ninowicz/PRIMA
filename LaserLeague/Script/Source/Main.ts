namespace LaserLeague {
  import ƒ = FudgeCore; 
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

  //---- test for the laser speed ------------------------------------------------------------

  let ctrForwardLaser: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForwardLaser.setDelay(200);

  let laserformation: ƒ.Node;
  //------------------------------------------------------------------------------------------

  
  

  async function start(_event: CustomEvent): Promise<void> {

    viewport = _event.detail;

    root = viewport.getBranch();
    console.log(root);


    Laser = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0].getChildrenByName("LaserCore_1")[0];
    //LaserSquad = root.getChildrenByName("LaserObject")[0].getChildrenByName("LaserSquad_1")[0]; // For the transition 
    

    let graph: ƒ.Node = viewport.getBranch();
    agent = new Agent();
    graph.getChildrenByName("Agents")[0].addChild(agent);
    let domName: HTMLElement = document.querySelector("#Hud>h1");
    domName.textContent = agent.name;

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
    //let laserTranslationSpeed: number = 1;

    Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(laserRotationSpeed * deltaTime);
    

    //LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(laserTranslationSpeed * deltaTime);
    
    //if (LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.getX <= new ƒ.Vector3(-10, -5, 0))
      //Laser.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(-laserRotationSpeed * deltaTime);
    //console.log(LaserSquad.getComponent(ƒ.ComponentTransform).mtxLocal.lookAt);


    
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

    for (let laser of lasersCheck) {
      let beams: ƒ.Node[] = laser.getChildren();
      for (let beam of beams) {
        if (collisionTest(agent, beam))
        console.log("hit");
      }
    }

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









}



