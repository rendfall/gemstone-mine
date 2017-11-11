import Phaser from 'phaser';

export const PHASER_CONFIG = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    localStorageName: 'gemstone-mine'
};

export const SPRITES_CONFIG = {
    spriteSize: 32,
    animations: {
        STILL_UP: 'still-up',
        STILL_DOWN: 'still-down',
        STILL_SIDE: 'still-side',
        WALKING_UP: 'walking-up',
        WALKING_DOWN: 'walking-down',
        WALKING_SIDE: 'walking-side'
    },
    animationSpeed: {
        NORMAL: 6,
        SLOW: 4,
        SLOWEST: 2
    },
    directions: {
        UP: 'up',
        RIGHT: 'right',
        DOWN: 'down',
        LEFT: 'left'
    },
    anchor: {
        X: 0.5,
        Y: 1
    },
    walkingSpeed: {
        NORMAL: 1,
        SLOW: 0.5,
        SLOWEST: 0.25
    }
};
