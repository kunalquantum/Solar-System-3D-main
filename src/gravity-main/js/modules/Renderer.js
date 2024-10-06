/**
 * @file    Superclass for managing game view.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import GameData from "./GameData.js";
import Celestial from "./Celestial.js";
import { Point } from "./Utils.js";

/*----- Classes --------------------------------------------------------------*/
/** @module Renderer Superclass for managing game view. */
export default class Renderer {
  /**
   * Initialize base rendering functions.
   * @arg {GameData} model A game model instance.
   */
  constructor(model) {
    /** @var {GameData} model Reference to the game's model. */
    this.model = model;
    /** @var {boolean} running Should the renderer continue running? */
    this.running = true;
    /** @var {number} scale Space scale (meters per pixel). */
    this.scale = 0.3e7;
  }

  /*---- Setters and getters -------------------------------------------------*/
  /** @type {number[]} */
  get bounds() {
    const { top, left, height, width } = this.container.getBoundingClientRect();
    return { top, left, height, width };
  }
  /** @var {Point} origin View origin point. */
  get origin() {
    const bounds = this.bounds;
    return new Point(bounds.width / 2, bounds.height / 2);
  }
  /** @var {Point} offset */
  get offset() {
    const bounds = this.bounds;
    return new Point(bounds.left, bounds.top);
  }

  /*----- Functions ----------------------------------------------------------*/
  /**
   * Get the appropriate view position for a game object.
   * @param {Celestial|Area} obj
   * @returns {Point} View position for the game object.
   */
  getPosition(obj) {
    const origin = this.origin,
      // View position from scaled game object position
      position = obj.position.copy().scale(1 / this.scale),
      // View offset position from Celestial origin
      offset = obj instanceof Celestial ? obj.size / (this.scale * 2) : 0;
    // Return offset view position
    return origin.add(position).subtract(offset);
  }

  /*----- Methods ------------------------------------------------------------*/
  /**
   * Sets the view container
   * @arg {HTMLElement} el Element to set as view container.
   */
  setContainer(el) {
    el.id = `gravity-${this.model.id}`;
    el.classList.add("gravity");
    /** @var {HTMLElement} container DOM Element holding all game views. */
    this.container = el;
  }
  /**
   * Render the game scene.
   * @abstract
   */
  render() {
    throw new Error("Renderer#render() must be implemented by subclass!");
  }
  /** Render on animationFrame */
  loop() {
    if (this.running) requestAnimationFrame(this.loop.bind(this));
    else return;
    this.render();
  }
}
