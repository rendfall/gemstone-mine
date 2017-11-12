import Phaser from 'phaser';

import { MAP_CONFIG } from '../config';

export default class Tilemap {
    level = null;
    tilemap = null;
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
        let tilemap = this.level.TILEMAP;
        let tilesets = this.level.TILESETS || [];
        let map = this.game.add.tilemap(tilemap.name);
        let collisionTile;
        let targetTile;
        let hasCollision;

        tilesets.forEach((tileset, i) => {
            map.addTilesetImage(tileset.name);
            let layer = map.createLayer(i);
            layer.resizeWorld();
            this.layers.set(tileset.name, layer);
        });

        let collisionsLayer = this.layers.get('collisions').layer;

        for (let i = 0; i < map.height; i++) {
            for (let j = 0; j < map.width ; j++) {
                collisionTile = collisionsLayer.data[i][j];
                // TODO(rendfall) How to avoid this nasty magic number?
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

        let tileUp = {
            x: tile.x,
            y: tile.y - 1
        };

        surroundings.up = (tileUp.y < 0) || this.getCollisionAt(tileUp);

        let tileRight = {
            x: tile.x + 1,
            y: tile.y
        };

        surroundings.right = (tileRight.x >= this.tilemap.width) || this.getCollisionAt(tileRight);

        let tileDown = {
            x: tile.x,
            y: tile.y + 1
        };

        surroundings.down = (tileDown.y >= this.tilemap.height) || this.getCollisionAt(tileDown);

        let tileLeft = {
            x: tile.x - 1,
            y: tile.y
        };

        surroundings.left = (tileLeft.x < 0) || this.getCollisionAt(tileLeft);

        return surroundings;
    }

    getCollisionAt(tile) {
        let tilesLayer = this.layers.get(this.level.TILEMAP.name);
        let tileData = tilesLayer.data[tile.y][tile.x];
        return tileData.collideUp
            && tileData.collideRight
            && tileData.collideDown
            && tileData.collideLeft;
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
