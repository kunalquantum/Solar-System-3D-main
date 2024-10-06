## Pseudocode

### main.js

- Import modules
  - physics engine (Physics.js) &rarr; `phys`
  - renderer (DOMRenderer.js) &rarr; `renderer`
  - game logic (Game.js) &rarr; `game`
- Define constants (instances of modules)
- Cache DOM elements
- Initialize game
  - Pass elements into `init()`
  - Initialize `renderer`
  - Append `renderer.container` to DOM
  - Initialize `game` (pass in `renderer`)
  - Initialize `phys` (pass in `game`)
  - Add event listeners to `renderer.container` to update `game` state <br/>
    *These should probably be functions in the `game` module.*
    - `mousedown` &rarr;
      - `true` on mouse being down
      - cache mouse position as `Object`
    - `mousemove` &rarr; current mouse position as `Object`
    - `mouseup` &rarr; `false` on mouse being down
  - Start `phys` loop
  - Start `game` loop <br/>
    *These need to be separate because physics simulation is time based but the
    renderer is based on animation frames.*

### DOMRenderer.js

- Define `container` `Element`
- For each type of object in the game
  - Define initializing `function` <br/>
    *Take in the attributes the item has according to the model and create an
    `Element` matching that description. Append this `Element` to the
    `container`*
  - Define setter `function` <br/>
    *A `function` which will update the DOM `Element` (view) to match the model
    in `game`.*
- Initialize UI
  - Create `Element` for ...
    - settings menu
    - settings button
    - repo/docs link
    - velocity display
    - "health" display <br/>
      *I'm calling this "health" as a convenient analogy, it will really be a
      number of attempts remaining to get the "moon" into the target area.*
    - game messages display
  - ... and append to `container`
- Define renderer update `function` <br/>
  *This could possibly be completely removed. I'm not entirely certain at this 
  point, but it might be possible to have the renderer define something like a 
  setter on the game objects... not sure how I feel about the idea yet, since
  the physics engine will likely be the one updating a lot of the model rather
  than the `game`.*
  - Update displays according to `game` state:
    - velocity
    - "health"
    - game messages
  - Update game objects
    - remove `Element` if absent from `game` state
    - update attributes to match state
    - add `Element` if newly added to `game` state <br/>
      *Not entirely sure how this will go at the moment, either caching render
      states or setting a flag on the renderer's `Object` for the game object to
      show that it has not been rendered yet.*

### Game.js

- Define constants
  - Same position threshold for mouse positions
  - Mass increment rate
- Define state
  - `Object` to hold game objects <br/>
    *Game objects will have a class, with extensions for each sort of object,
    and each will have mass, velocity, position, hitbox, and an array of
    collisions.*
  - Current level
  - "Health"
  - Is mouse down?
  - Cached mouse position on `mousedown`
  - Current mouse position
  - Is creating "moon"?
- Define initialization `function`
  - Save `renderer` reference
  - Re(set) current level
  - Import level information <br/>
    *This should be some sort of data file describing how each level works, the 
    initial state of any obstacles, the starting area, the target area, the
    allowed number of attempts, if custom mass is allowed, and the game
    message.*
  - *Not sure what else this needs to do since most variables would be managed
    by level loading. Perhaps load some sort of splash screen? Load settings
    from a cookie?*
- Define level loading `function`
  - Remove all game objects
  - Set state according to level data
- Define game loop `function`
  - If mouse is down
    - If not creating moon and health isn't zero
      - Is creating moon `true`
      - Create instance for new moon
        - At cached mouse position
        - No physics
    - If creating moon
      - If current position within threshold of cached position and level allows   
        custom mass
        - Increment mass of moon by mass increment rate
      - Else calculate velocity from change in mouse position between cached and
        current <br/>
        *This will be a `phys` function, for scaling reasons.*
  - Else (mouse not down) if creating moon
    - Is creating moon `false`
    - Turn on physics for moon
    - Remove one from "health"
  - Check for game object collisions
    - If moon collides with object
      - Remove moon
      - If health is zero and no other moons LOSS CONDITION
    - If moon collides with target area
      - WIN CONDITION
    - *Other conditions should probably be handled somehow!*
  - Call `renderer.update`
  - Call back to loop on next animation frame
- *Defining game object classes should probably be deferred to separate files,
  see previous notes on what those might look like.*

### Physics.js

- Define constants
  - Gravitational constant
  - Position scale (pixels to meters)
  - Velocity scale (pixels/second to meters/second)
  - Time scale
- Define gravitation `function`
  - For each game object (1)
    - For each other game object (2) add calculated gravitational acceleration 
      multiplied by the time scale to the object (1)'s velocity
- Define move objects `function`
  - For each game object update position based on velocity and time scale
- Define check collisions `function`
  - For each game object (1)
    - For each other game object (2)
      - If hitboxes intersect, log other object (2) to object (1)'s collisions
- Define physics loop
  - Call gravity
  - Call move
  - Call check collisions
  - Call back to loop after timeout <br/>
    *Timeout will probably be set to 1/60th second, this is probably pretty
    similar to the animation framerate but if this is dependent on that the time 
    scales get weird for some reason (I've tested it before).*
