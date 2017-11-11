import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class BootstrapState extends Phaser.State {
    constructor () {
        super({ key: 'BootstrapState' });
    }

    preload() {
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Centered the game
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/tilesets/tiles-sprite.png');
        this.load.image('player', 'assets/images/sprites/player.png');

        WebFont.load({
            google: {
                families: ['Roboto']
            },
            active: this.fontsLoaded
        })
    }

    update() {
        if (this.fontsReady) {
            this.state.start('GameState');
        }
    }

    fontsLoaded () {
        this.fontsReady = true
    }
}
