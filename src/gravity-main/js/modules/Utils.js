/**
 * @file    A collection of utility classes.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Classes --------------------------------------------------------------*/
/** A single point in cartesian coordinated. */
export class Point {
  /**
   * Create a single point.
   * @arg {number} x - The point's x coordinate.
   * @arg {number} y - The point's y coordinate.
   */
  constructor(x, y) {
    /** @var {number} Point#x - The point's x coordinate. */
    this.x = x;
    /** @var {number} Point#y - The point's y coordinate. */
    this.y = y;
  }

  /*--- Functions ------------------------------------------------------------*/
  /**
   * Update coordinates.
   * @arg {number} x - New x coordinate.
   * @arg {number} y - New y coordinate.
   * @returns {Point} The updated point.
   */
  update(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * Add another point or number to this point.
   * @arg {Point|number} addend A point to add to this point
   * @returns {Point} The updated point.
   */
  add(addend) {
    if (typeof addend === "number") {
      this.x += addend;
      this.y += addend;
    } else {
      this.x += addend.x;
      this.y += addend.y;
    }
    return this;
  }
  /**
   * Subtract another point or number from this point.
   * @arg {Point|number} subtrahend A point to subtract from this point
   * @returns {Point} The updated point.
   */
  subtract(subtrahend) {
    if (typeof subtrahend === "number") {
      this.x -= subtrahend;
      this.y -= subtrahend;
    } else {
      this.x -= subtrahend.x;
      this.y -= subtrahend.y;
    }
    return this;
  }
  /**
   * Multiply point components by a scalar
   * @arg {number} scalar Multiplication scale
   * @returns {Point} The updated point.
   */
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Get a copy of this Point as a Vector.
   * @returns {Vector} Copy of this Point as a Vector.
   */
  copyAsVector() {
    return new Vector(this.x, this.y);
  }
  /**
   * Get a Vector between two points.
   * @param {Point} point
   * @returns {Vector} A Vector between this Point and another Point.
   */
  vectorTo(point) {
    return point.copyAsVector().subtract(this);
  }

  /*----- Methods ------------------------------------------------------------*/
  /**
   * Create a point of the point.
   * @returns {Point} A copy of the point.
   */
  copy() {
    return new Point(this.x, this.y);
  }
}
/** A 2-dimensional vector in cartesian coordinated. */
export class Vector extends Point {
  /**
   * Create a 2-dimensional vector.
   * @arg {number} x - The vector's x length.
   * @arg {number} y - The vector's y length.
   */
  constructor(x, y) {
    super(x, y);
  }

  /*----- Getters and setters ------------------------------------------------*/
  /** @type {number} */
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  set magnitude(magnitude) {
    let direction = this.direction;
    this.x = magnitude * Math.cos(direction);
    this.y = magnitude * Math.sin(direction);
  }
  /** @type {number} */
  get direction() {
    let magnitude = this.magnitude;
    if (magnitude == 0) return NaN;
    return (this.y < 0 ? -1 : 1) * Math.acos(this.x / magnitude);
  }
  set direction(direction) {
    let magnitude = this.magnitude;
    // Keep direction within (-pi, pi)
    if (Math.abs(direction) > Math.PI) direction %= Math.PI;
    this.x = magnitude * Math.cos(direction);
    this.y = magnitude * Math.sin(direction);
  }

  /*----- Methods ------------------------------------------------------------*/
  /**
   * Create a copy of the vector.
   * @returns {Vector} A copy of the vector.
   * @override
   */
  copy() {
    return new Vector(this.x, this.y);
  }
  /**
   * Multiply the vector magnitude by a scalar.
   * @arg {number} scalar The scalar to multiply the components by.
   * @returns {Vector} The updated vector.
   * @override
   */
  scale(scalar) {
    this.magnitude > 0 && (this.magnitude = this.magnitude * scalar);
    return this;
  }
  /**
   * Reflect the vector vertically
   * @returns {Vector} The updated vector
   */
  reflectVertical() {
    this.y = 0 - this.y;
    return this;
  }
  /**
   * Reflect the vector horizontally
   * @returns {Vector} The updated vector
   */
  reflectHorizontal() {
    this.x = 0 - this.x;
    return this;
  }
}
