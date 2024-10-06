# Gravity

A game of gravity assist maneuvers built in browsers. This is an experimental game using a custom physics engine to simulate gravity!

## Getting Started

To play the game as it's deployed on GitHub pages, just navigate to [una-ada.github.io/gravity](https://una-ada.github.io/gravity/)!

To play the most up-to-date version, clone the repository:

```
git clone https://github.com/una-ada/gravity
```

then use your choice of local server to run it! (Due to the use of JavaScript modules, the game must be ran on an HTTP server)

## Gameplay

There are two "areas" on the game screen: the **red** play area and the **blue** target area. Your goal is to launch a Celestial (or "moon") from the play area into the target area.

![](/img/demo-play.jpeg)

To launch a Celestial, click in the play area with your mouse and drag the mouse to set the velocity before releasing. Holding the mouse in place before setting the velocity will increase the mass.

You get a limited amount of attempts to get a Celestial into the target area, if you use them all up you lose! Since they can just orbit around or fly off into space indefinitely, the game only determines you've used all your attempts if the last attempt has gone on for longer than 30 seconds.

![](/img/demo-loss.jpeg)

But, if you manage to get a Celestial into the target area, you win! Hurray!

![](/img/demo-win.jpeg)

## Technologies Used

This project is written in vanilla JavaScript, CSS, and HTML. The JS uses modules and classes, so the code is all nicely modular (and almost completely OOP, which is fine, I guess).

## Future Plans

There's a lot I want to do to expand on this project! Right now, there's only the extreme basics, so here's a full list of everything I want done in the near (or maybe distant) future:

- [ ] Canvas renderer
- [ ] Dynamic reference frames
- [ ] Zoom and scaling to window
- [ ] Move level data displays into JS (currently in HTML)
- [ ] Info displays
  - [ ] Mass / velocity of player input
  - [ ] '' of objects in scene
- [ ] Settings menu
  - [ ] Dark mode
  - [ ] Grid
  - [ ] Text size
- [ ] Level loading
  - [ ] At least 3 levels
  - [ ] Level scores based on time and attempts used
  - [ ] Different level tasks (win conditions other than hit the target)
- [ ] Collision handler variety
  - [ ] Destroy smaller object completely
  - [ ] Merge objects
- [ ] Touch inputs
