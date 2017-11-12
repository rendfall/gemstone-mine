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
        // TODO(rendfall): Must be even number larger then 1. Why?
        NORMAL: 2,
        SLOW: 0.5,
        SLOWEST: 0.25
    }
};

export const MAP_CONFIG = {
    levels: [
        {
            TILEMAP: {
                name: 'level-1',
                src: 'assets/levels/1/level-1.json'
            },
            TILESETS: [
                { name: 'terrains', src: 'assets/images/sprites/terrains.png' },
                { name: 'collisions', src: 'assets/images/sprites/collisions.png' }
            ],
            LAYERS: [
                'backgrounds',
                'terrains',
                'collisions'
            ]
        }
    ]
};
