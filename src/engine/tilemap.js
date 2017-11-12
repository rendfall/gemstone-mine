import Phaser from 'phaser';

import { MAP_CONFIG } from '../config';
import MapObjects from './map-objects';

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

        this.mapObjects.setupScoreBoard();
    }

    setupTilemap() {
        let tilemap = this.level.TILEMAP;
        this.map = this.game.add.tilemap(tilemap.name);
        this.mapObjects = new MapObjects(game, this.map);
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
        let terrainsLayer = this.map.createLayer('terrains');
        let collisionsLayer = this.map.createLayer('collisions');
        let objectsLayer = this.map.createLayer('objects');

        backgroundsLayer.resizeWorld();
        terrainsLayer.resizeWorld();
        collisionsLayer.alpha = 0;
        collisionsLayer.resizeWorld();
        objectsLayer.resizeWorld();

        this.layers.set('backgrounds', backgroundsLayer);
        this.layers.set('terrains', terrainsLayer);
        this.layers.set('collisions', collisionsLayer);
        this.layers.set('objects', objectsLayer);
    }

    triggerAction(tile) {
        let objectTile = this.getTileObject(tile);

        if (!objectTile) return;

        switch (objectTile.properties.type) {
            case 'gem':
                return this.mapObjects.pickupGem(objectTile);

            case 'exit':
                return this.mapObjects.tryExit(objectTile);
        }
    }

    getTileObject(tile) {
        return this.map.getTile(tile.x, tile.y, 'objects');
    }

    putTile(index, tile) {
        this.map.putTile(index, tile.x, tile.y, 'terrains');
    }

    removeTile(tile) {
        this.map.removeTile(tile.x, tile.y, 'terrains');
    }

    setupCollisions() {
        let collisionsLayer = this.layers.get('collisions');
        let objectsLayer = this.layers.get('objects');
        let terrainsLayer = this.layers.get('terrains');

        for (let i = 0; i < this.map.height; i++) {
            for (let j = 0; j < this.map.width ; j++) {
                let collisionsTile = collisionsLayer.layer.data[i][j];
                let targetTile = terrainsLayer.layer.data[i][j];
                let objectsTile = objectsLayer.layer.data[i][j];

                if (collisionsTile.properties.collision) {
                    this.setTileAsCollider(targetTile);
                }

                if (collisionsTile.properties.action) {
                    this.setTileAsInteract(targetTile, objectsTile.properties.type);
                }

                if (objectsTile.properties) {
                    this.setupTileProperties(objectsTile);
                }
            }
        }
    }

    setTileAsCollider(tile) {
        tile.collideDown = true;
        tile.collideLeft = true;
        tile.collideRight = true;
        tile.collideUp = true;
    }

    setupTileProperties(tile) {
        switch (tile.properties.type) {
            case 'gem':
                return this.mapObjects.addGem();

            case 'exit':
                return this.mapObjects.addExit(tile);
        }
    }

    setTileAsInteract(tile, type) {
        tile.properties.type = type;
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
        let terrainsLayer = this.layers.get('terrains');
        let tileData = terrainsLayer.layer.data[tile.y][tile.x];
        return tileData.collideUp
            && tileData.collideRight
            && tileData.collideDown
            && tileData.collideLeft;
    }

    setCollisionAt(tile, hasCollision) {
        let terrainsLayer = this.layers.get('terrains');
        let tileData = terrainsLayer.layer.data[tile.y][tile.x];
        tileData.collideUp = hasCollision;
        tileData.collideRight = hasCollision;
        tileData.collideDown = hasCollision;
        tileData.collideLeft = hasCollision;
    }
}
