namespace MarkusCart {
    import ƒ = FudgeCore;

    export class Car extends ƒ.Node {
        public health: number = 1;
        public name: string = "McQueen";

        constructor() {
            super("Car");

            

            this.mtxLocal.scale(ƒ.Vector3.ONE(1));
            this.mtxLocal.translate(new ƒ.Vector3(0, 0, 0));
        }
    }
}