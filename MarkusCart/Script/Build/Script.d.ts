/// <reference types="../../../FudgeCore/FudgeCore" />
declare namespace Script {
    import ƒ = FudgeCore;
    class Cart extends ƒ.Node {
        constructor();
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
