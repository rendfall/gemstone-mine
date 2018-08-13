import { SPRITES_CONFIG } from '../config';

export class AbstractSprite {
    spriteName = null;
    spritesheetPath = null;
    initialTile = null;
    currentTile = null;
    nextTile = null;
    animationSpeed = 0;
    isWalkingAnimation = false;
    collisions = null;
    walkingDirection = null;
    walkingSpeed = 0;
    isMoving = false;
    scene = null;
    sprite = null;

    constructor(scene, spriteName) {
        // super(scene, 32, 32, spriteName);
        this.scene = scene;
        this.spriteName = spriteName;
    }

    addBasicAnimation() {
        let { STILL_DOWN, STILL_UP, STILL_SIDE } = SPRITES_CONFIG.animations;
        let { WALKING_DOWN, WALKING_UP, WALKING_SIDE } = SPRITES_CONFIG.animations;

        this.sprite.animations.add(STILL_DOWN, [0]);
        this.sprite.animations.add(STILL_UP, [2]);
        this.sprite.animations.add(STILL_SIDE, [4]);
        this.sprite.animations.add(WALKING_DOWN, [0, 1], this.animationSpeed, true);
        this.sprite.animations.add(WALKING_UP, [2, 3], this.animationSpeed, true);
        this.sprite.animations.add(WALKING_SIDE, [4, 5], this.animationSpeed, true);
    }

    updateIdleAnimation() {
        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;
        let { STILL_DOWN, STILL_UP, STILL_SIDE } = SPRITES_CONFIG.animations;

        switch(this.walkingDirection) {
            case UP:
                this.sprite.animations.play(STILL_UP);
                break;

            case RIGHT:
                this.sprite.scale.x = -1;
                this.sprite.animations.play(STILL_SIDE);
                break;

            case DOWN:
                this.sprite.animations.play(STILL_DOWN);
                break;

            case LEFT:
                this.sprite.scale.x = 1;
                this.sprite.animations.play(STILL_SIDE);
                break;
        }
        this.sprite.animations.stop();
    }

    updateWalkingAnimation() {
        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;
        let { WALKING_DOWN, WALKING_UP, WALKING_SIDE } = SPRITES_CONFIG.animations;

        switch (this.walkingDirection) {
            case UP:
                this.sprite.animations.play(WALKING_UP);
                break;

            case RIGHT:
                this.sprite.scale.x = -1;
                this.sprite.animations.play(WALKING_SIDE);
                break;

            case DOWN:
                this.sprite.animations.play(WALKING_DOWN);
                break;

            case LEFT:
                this.sprite.scale.x = 1;
                this.sprite.animations.play(WALKING_SIDE);
                break;
        }
    }

    updateAnimation() {
        if (this.isWalkingAnimation) {
            this.updateWalkingAnimation();
        } else {
            this.updateIdleAnimation();
        }
    }

    move() {
        if (!this.isMoving) return;

        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;

        switch (this.walkingDirection) {
            case UP:
                this.sprite.y -= this.walkingSpeed;
                break;

            case RIGHT:
                this.sprite.x += this.walkingSpeed;
                break;

            case DOWN:
                this.sprite.y += this.walkingSpeed;
                break;

            case LEFT:
                this.sprite.x -= this.walkingSpeed;
                break;
        }
    }

    getCurrentTile() {
        let spriteX = this.sprite.x - (SPRITES_CONFIG.anchor.X * SPRITES_CONFIG.spriteSize);
        let spriteY = this.sprite.y - SPRITES_CONFIG.spriteSize;
        return {
            x: spriteX / SPRITES_CONFIG.spriteSize,
            y: spriteY / SPRITES_CONFIG.spriteSize
        };
    }

    updateNextTile() {
        if (!this.currentTile) {
            console.warn('AbstractSprite:updateNextTile - Strange... There is no currentTile');
            return;
        }

        let { UP, RIGHT, DOWN, LEFT } = SPRITES_CONFIG.directions;

        switch (this.walkingDirection) {
            case UP:
                this.nextTile = { x: this.currentTile.x, y: this.currentTile.y - 1 };
                break;

            case RIGHT:
                this.nextTile = { x: this.currentTile.x + 1, y: this.currentTile.y };
                break;

            case DOWN:
                this.nextTile = { x: this.currentTile.x, y: this.currentTile.y + 1 };
                break;

            case LEFT:
                this.nextTile = { x: this.currentTile.x - 1, y: this.currentTile.y };
                break;
        }
    }

    getTileX(x) {
        return (SPRITES_CONFIG.anchor.X * SPRITES_CONFIG.spriteSize) + (x * SPRITES_CONFIG.spriteSize);
    }

    getTileY(y) {
        return (SPRITES_CONFIG.anchor.Y * SPRITES_CONFIG.spriteSize) + (y * SPRITES_CONFIG.spriteSize);
    }

    isOnTile() {
        let spriteX = this.sprite.x + (SPRITES_CONFIG.anchor.X * SPRITES_CONFIG.spriteSize);
        let spriteY = this.sprite.y;
        return (spriteX % SPRITES_CONFIG.spriteSize === 0)
            && (spriteY % SPRITES_CONFIG.spriteSize === 0);
    }
}
