namespace Script {
  import ƒ = FudgeCore;

  export class Bot extends ƒ.Node{

    public bike : Bike;
    public color : ƒ.Color;
  }

  export let OutlookBot: Bot;
  //OutlookBot = new Bot();
  OutlookBot.color = new ƒ.Color(0,1,1,1);
  
  export function SetBikeBot(_bot : Bot, _spawnpoint : SpawnPoint){
    _bot.bike = new Bike();
    graph.getChildrenByName("Bike")[0].addChild(_bot.bike);
    
    SetSpawnPoint(_bot.bike, _spawnpoint);

    _bot.bike.addComponent(new ƒ.ComponentMaterial(
      new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
  }
}