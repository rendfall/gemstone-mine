import 'phaser';

import { PHASER_CONFIG } from './config';

document.addEventListener('DOMContentLoaded', () => {
    window.game = new Phaser.Game(PHASER_CONFIG);
}, false);
