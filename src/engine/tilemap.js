import Phaser from 'phaser';

import { MAP_CONFIG } from '../config';

export default class Tilemap {
    level = null;
    tilemap = null;
    mainTileset = null;
    collisionsTileset = null;
    layers = new Map();
    collisionsLayer = null;

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
        let { TILEMAP, TILESETS } = this.level;
        let map = this.game.add.tilemap(TILEMAP.name);
        let collisionTile;
        let targetTile;
        let hasCollision;

        TILESETS.forEach((tileset, i) => {
            map.addTilesetImage(tileset.name);
            let layer = map.createLayer(i);
            layer.resizeWorld();
            this.layers.set(tileset.name, layer);
        });

        let collisionsLayer = this.layers.get('collisions').layer;

        for (let i = 0; i < map.height; i++) {
            for (let j = 0; j < map.width ; j++) {
                // get collision data from collision layer
                collisionTile = collisionsLayer.data[i][j];
                hasCollision = (collisionTile.index > 4);

                targetTile = collisionsLayer.data[i][j];
                targetTile.collideDown = hasCollision;
                targetTile.collideLeft = hasCollision;
                targetTile.collideRight = hasCollision;
                targetTile.collideUp = hasCollision;
            }
        }

        this.tilemap = map;
    }

    getSurroundingCollisionsAt(tile) {
        let surroundings = {
            up: false,
            right: false,
            down: false,
            left: false
        };

        // check tile up
        let tileUp = {
            x: tile.x,
            y: tile.y - 1
        };

        if (tileUp.y < 0) {
            surroundings.up = true;
        } else {
            surroundings.up = this.getCollisionAt(tileUp);
        }

        // check tile right
        let tileRight = {
            x: tile.x + 1,
            y: tile.y
        };

        if (tileRight.x >= this.tilemap.width) {
            surroundings.right = true;
        } else {
            surroundings.right = this.getCollisionAt(tileRight);
        }

        // check tile down
        let tileDown = {
            x: tile.x,
            y: tile.y + 1
        };
        if (tileDown.y >= this.tilemap.height) {
            surroundings.down = true;
        } else {
            surroundings.down = this.getCollisionAt(tileDown);
        }

        // check tile left
        let tileLeft = {
            x: tile.x - 1,
            y: tile.y
        };
        if(tileLeft.x < 0) {
            surroundings.left = true;
        } else {
            surroundings.left = getCollisionAt(tileLeft);
        }

        return surroundings;
    }

    getCollisionAt(tile) {
        let tilesLayer = this.layers.get(this.level.TILEMAP.name);
        let tileData = tilesLayer.data[tile.y][tile.x];
        let hasCollision = (tileData.collideUp && tileData.collideRight && tileData.collideDown && tileData.collideLeft);
        return hasCollision;
    }

    setCollisionAt(tile, hasCollision) {
        let tilesLayer = this.layers.get(this.level.TILEMAP.name);
        let tileData = tilesLayer.data[tile.y][tile.x];
        tileData.collideUp = hasCollision;
        tileData.collideRight = hasCollision;
        tileData.collideDown = hasCollision;
        tileData.collideLeft = hasCollision;
    }
}
