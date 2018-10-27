const Block = function() {
    const image = imgFromPath('block.png')

    const o = {
        image: image,
        x: 100,
        y: 100,
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
