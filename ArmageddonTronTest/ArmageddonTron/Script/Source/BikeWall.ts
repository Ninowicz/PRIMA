namespace Script {
  import ƒ = FudgeCore;

  enum state {
    Alive,
    Dead
  }

  export class BikeWall extends ƒ.Node {

    public name: string = "Bojack";
    public State: state;
      

      constructor() {
          super("BikeWall");

          this.addComponent(new ƒ.ComponentTransform);
          this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
          this.addComponent(new ƒ.ComponentMaterial(
             new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
          );
          
          
          this.mtxLocal.scale(new ƒ.Vector3(1, 0.75 ,0.2));
          this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 0));
      }
  }
}