import Phaser from 'phaser'

import Player from '../sprites/player';

export default class GameState extends Phaser.State {
    constructor () {
        super({ key: 'GameState' });
    }

    init() {}

    preload() {}

    update() {}

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#333";

        let map = this.map = this.game.add.tilemap('level1');
        map.addTilesetImage('tiles-sprite', 'tiles');

        let terrainLayer = map.createLayer('terrain');
        let obstaclesLayer = map.createLayer('obstacles');
        // terrainLayer.resizeWorld();
        // obstaclesLayer.resizeWorld();

        // Collision on blockers
        map.setCollisionBetween(1, 2000, true, 'obstacles');

        // Player
        let player = new Player(this.game, map);
    }

    findObjectsByType(type, map, layer) {
        let result = [];

        map.objects[layer].forEach((element) => {
            if(element.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }
}
