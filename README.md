## Checklist for the final assignment
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Criterion       | Explanation                                                                                                              |
|---:|-------------------|---------------------------------------------------------------------------------------------------------------------|
|  0 | Units and Positions | At first, the 0 was center, but it created many problems. The main one was when a Bike’s coordinate switched from negative to positive, the wall that was created by the bike was breaking in half. By moving the zero in one corner, the coordinates would always be positive. In this game, the 1 is the width of the bike, which is also 2 in length.                               |
|  1 | Hierarchy         | Explain the setup of the graphs and the advantages you gain by it.                                                  |
|  2 | Editor            | I use the editor in the beginning of the process, when I created the map and so on, and I mainly used it to create the shape of the bike, in another project so I do not destroy my current one, and then import with the line in the .json file.                                    |
|  3 | Scriptcomponents  | I used several ScriptComponents, one for what I called the BikeWall, which is the trail that appears behind each bike. Of course Bikes were also a ScriptComponent, which were inside another bigger ScriptComponent, named Bots, which contains a couple of informations. The "Bike" one was very useful since it carried alot of informations, such as the Bike class and some useful functions that went with it.                                |
|  4 | Extend            | Derive classes from FudgeCore and explain if that was useful in your context or not and why.                        |
|  5 | Sound             | the only sound I used was for the music, which were place within the terrain, so that the players would always hear it.                   |
|  6 | VUI               | Create a virtual user interface using the interface controller and mutables. Explain the interface.                 |
|  7 | Event-System      | Use the event system to send messages through graphs and explain if that was useful in your context or not and why. |
|  8 | External Data     | Create a configuration file your application loads and adjusts to the content. Explain your choice of parameters.   |
|  9 | Light             | Explain your choice of lights in your graphs.                                                                       |
|  A | Physics           | Add rigidbody components and work with collisions (1) and/or forces and torques (1) and/or joints (1)               |
|  B | Net               | Add multiplayer functionality via network (3)                                                                       |
|  C | State Machines    | I did not really use a Statemachine, but I still tried to do some kind of AI (?), with random numbers and behaviour to adopt if the bot was to be close to a boundrie, but it is not working well.          |
|  D | Animation         | Animate using the animation system of FudgeCore (1) and/or Sprites (1) as defined in FudgeAid                           |