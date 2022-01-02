namespace Script {
  import ƒ = FudgeCore;

  enum state {
    Alive,
    Dead
  }

  export class Bike extends ƒ.Node {

    public name: string = "Bojack";
    public State: state.Alive;
      

      constructor() {
          super("Bike");

          this.addComponent(new ƒ.ComponentTransform);

          this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
          this.addComponent(new ƒ.ComponentMaterial(
              new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
          );

          this.mtxLocal.scale(ƒ.Vector3.ONE(1));
          this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 0));
      }
  }
}