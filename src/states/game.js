import Phaser from 'phaser'

import Tilemap from '../engine/tilemap';
import Player from '../sprites/player';

export default class GameState extends Phaser.State {
    constructor () {
        super({ key: 'GameState' });
    }

    init() {
        this.tilemap = new Tilemap(this.game, 1);
        this.player = new Player(this.game, this.tilemap);
    }

    preload() {
        // TODO(rendfall): How bind custom class to these hooks?
        this.tilemap.preload();
        this.player.preload();
    }

    update() {}

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#333";

        this.tilemap.setup();
        this.player.setup({ x: 2, y: 3 });
    }
}
