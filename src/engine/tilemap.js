import Phaser from 'phaser';

import { MAP_CONFIG } from '../config';

export default class Tilemap {
    map = null;
    level = null;
    layers = new Map();

    constructor(game, levelNumber) {
        this.game = game;
        this.level = MAP_CONFIG.levels[levelNumber - 1];
    }

    preload() {
        let tilemap = this.level.TILEMAP;
        let tilesets = this.level.TILESETS || [];
        this.game.load.tilemap(
            tilemap.name,
            tilemap.src,
            null,
            Phaser.Tilemap.TILED_JSON
        );

        tilesets.forEach((tileset) => {
            this.game.load.image(tileset.name, tileset.src);
        });
    }

    setup() {
        this.setupTilemap();
        this.setupTilesets();
        this.setupLayers();
        this.setupCollisions();
    }

    setupTilemap() {
        let tilemap = this.level.TILEMAP;
        this.map = this.game.add.tilemap(tilemap.name);
    }

    setupTilesets() {
        let tilesets = this.level.TILESETS || [];

        tilesets.forEach((tileset) => {
            this.map.addTilesetImage(tileset.name);
        });
    }

    setupLayers() {
        // TODO(rendfall): Use one loop to create and set to map.
        let backgroundsLayer = this.map.createLayer('backgrounds');
        let level1Layer = this.map.createLayer('terrains');
        let collisionsLayer = this.map.createLayer('collisions');

        backgroundsLayer.resizeWorld();
        level1Layer.resizeWorld();
        collisionsLayer.alpha = 0;
        collisionsLayer.resizeWorld();

        this.layers.set('backgrounds', backgroundsLayer);
        this.layers.set('level-1', level1Layer);
        this.layers.set('collisions', collisionsLayer);
    }

    setupCollisions() {
        let collisionsLayer = this.layers.get('collisions');
        let level1Layer = this.layers.get('level-1');
        let collisionTile;
        let targetTile;
        let hasCollision;

        for (let i = 0; i < this.map.height; i++) {
            for (let j = 0; j < this.map.width ; j++) {
                collisionTile = collisionsLayer.layer.data[i][j];
                // TODO(rendfall) How to avoid this nasty magic number?
                hasCollision = (collisionTile.index > 4);
                targetTile = level1Layer.layer.data[i][j];
                targetTile.collideDown = hasCollision;
                targetTile.collideLeft = hasCollision;
                targetTile.collideRight = hasCollision;
                targetTile.collideUp = hasCollision;
            }
        }
    }

    getSurroundingCollisionsAt(tile) {
        let surroundings = {
            up: false,
            right: false,
            down: false,
            left: false
        };

        let tileUp = {
            x: tile.x,
            y: tile.y - 1
        };

        surroundings.up = (tileUp.y < 0) || this.getCollisionAt(tileUp);

        let tileRight = {
            x: tile.x + 1,
            y: tile.y
        };

        surroundings.right = (tileRight.x >= this.map.width) || this.getCollisionAt(tileRight);

        let tileDown = {
            x: tile.x,
            y: tile.y + 1
        };

        surroundings.down = (tileDown.y >= this.map.height) || this.getCollisionAt(tileDown);

        let tileLeft = {
            x: tile.x - 1,
            y: tile.y
        };

        surroundings.left = (tileLeft.x < 0) || this.getCollisionAt(tileLeft);

        return surroundings;
    }

    getCollisionAt(tile) {
        let tilesLayer = this.layers.get('level-1');
        let tileData = tilesLayer.layer.data[tile.y][tile.x];
        return tileData.collideUp
            && tileData.collideRight
            && tileData.collideDown
            && tileData.collideLeft;
    }

    setCollisionAt(tile, hasCollision) {
        let tilesLayer = this.layers.get('level-1');
        let tileData = tilesLayer.layer.data[tile.y][tile.x];
        tileData.collideUp = hasCollision;
        tileData.collideRight = hasCollision;
        tileData.collideDown = hasCollision;
        tileData.collideLeft = hasCollision;
    }
}
