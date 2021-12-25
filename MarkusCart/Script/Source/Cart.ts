namespace Script {
  import ƒ = FudgeCore;

  export class Cart extends ƒ.Node {
      //public health: number = 1;
      //public name: string = "McQueen";

      constructor() {
          super("Car");
          //let shape: ƒ.Node;
          //let ShapeCartGraph: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-11-24T11:44:00.967Z|63210"];
          //this.addChild(shape);
          //shape.addComponent(new ƒ.ComponentTransform);
          ////shape = ƒ.Project.createGraphInstance(CartGraph);
          //shape.appendChild(ShapeCartGraph);
          this.addComponent(new ƒ.ComponentTransform);
          this.mtxLocal.rotateZ(-90);
          
          //this.mtxLocal.scale(ƒ.Vector3.ONE(1));
          //this.mtxLocal.translate(new ƒ.Vector3(0, 0, 0));
      }
  }
}