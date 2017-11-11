import 'pixi';
import 'p2';
import Phaser from 'phaser';

class Game extends Phaser.Game {
    constructor () {
        super();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
}, false);
