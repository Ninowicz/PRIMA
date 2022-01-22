namespace Script {
  import ƒ = FudgeCore;

  export class Bot extends ƒ.Node{

    public bike : Bike;
    public color : ƒ.Color;
    public BotNode : ƒ.Node= new ƒ.Node("BotNode");
    public bikeWall : BikeWall;
    public name : string = "Unamed";

    constructor() {
      super("Bot");
    }

  }

  export let OutlookBot: Bot;
 
  OutlookBot = new Bot();
  OutlookBot.color = new ƒ.Color(0,1,1,1);
  OutlookBot.name = "Outlook";

  export let AgentBot: Bot;
  AgentBot = new Bot();
  AgentBot.color = new ƒ.Color(1,0,1,1);
  
  export function SetBikeBot(_bot : Bot, _spawnpoint : SpawnPoint){
    _bot = new Bot();
    graph.getChildrenByName("PlayerList")[0].addChild(_bot);
    //_bot.bike = new Bike();
    //_bot.addChild(_bot.bike);
    
    //SetSpawnPoint(_bot.bike, _spawnpoint);

    //_bot.bike.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
  }
  
}



  // let Outlook: Bike;
  // let PowerPoint: Bike;
  // let Word: Bike;
  // let Excel: Bike;