
import { MAP_CONFIG, SPRITES_CONFIG } from '../config';

export class GameScene extends Phaser.Scene {

    terrainsLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    pickupsLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    collisionsLayer: Phaser.Tilemaps.DynamicTilemapLayer;

    constructor () {
        super({ key: 'GameScene' });
    }

    public preload() {
        this.load.image('terrains', '../assets/images/sprites/terrains.png');
        this.load.image('pickups', '../assets/images/sprites/pickups.png');
        this.load.image('collisions', '../assets/images/sprites/collisions.png');
        this.load.spritesheet('player', '../assets/images/sprites/player.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 0,
            spacing: 0
        });
        this.load.tilemapTiledJSON('map', '../assets/levels/1/level-1.json');
    }

    public create() {
        const map = this.make.tilemap({ key: 'map' });

        const terrains = map.addTilesetImage('terrains', null, 32, 32, 0, 0);
        const pickups = map.addTilesetImage('pickups', null, 32, 32, 0, 0);
        const collisions = map.addTilesetImage('collisions', null, 32, 32, 0, 0);

        this.terrainsLayer = map.createDynamicLayer('terrains', terrains, 0, 0);
        this.pickupsLayer = map.createDynamicLayer('pickups', pickups, 0, 0);
        this.collisionsLayer = map.createDynamicLayer('collisions', collisions, 0, 0).setVisible(false);

        // this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.add.text(16, 16, 'Lorem ipsum', {
                font: '18px monospace',
                fill: '#000000',
                padding: { x: 20, y: 10 },
                backgroundColor: '#ffffff'
            })
            .setScrollFactor(0);
    }

    public update(time, delta) {
    }
}
