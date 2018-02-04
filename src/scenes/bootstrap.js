import 'phaser';

export class BootstrapScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootstrapScene' });
    }

    preload() {
    }

    create() {
        console.log('aaaa');
        this.scene.start('GameScene');
    }
}
