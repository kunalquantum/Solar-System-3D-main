/**
 * @file Scene area
 * @author Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Classes --------------------------------------------------------------*/
/** @module Area Scene area. */
export default class Area {
  /**
   * Create a new scene area game object.
   * @arg {Point} position Position coordinates in meters.
   * @arg {Point} size Size in meters.
   * @arg {Object} options Optional parameters.
   * @arg {string} [options.name="Unnamed Area"] Display name.
   * @arg {string} [options.texture] The path of a texture for rendering.
   */
  constructor(position, size, options) {
    /*----- Metadata ---------------------------------------------------------*/
    /** @var {string} name Display name. */
    this.name = options.name || "Unnamed Area";
    /** @var {number} birth Creation timestamp. */
    this.birth = +new Date();

    /*----- Physics ----------------------------------------------------------*/
    /** @var {Point} position Position coordinates in meters. */
    this.position = position;
    /** @var {Point} size Position coordinates in meters. */
    this.size = size;
    /** @var {string} hitBox Shape of the hit box. */
    this.hitBox = "RECTANGLE";
    /** @var {Object[]} collisions Log of collisions with other objects. */
    this.collisions = [];

    /*----- Rendering --------------------------------------------------------*/
    /** @var {string} texture The texture for rendering. */
    this.texture = options.texture || null;
  }
}
