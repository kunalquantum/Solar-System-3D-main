/**
 * @file    Build and run an instance of Gravity.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import Game from "./modules/Game.js";
import DOMRenderer from "./modules/DOMRenderer.js";
import Physics from "./modules/Physics.js";
import GameData from "./modules/GameData.js";
import Celestial from "./modules/Celestial.js";
import { Point } from "./modules/Utils.js";
import Area from "./modules/Area.js";

/*----- Initialize -----------------------------------------------------------*/
const model = new GameData(),
  view = new DOMRenderer(model),
  physics = new Physics(model),
  game = new Game(model, view);
document.body.append(view.container);

/*----- Event Listeners ------------------------------------------------------*/
document.addEventListener("mousedown", game.handleMouseDown.bind(game));
document.addEventListener("mouseup", game.handleMouseUp.bind(game));
document.addEventListener("mousemove", game.handleMouseMove.bind(game));

/*---- Temporary Level -------------------------------------------------------*/
let saturn = new Celestial({
    name: "Saturn",
    physical: true,
    mass: 5.683e26,
    size: 3.06e8,
    texture: "./img/celestial-saturn.svg",
  }),
  target = new Area(new Point(1e9, -1e8), new Point(2e8, 2e8), {
    name: "target",
  }),
  playArea = new Area(new Point(-1e9, -2e8), new Point(4e8, 4e8), {
    name: "play",
  });
model.scene.push(saturn);
model.scene.push(target);
model.scene.push(playArea);

/*---- Start Game ------------------------------------------------------------*/
view.loop();
physics.loop();
game.loop();
