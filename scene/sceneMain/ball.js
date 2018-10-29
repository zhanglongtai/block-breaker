const Ball = function(game) {
    const o = game.imgByName('ball')

    // const o = {
    //     image: image,
    //     x: 100,
    //     y: 220,
    //     speedX: 5,
    //     speedY: 5,
    //     fired: false,
    // }
    o.x = 130
    o.y = 240
    o.speedX = 5
    o.speedY = 5
    o.fired = false

    o.fire = function() {
        o.fired = true
    }

    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
    
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
    
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    o.reverse = function() {
        o.speedY = -o.speedY
    }

    o.hasPoint = function(x, y) {
        const xIn = x >= o.x && x <= (o.x + o.width)
        const yIn = y >= o.y && y <= (o.y + o.height)

        return xIn && yIn
    }

    return o
}
