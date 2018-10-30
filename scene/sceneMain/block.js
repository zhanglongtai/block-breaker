const Block = function(game, position) {
    // position: [0, 100] --> x, y
    const o = game.imgByName('block')

    const p = position
    // const o = {
    //     image: image,
    //     x: p[0],
    //     y: p[1],
    //     width: 100,
    //     height: 12,
    //     alive: true,
    //     life: p[2] || 1,
    // }
    o.x = p[0]
    o.y = p[1]
    o.alive = true
    o.life = p[2] || 1

    o.destroy = function() {
        o.life -= 1
        if (o.life < 1) {
            o.alive = false
        }
    }

    o.collide = function(ball) {
        return o.alive && rectIntersects(o, ball) || rectIntersects(ball, o)
    }

    o.hasPoint = function(x, y) {
        const xIn = x >= o.x && x <= (o.x + o.width)
        const yIn = y >= o.y && y <= (o.y + o.height)

        return xIn && yIn
    }

    return o
}
