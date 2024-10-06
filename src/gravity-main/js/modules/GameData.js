/**
 * @file    Manages the game model.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import Area from "./Area.js";
import { Point, Vector } from "./Utils.js";

/*----- Classes --------------------------------------------------------------*/
/** @module GameData Manages the game model. */
export default class GameData {
  /** Initialize a game model. */
  constructor() {
    /*----- Rendering --------------------------------------------------------*/
    /** @var {string} id Short game ID based on the current time. */
    this.id = Math.round(+new Date() / 1e3).toString(26);
    /** @var {Celestial[]} scene Array of game objects in current scene. */
    this.scene = [];
    /** @var {HTMLElement} healthDisplay Remaining attempts display element. */
    this.healthDisplay = document.querySelector("div#health");
    /** @var {HTMLElement} message Element displaying game message. */
    this.message = document.querySelector("div#message");

    /*----- Default Level Data -----------------------------------------------*/
    /** @var {number} health Number of remaining attempts for current level. */
    this.health = 3;
    /** @var {boolean} customMassAllowed Can the player customize mass? */
    this.customMassAllowed = true;
    /** @var {string} condition Current game condition. */
    this.condition = "PLAY";

    /*----- Input Handling ---------------------------------------------------*/
    /** @var {Object} mouse Data regarding the user's mouse. */
    this.mouse = {
      /** @var {boolean} mouse.isDown Is mouse currently down? */
      isDown: false,
      /** @var {Object} mouse.initPosition Position of mouse on down. */
      initPosition: new Point(0, 0),
      /** @var {Object} mouse.position Current position of mouse. */
      position: new Point(0, 0),
      /** @var {Vector} mouse.change Change in position since mouse down. */
      change: new Vector(0, 0),
    };
    /** @var {boolean} isCreating Is currently creating a new Celestial? */
    this.isCreating = false;
    /** @var {Celestial} newborn Newest created Celestial.  */
    this.newborn = null;
  }

  /*----- Setters and Getters ------------------------------------------------*/
  /** @var {Area} target The level target area. */
  get target() {
    return this.scene.find(
      (obj) => obj instanceof Area && obj.name.toLowerCase() === "target"
    );
  }
  /** @var {Area} playArea The level play area. */
  get playArea() {
    return this.scene.find(
      (obj) => obj instanceof Area && obj.name.toLowerCase() === "play"
    );
  }
}
