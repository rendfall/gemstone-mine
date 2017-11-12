import AbstractSprite from './abstract-sprite';
import { SPRITES_CONFIG } from '../config';

export default class Player extends AbstractSprite {
    tilemap = null;
    keyPressedState = {
        up: false,
        right: false,
        down: false,
        left: false
    };
    isPlayerEntered = false;

    constructor(game, map) {
        let spriteName = 'player';
        super(game, spriteName);

        this.tilemap = map;
        this.spriteName = spriteName;
        this.spritesheetPath = 'assets/images/sprites/player.png';
    }

    preload() {
        this.game.load.spritesheet(
            this.spriteName,
            this.spritesheetPath,
            SPRITES_CONFIG.spriteSize,
            SPRITES_CONFIG.spriteSize
        );
    }

    update(keyPressedState) {
        this.keyPressedState = keyPressedState;

        if (this.isOnTile()) {
            this.updateWhenOnTile();
        } else {
            this.updateWhenNextTile();
        }

        this.updateAnimation();
        this.move();
    }

    updateWhenNextTile() {
        this.isPlayerEntered = true;
        this.updateNextTile();
        this.tilemap.removeTile(this.nextTile);
        this.tilemap.setCollisionAt(this.nextTile, true);
        this.collisions = this.tilemap.getSurroundingCollisionsAt(this.nextTile);
    }

    updateWhenOnTile() {
        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;
        let keyPressedState = this.keyPressedState;

        if (this.currentTile) {
            this.tilemap.setCollisionAt(this.currentTile, false);
        }

        this.currentTile = this.getCurrentTile();

        if (this.isPlayerEntered) {
            this.isPlayerEntered = false;
            this.tilemap.setInteraction(this.currentTile);
        }

        this.tilemap.setCollisionAt(this.currentTile, true);
        this.surroundingCollisions = this.tilemap.getSurroundingCollisionsAt(this.currentTile);

        if (keyPressedState.up) {
            this.walkingDirection = UP;

            if (this.surroundingCollisions.up) {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            } else {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            }
        } else if (keyPressedState.right) {
            this.walkingDirection = RIGHT;

            if (this.surroundingCollisions.right) {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            } else {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            }
        } else if (keyPressedState.down) {
            this.walkingDirection = DOWN;

            if (this.surroundingCollisions.down) {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            } else {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            }
        } else if (keyPressedState.left) {
            this.walkingDirection = LEFT;

            if (this.surroundingCollisions.left) {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            } else {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            }
        } else {
            this.isWalkingAnimation = false;
            this.isMoving = false;
        }
    }

    setup(tile) {
        this.initialTile = tile;
        this.setupSprite();
        this.setupAnchor();
        this.setupMovement();
        this.setupAnimation();
    }

    setupSprite() {
        this.sprite = this.game.add.sprite(
            this.getTileX(this.initialTile.x),
            this.getTileY(this.initialTile.y),
            this.spriteName
        );

        this.game.camera.follow(this.sprite);
    }

    setupAnchor() {
        this.sprite.anchor.setTo(
            SPRITES_CONFIG.anchor.X,
            SPRITES_CONFIG.anchor.Y
        );
    }

    setupMovement() {
        this.walkingSpeed = SPRITES_CONFIG.walkingSpeed.NORMAL;
        this.walkingDirection = SPRITES_CONFIG.directions.DOWN;
    }

    setupAnimation() {
        this.animationSpeed = SPRITES_CONFIG.animationSpeed.NORMAL;
        this.addBasicAnimation();
    }
}
