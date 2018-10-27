const Block = function(position) {
    // position: [0, 100] --> x, y
    const image = imgFromPath('block.png')

    const p = position
    const o = {
        image: image,
        x: p[0],
        y: p[1],
        width: 100,
        height: 12,
        alive: true,
    }

    o.destroy = function() {
        o.alive = false
    }

    o.collide = function(ball) {
        if (o.alive) {
            return rectIntersects(o, ball) || rectIntersects(ball, o)
        } else {
            return false
        }
    }

    return o
}
