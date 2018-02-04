import 'phaser'

import { SPRITES_CONFIG } from '../config';
import { Tilemap } from '../engine/tilemap';
import { Player } from '../sprites/player';
import { Snake } from '../sprites/snake';

export class GameScene extends Phaser.Scene {
    isUpPressed = false;
    isRightPressed = false;
    isDownPressed = false;
    isLeftPressed = false;
    keyboard = null;
    enemies = [];

    constructor () {
        super({ key: 'GameScene' });
    }

    init() {
        this.tilemap = new Tilemap(this, 1);
        this.player = new Player(this, this.tilemap);

        let snake1 = new Snake('snake1', this, this.tilemap);
        let snake2 = new Snake('snake2', this, this.tilemap);
        let snake3 = new Snake('snake3', this, this.tilemap);
        let snake4 = new Snake('snake4', this, this.tilemap);

        this.enemies.push(snake1);
        this.enemies.push(snake2);
        this.enemies.push(snake3);
        this.enemies.push(snake4);
    }

    preload() {
        // TODO(rendfall): How bind custom class to these hooks?
        this.tilemap.preload();
        this.player.preload();

        this.enemies.forEach((enemy) => {
            enemy.preload();
        });
    }

    update() {
        this.player.update({
            up: this.keyboard.isDown(Phaser.Keyboard.UP) || this.isUpPressed,
            right: this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.isRightPressed,
            down: this.keyboard.isDown(Phaser.Keyboard.DOWN) || this.isDownPressed,
            left: this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.isLeftPressed
        });

        this.enemies.forEach((enemy) => {
            enemy.update();
        });
    }

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#333";

        this.tilemap.setup();
        this.player.setup({ x: 2, y: 3 });

        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;
        this.enemies[0].setup({ x: 8, y: 2 }, UP);
        this.enemies[1].setup({ x: 14, y: 3 }, DOWN);
        this.enemies[2].setup({ x: 3, y: 10 }, LEFT);
        this.enemies[3].setup({ x: 7, y: 10 }, RIGHT);

        this.keyboard = this.input.keyboard;
    }
}
