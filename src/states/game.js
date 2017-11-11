import Phaser from 'phaser'

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
        let result = this.findObjectsByType('player', map, 'game-objects');
        let startingTile = map.getTile(2, 3, 'terrain');

        this.game.add.sprite(
            startingTile.x * startingTile.width,
            startingTile.y * startingTile.height,
            'player'
        );
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
