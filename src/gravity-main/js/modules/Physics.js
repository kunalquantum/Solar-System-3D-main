/**
 * @file    Manages the physics simulation.
 * @author  Una Ada <una@anarchy.website>
 * @version 2021.06.04
 */

/*----- Imports --------------------------------------------------------------*/
import GameData from "./GameData.js";
import Celestial from "./Celestial.js";
import Area from "./Area.js";
import { Point, Vector } from "./Utils.js";

/*----- Classes --------------------------------------------------------------*/
/** @module Physics Manages the physics simulation. */
export default class Physics {
  /**
   * Initialize physics engine.
   * @arg {GameData} model A game model instance.
   */
  constructor(model) {
    /** @var {GameData} model Reference to the game's model. */
    this.model = model;
    /** @var {number} _intervalId Holds the ID of the loop interval. */
    this._intervalId = null;
  }

  /*----- Constants ----------------------------------------------------------*/
  /** @const {number} G Gravitational constant. */
  static G = 6.67e-11;
  /** @const {number} TIME_SCALE Time scale (seconds per loop). */
  static TIME_SCALE = 0.5e3;
  /** @const {number} INTERVAL Interval time for physics loop. */
  static INTERVAL = 1e3 / 120;

  /*----- Calculation Functions ----------------------------------------------*/
  /**
   * Check if center of circle is within a rectangle
   * @arg {Point} point
   * @arg {Area} rect
   * @returns {boolean}
   */
  static pointInRectangle(point, rect) {
    if (!(point instanceof Point && rect instanceof Area)) return;
    let p1 = rect.position.copy(),
      p2 = p1.copy().add(rect.size);
    return point.x > p1.x && point.x < p2.x && point.y > p1.y && point.y < p2.y;
  }
  /** @const {Object} INTERSECT_CHECKS Intersect function store. */
  static INTERSECT_CHECKS = {
    CIRCLE: {
      CIRCLE:
        /**
         * @arg {Celestial} a
         * @arg {Celestial} b
         * @returns {boolean}
         */
        (a, b) =>
          a.position.vectorTo(b.position).magnitude < (a.size + b.size) / 2,
      RECTANGLE:
        /**
         * @arg {Celestial} a
         * @arg {Area} b
         * @returns {boolean}
         */
        (a, b) => Physics.pointInRectangle(a.position, b),
    },
    RECTANGLE: {
      CIRCLE:
        /**
         * @arg {Celestial} a
         * @arg {Area} b
         * @returns {boolean}
         */
        (a, b) => Physics.pointInRectangle(b.position, a),
      RECTANGLE:
        // This will always be false because only Areas are rectangles for now!
        () => false,
    },
  };
  /**
   * Check for intersections between two Celestial instances
   * @arg {Celestial} a
   * @arg {Celestial} b
   */
  checkIntersection(a, b) {
    return Physics.INTERSECT_CHECKS[a.hitBox][b.hitBox](a, b);
  }
  /**
   * Calculate gravitational acceleration between two Celestial instances
   * @arg {Celestial} m_1 Celestial to apply acceleration to.
   * @arg {Celestial} m_2 Celestial applying the acceleration.
   * @returns {Vector} Gravitational acceleration Vector.
   */
  gravitate(m_1, m_2) {
    // Vector between m_1 and m_2
    const between = m_1.position.vectorTo(m_2.position),
      // Distance between m_1 and m_2
      r = between.copy().magnitude;
    // Make `between` a unit vector
    between.magnitude = 1;
    return between.scale((Physics.G * m_2.mass) / r ** 2);
  }

  /*----- Calculation Methods ------------------------------------------------*/
  /** Update `Celestial#collisions` */
  updateCollisions() {
    this.model.scene.forEach(
      /** @arg a {Celestial} */
      (a) =>
        this.model.scene.forEach(
          /** @arg b {Celestial} */
          (b) =>
            a !== b &&
            this.checkIntersection(a, b) &&
            a.collisions.push({
              time: +new Date(),
              who: b,
            })
        )
    );
  }
  /** Update `Celestial#velocity`s based on gravitational acceleration */
  updateVelocities() {
    this.model.scene.forEach(
      /** @arg m_1 {Celestial} */
      (m_1) =>
        m_1 instanceof Celestial &&
        m_1.physical &&
        // Add to the velocity
        m_1.velocity.add(
          this.model.scene
            // Total acceleration
            .reduce(
              /**
               * @arg {Vector} acc Total acceleration (accumulator)
               * @arg {Celestial} m_2 Celestial applying acceleration
               */
              (acc, m_2) =>
                // Add gravitational acceleration if not same celestial
                m_2 instanceof Celestial && m_2.physical && m_1 !== m_2
                  ? acc.add(this.gravitate(m_1, m_2))
                  : acc,
              // Initialize an zero acceleration vector
              new Vector(0, 0)
            )
            // Velocity from acceleration
            .scale(Physics.TIME_SCALE)
        )
    );
  }
  /** Update `Celestial#position`s based on `Celestial#velocity` */
  updatePositions() {
    this.model.scene.forEach(
      /** @arg obj {Celestial} */
      (obj) =>
        obj instanceof Celestial &&
        obj.physical &&
        obj.position.add(obj.velocity.copy().scale(Physics.TIME_SCALE))
    );
  }

  /*----- Running Methods ----------------------------------------------------*/
  /** Calculate physics on a set interval. */
  loop() {
    this._intervalId = window.setInterval(
      this.step.bind(this),
      Physics.INTERVAL
    );
  }
  /** Stop the physics engine loop. */
  stop() {
    window.clearInterval(this._intervalId);
  }
  /** Calculate the physics for objects in the scene and apply to model. */
  step() {
    this.updateCollisions();
    this.updateVelocities();
    this.updatePositions();
  }
}
