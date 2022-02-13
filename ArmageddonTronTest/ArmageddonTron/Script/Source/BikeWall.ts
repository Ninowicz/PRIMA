namespace Script {
  import ƒ = FudgeCore;

  enum state {
    Alive,
    Dead
  }

  export class BikeWall extends ƒ.Node {

    public State: state;
      

      constructor() {
          super("BikeWall");

          this.addComponent(new ƒ.ComponentTransform);
          this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
          this.addComponent(new ƒ.ComponentMaterial(
             new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(AgentBot.color))) //new ƒ.Color(1, 0, 0, 0.5)
          );
          
          
      }
  }
}