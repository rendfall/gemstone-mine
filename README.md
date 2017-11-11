# Gemstone Mine 💎

> Tile-based game with gems and stuffs...

## Tools of choice 🔧

* Phaser CE 2.9.1
* Webpack
* Nodemon

## Game rules 🎲

* Collect 80% gemstones on the level to open stairs to next level
* Avoid almost everything what moves - it can kill you!
* You have only 3 lifes so don't play hero

## Almanac 📖

### Pickups

#### Gemstone 💎

* You must collect them to go deeper
* They are so precious on the surface that it is worth risking for them life!
* Just collect 80% of gemstones to open the descent to the next level

#### Potion of protection 🛡

#### Potion of time ⏳

### Monsters

#### Snake 🐍

* Move only straight

#### Crazy Frog 🐸

* Jumps over 2 tiles
* Can attack with it's tongue

#### Poltergeist 👻

* Teleports to random tile every 10 moves
* Don't kills - only paralyze for 3s
* Move through every obstacles

#### Righteous Skull 💀

* Always turns right
* Have 0.1% chance to turns back spontaneously

#### Scavenger 🐀

* Can dig
* Is blind so digs randomly direction

#### Sinister weed 🌱

* Every 10s replicates itself
* Doesn't kill immediately, but can devour player (instant death)

## Roadmap (TODO list)

* [x] Create TileMap (level1)
* [ ] Create base states: Menu, Game, EndGame
* [x] Create Player Sprite object
* [ ] Handle inputs (keyboard)
* [ ] Implement tile-based movement
* [ ] Add colliders to layers (terrain, obstacles, game-objects)
* [ ] Create pickups and add colliders
* [ ] Implement logic related to completing level
* [ ] Create Enemies Sprite objects and add colliders
* [ ] Implement AI based on individual features
* [ ] Create rest of levels based on existing one
* [ ] Add some animations

