/**
 * @file    Manages the game view (DOM).
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import GameData from "./GameData.js";
import Renderer from "./Renderer.js";
import Celestial from "./Celestial.js";
import Area from "./Area.js";

/*----- Classes --------------------------------------------------------------*/
/** @module DOMRenderer Manages the game view (DOM). */
export default class DOMRenderer extends Renderer {
  /**
   * Initialize a DOM-based renderer.
   * @arg {GameData} model A game model instance.
   */
  constructor(model) {
    super(model);
    this.setContainer(document.createElement("gravity"));
  }

  /*---- Methods -------------------------------------------------------------*/
  /**
   * Render the game scene.
   * @override
   */
  render() {
    const model = this.model,
      scene = model.scene;
    scene.forEach(
      /** @arg {Celestial} obj */
      (obj) => {
        // Make sure each Celestial has an Element
        const elem = obj.element || this.generateElement(obj),
          // Avoid repeating elem.style a whole bunch.
          style = elem.style,
          position = this.getPosition(obj);
        [style.left, style.top, style.width, style.height] =
          obj instanceof Celestial
            ? [
                `${position.x}px`,
                `${position.y}px`,
                `${obj.size / this.scale}px`,
                `${obj.size / this.scale}px`,
              ]
            : [
                `${position.x}px`,
                `${position.y}px`,
                `${obj.size.x / this.scale}px`,
                `${obj.size.y / this.scale}px`,
              ];
      }
    );
    model.healthDisplay.textContent = `${Math.max(
      0,
      model.health
    )} attempts remaining.`;
    model.message.innerHTML =
      model.condition === "PLAY"
        ? `Shoot the moon from the
          <span class="red">red</span> area into the
          <span class="blue">blue</span> area.`
        : model.condition === "WIN"
        ? `<span class="blue">You win! Congrats!</span>`
        : `<span class="red">You lost! Oh no!</span>`;
  }
  /**
   * Create an Element for a game object and append it to the container.
   * @arg {Celestial|Area} obj
   * @returns {HTMLElement} The rendering Element for the Celestial.
   */
  generateElement(obj) {
    const type = obj instanceof Celestial ? "celestial" : "viewarea",
      element = document.createElement(type),
      cleanName = obj.name.replace(/\s+/g, "-").toLowerCase();
    element.classList.add(`gravity__${type}_${cleanName}`);
    obj.texture &&
      ([
        element.style.backgroundColor,
        element.style.borderRadius,
        element.style.backgroundImage,
      ] = [`transparent`, `0`, `url(${obj.texture})`]);
    obj instanceof Area &&
      (obj.name.toLowerCase() === "target"
        ? (element.style.backgroundColor = `rgba(0, 0, 255, 0.7)`)
        : obj.name.toLowerCase() === "play" &&
          (element.style.backgroundColor = `rgba(255, 0, 0, 0.7)`));
    obj.element = element;
    this.container.append(obj.element);
    return element;
  }
}
