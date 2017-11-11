import 'pixi';
import 'p2';
import Phaser from 'phaser';

import config from './config';
import BootstrapState from './states/bootstrap';
import GameState from './states/game';

class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.state.add('BootstrapState', BootstrapState, false);
        this.state.add('GameState', GameState, false);

        this.state.start('BootstrapState');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
}, false);
