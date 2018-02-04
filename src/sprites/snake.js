import { AbstractSprite } from './abstract-sprite';
import { SPRITES_CONFIG } from '../config';

export class Snake extends AbstractSprite {
    tilemap = null;

    constructor(name, scene, map) {
        let spriteName = name;
        super(scene, spriteName);

        this.tilemap = map;
        this.spriteName = spriteName;
        this.spritesheetPath = 'assets/images/sprites/snake.png';
    }

    preload() {
        this.scene.load.spritesheet(
            this.spriteName,
            this.spritesheetPath,
            SPRITES_CONFIG.spriteSize,
            SPRITES_CONFIG.spriteSize
        );
    }

    update() {
        if (this.isOnTile()) {
            this.updateWhenOnTile();
        } else {
            this.updateWhenNextTile();
        }

        this.updateAnimation();
        this.move();
    }

    updateWhenNextTile() {
        this.updateNextTile();
        this.tilemap.setCollisionAt(this.nextTile, true);
        this.collisions = this.tilemap.getSurroundingCollisionsAt(this.nextTile, true);
        this.surroundingCollisions = this.tilemap.getSurroundingCollisionsAt(this.nextTile, true);
    }

    updateWhenOnTile() {
        if (this.currentTile) {
            this.tilemap.setCollisionAt(this.currentTile, false);
        }

        this.currentTile = this.getCurrentTile();
        this.tilemap.setCollisionAt(this.currentTile, true);
        this.surroundingCollisions = this.tilemap.getSurroundingCollisionsAt(this.currentTile, true);

        this.reverseDirectionOnCollision();
    }

    reverseDirectionOnCollision() {
        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;

        switch (this.walkingDirection) {
            case UP:
                if (this.surroundingCollisions.up) {
                    this.walkingDirection = DOWN;
                }
                break;

            case RIGHT:
                if (this.surroundingCollisions.right) {
                    this.walkingDirection = LEFT;
                }
                break;

            case DOWN:
                if (this.surroundingCollisions.down) {
                    this.walkingDirection = UP;
                }
                break;

            case LEFT:
                if (this.surroundingCollisions.left) {
                    this.walkingDirection = RIGHT;
                }
                break;
        }
    }

    setup(tile, direction = SPRITES_CONFIG.UP) {
        this.initialTile = tile;
        this.setupSprite();
        this.setupAnchor();
        this.setupMovement(direction);
        this.setupAnimation();
    }

    setupSprite() {
        this.sprite = this.scene.add.sprite(
            this.getTileX(this.initialTile.x),
            this.getTileY(this.initialTile.y),
            this.spriteName
        );
    }

    setupAnchor() {
        this.sprite.anchor.setTo(
            SPRITES_CONFIG.anchor.X,
            SPRITES_CONFIG.anchor.Y
        );
    }

    setupMovement(direction) {
        this.walkingSpeed = SPRITES_CONFIG.walkingSpeed.NORMAL;
        this.walkingDirection = SPRITES_CONFIG.directions.DOWN;
        this.isMoving = true;
        this.walkingDirection = direction;
    }

    setupAnimation() {
        this.animationSpeed = SPRITES_CONFIG.animationSpeed.NORMAL;
        this.addBasicAnimation();
    }
}
