const Paddle = function(game) {
    const o = game.imgByName('paddle')

    // const o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15

    o.move = function(x) {
        if (x < 0) {
            x = 0
        }

        if (x > 400 - o.width) {
            x = 400 - o.width
        }

        o.x = x
    }

    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }

    o.moveRight = function() {
        o.move(o.x + o.speed)
    }

    const aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    o.collide = function(ball) {
        // return rectIntersects(o, ball) || rectIntersects(ball, o)
        const a = o
        const b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

    return o
}
