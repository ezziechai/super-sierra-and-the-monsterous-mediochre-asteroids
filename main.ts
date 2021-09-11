// Game over code
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, otherSprite) {
    game.over(false)
})

// Scoring script
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
})

// Win code
game.onUpdate(function() {
    if (info.score() == 60) {
        game.over(true, effects.smiles)
    }
})

// Reset score
info.setScore(0)

// Ship setup
let ship = sprites.create(img`
    ........feebbbef........
    ........f24bdb2e........
    .......ce2222222e.......
    ......cbc22bb22e6cf.....
    ......b962e99e2b6dc.....
    ......c6b2e69e2e6bf.....
    ...cccee222ab222eeeccc..
    .fbbbddddb4eeebbbbbbbbcf
    febbddbcdddbbdddbcbbbbbf
    fe2bddcbdddcbddddccbb42f
    .f24bddddddbbdddbbbb42f.
    ..ff24bddddddddbbbb22f..
    ....fee244bbbb4444ee....
    .....fbbe2222e22ebbf....
    ......ffffbbbbfffff.....
    ..........fffff.........
`, SpriteKind.Player)
ship.setPosition(20, 60)
game.showLongText("Hello! Can you get me past the asteroids using the joystick (up and down only)?", DialogLayout.Bottom)
if (info.score() > 50) {
    controller.moveSprite(ship, 0, 100)
} else if (info.score() > 40) {
    controller.moveSprite(ship, 0, 150)
} else if (info.score() > 30) {
    controller.moveSprite(ship, 0, 200)
} else if (info.score() > 20) {
    controller.moveSprite(ship, 0, 250)
} else if (info.score() > 10) {
    controller.moveSprite(ship, 0, 300)
} else {
    controller.moveSprite(ship, 0, 350)
}
ship.setFlag(SpriteFlag.StayInScreen, true)

// Code for asteroid

// Interval between asteroid spawnings
let timeInterval = 1000

game.onUpdateInterval(timeInterval, function () {
    // Spawn asteroids every second
    let asteroid = sprites.create(img`
        . . . . . . . . . c c 8 . . . .
        . . . . . . 8 c c c f 8 c c . .
        . . . c c 8 8 f c a f f f c c .
        . . c c c f f f c a a f f c c c
        8 c c c f f f f c c a a c 8 c c
        c c c b f f f 8 a c c a a a c c
        c a a b b 8 a b c c c c c c c c
        a f c a a b b a c c c c c f f c
        a 8 f c a a c c a c a c f f f c
        c a 8 a a c c c c a a f f f 8 a
        . a c a a c f f a a b 8 f f c a
        . . c c b a f f f a b b c c 6 c
        . . . c b b a f f 6 6 a b 6 c .
        . . . c c b b b 6 6 a c c c c .
        . . . . c c a b b c c c . . . .
        . . . . . c c c c c c . . . . .
    `, SpriteKind.Enemy)

    // Set asteroids' position, velocity, and spawning rate
    if (info.score() > 50) {
        asteroid.vx = -140
        timeInterval = 50
    } else if (info.score() > 40) {
        asteroid.vx = -120
        timeInterval = 100
    } else if (info.score() > 30) {
        asteroid.vx = -100
        timeInterval = 200
    } else if (info.score() > 20) {
        asteroid.vx = -80
        timeInterval = 300
    } else if (info.score() > 10) {
        asteroid.vx = -60
        timeInterval = 800
    } else {
        asteroid.vx = -40
        timeInterval = 1000
    }

    asteroid.x = 140
    asteroid.y = randint(10, 110)

    // Destroy asteroids when they touch the edge of the screen
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
})