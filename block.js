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
        life: p[2] || 1,
    }

    o.destroy = function() {
        o.life -= 1
        if (o.life < 1) {
            o.alive = false
        }
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
