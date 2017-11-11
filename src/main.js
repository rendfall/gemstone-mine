import 'pixi';
import 'p2';
import Phaser from 'phaser';

import config from './config';

class Game extends Phaser.Game {
    constructor() {
        super(config);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
}, false);
