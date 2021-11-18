namespace LaserLeague {
    import ƒ = FudgeCore;

    export class Agent extends ƒ.Node {
        public health: number = 1;
        public name: string = "Bojack";

        constructor() {
            super("Agent");

            this.addComponent(new ƒ.ComponentTransform);

            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshSphere("MeshAgent")));
            this.addComponent(new ƒ.ComponentMaterial(
                new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
            );

            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            this.mtxLocal.translate(new ƒ.Vector3(10, 0, 1));
        }
    }
}
