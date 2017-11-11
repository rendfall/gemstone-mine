import AbstractSprite from './abstract-sprite';
import { SPRITES_CONFIG } from '../config';

export default class Player extends AbstractSprite {
    constructor(game, map) {
        let spriteName = 'player';
        super(game, 0, 0, spriteName);

        this.map = map;
        this.spriteName = spriteName;
        this.spritesheetPath = 'assets/images/sprites/player.png';
    }

    preload() {
        this.game.load.spritesheet(
            this.spriteName,
            this.spritesheetPath,
            0,
            0
        );
    }

    // update(isUpPressed, isRightPressed, isDownPressed, isLeftPressed) {
    update(keyPressedState) {
        this.keyPressedState = keyPressedState;

        if(this.isOnTile()) {
            this.updateWhenOnTile();
        } else {
            this.updateWhenNextTile();
        }

        this.setAnimation();
        this.move();
    }

    updateWhenNextTile() {
        this.updateNextTile();
        this.isCollision = false;
    }

    updateWhenOnTile() {
        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;
        let keyPressedState = this.keyPressedState;

        this.currentTile = this.getCurrentTile();

        if (keyPressState.up) {
            this.walkingDirection = UP;
            if (!this.isCollision) {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            } else {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            }

        } else if (keyPressState.right) {
            this.walkingDirection = RIGHT;
            if (!this.isCollision) {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            } else {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            }

        } else if (keyPressedState.down) {
            this.walkingDirection = DOWN;
            if (!this.isCollision) {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            } else {
                this.isWalkingAnimation = false;
                this.isMoving = false;
            }

        } else if (keyPressedState.left) {
            this.walkingDirection = LEFT;
            if (!this.isCollision) {
                this.isWalkingAnimation = true;
                this.isMoving = true;
            } else {
                this.isWalkingAnimation = false;
                this.isMoving = false;
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
        this.game.add.sprite(
            this.getTileX(this.initialTile.x),
            this.getTileY(this.initialTile.y),
            this.spriteName
        );
    }

    setupAnchor() {
        this.anchor.setTo(
            SPRITES_CONFIG.anchor.X,
            SPRITES_CONFIG.anchor.Y
        );
    }

    setupMovement() {
        this.walkingSpeed = SPRITES_CONFIG.walkingSpeed.NORMAL;
        this.walkingDirection = SPRITES_CONFIG.direction.DOWN;
    }

    setupAnimation() {
        this.animationSpeed = SPRITES_CONFIG.animationSpeed.NORMAL;
        this.addBasicAnimation();
    }
}
