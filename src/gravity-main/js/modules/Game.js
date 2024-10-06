/**
 * @file    Manages the game controller.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import Area from "./Area.js";
import Celestial from "./Celestial.js";
import Physics from "./Physics.js";

/*----- Classes --------------------------------------------------------------*/
/** @module Game - Manages the game controller. */
export default class Game {
  /**
   * Initialize a game controller.
   * @arg {GameData} model A game model instance.
   * @arg {Renderer} view A game view instance.
   */
  constructor(model, view) {
    /** @var {GameData} model Reference to the game's model */
    this.model = model;
    /** @var {Renderer} view Reference to the game's view */
    this.view = view;
    /** @var {boolean} running Is game running? */
    this.running = true;
  }

  /*----- Constants ----------------------------------------------------------*/
  /** @const {Object} SCALE Default scales for input */
  static SCALE = {
    /** @const {number} SCALE.mass Mass multiplier per 100ms */
    mass: 1.05,
    /** @const {number} SCALE.velocity Velocity input (m/s per pixel) */
    velocity: 55.7,
  };

  /*----- Event Handlers -----------------------------------------------------*/
  /**
   * Handle mouse down events
   * @arg {MouseEvent} e Mouse down event
   */
  handleMouseDown(e) {
    let mouse = this.model.mouse;
    mouse.isDown = true;
    mouse.initPosition.update(e.pageX, e.pageY);
    mouse.position.update(e.pageX, e.pageY);
  }
  /**
   * Handle mouse up events
   * @arg {MouseEvent} e Mouse up event
   */
  handleMouseUp(e) {
    let mouse = this.model.mouse;
    mouse.isDown = false;
    mouse.position.update(e.pageX, e.pageY);
    mouse.change = mouse.initPosition.vectorTo(mouse.position);
  }
  /**
   * Handle mouse move events
   * @arg {MouseEvent} e Mouse move event
   */
  handleMouseMove(e) {
    const mouse = this.model.mouse;
    mouse.position.update(e.pageX, e.pageY);
    mouse.change = mouse.initPosition.vectorTo(mouse.position);
  }

  /*----- Methods ------------------------------------------------------------*/
  loop() {
    if (!this.running) return;
    const model = this.model,
      mouse = this.model.mouse;
    let scaledClick;
    // Handle player input
    model.condition === "PLAY" &&
      (mouse.isDown
        ? model.isCreating
          ? mouse.change.magnitude > 18
            ? // Set velocity if mouse outside threshold
              (model.newborn.velocity = mouse.change
                .copy()
                .scale(Game.SCALE.velocity)
                .reflectHorizontal()
                .reflectVertical())
            : // Customize mass if mouse still in threshold
              model.customMassAllowed && (model.newborn.mass *= Game.SCALE.mass)
          : // Create new Celestial on mouse down
            model.health > 0 &&
            Physics.pointInRectangle(
              (scaledClick = this.view.origin
                .copy()
                .subtract(mouse.position)
                .subtract(this.view.offset)
                .scale(0 - this.view.scale)),
              model.playArea
            ) &&
            (model.isCreating = true) &&
            (model.newborn = new Celestial({
              name: "played",
              mass: 1.35e23,
              position: scaledClick,
              size: 0.54e8,
            })) &&
            model.scene.push(model.newborn)
        : // Release newborn Celestial on mouse up
          model.isCreating &&
          (model.newborn.physical = true) &&
          (model.health -= 1) &&
          (model.isCreating = false));
    // Loss conditions
    model.condition === "PLAY" &&
      model.health <= 0 &&
      // Last played Celestial older than 30s
      new Date() - 30e3 >
        model.scene
          .slice()
          .reverse()
          .find((obj) => obj instanceof Celestial && obj.name === "played")
          .birth &&
      (model.condition = "LOSS");
    // Win conditions
    model.condition === "PLAY" &&
      model.scene.reduce(
        (acc, obj) =>
          // Check played Celestial
          obj instanceof Celestial && obj.name === "played"
            ? obj.collisions.find(
                (hit) =>
                  // Check if hit target
                  hit.who instanceof Area &&
                  hit.who.name.toLowerCase() === "target"
              ) || acc
            : acc,
        false
      ) &&
      (model.condition = "WIN");
    requestAnimationFrame(this.loop.bind(this));
  }
}
