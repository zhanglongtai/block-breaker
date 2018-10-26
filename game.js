const log = console.log.bind(console)

const imgFromPath = function(path) {
    const img = new Image()
    img.src = path

    return img
}

const Paddle = function() {
    const image = imgFromPath('paddle.png')

    const p = {
        image: image,
        x: 100,
        y: 250,
        speed: 15,
    }

    p.moveLeft = function() {
        p.x -= p.speed
    }

    p.moveRight = function() {
        p.x += p.speed
    }

    p.collide = function(ball) {
        if (ball.y + ball.image.height > p.y) {
            if (ball.x > p.x && ball.x < p.x + p.image.width) {
                log('相撞')
                return true
            }
        }

        return false
    }

    return p
}

const Ball = function() {
    const image = imgFromPath('ball.png')

    const b = {
        image: image,
        x: 100,
        y: 220,
        speedX: 10,
        speedY: 10,
        fired: false,
    }

    b.fire = function() {
        b.fired = true
    }

    b.move = function() {
        if (b.fired) {
            if (b.x < 0 || b.x > 400) {
                b.speedX = -b.speedX
            }
    
            if (b.y < 0 || b.y > 300) {
                b.speedY = -b.speedY
            }
    
            b.x += b.speedX
            b.y += b.speedY
        }
    }

    return b
}

const Game = function() {
    const canvas = document.querySelector('#id-game-interface')
    const ctx = canvas.getContext('2d')

    const g = {
        canvas: canvas,
        context: ctx,
        actions: {},
        keydowns: {},
    }

    g.drawImage = function(imgObj) {
        g.context.drawImage(imgObj.image, imgObj.x, imgObj.y)
    }

    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(keyName, callback) {
        g.actions[keyName] = callback
    }

    // timer
    setInterval(function() {
        // event
        const keyList = Object.keys(g.actions)
        for (const key of keyList) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.clientWidth, g.canvas.clientHeight)
        // draw
        g.draw()
    }, 1000/30)

    return g
}

const __main = function() {
    const game = Game()
    const paddle = Paddle()
    const ball = Ball()
    
    game.registerAction('ArrowLeft', () => {
        paddle.moveLeft()
    })

    game.registerAction('ArrowRight', () => {
        paddle.moveRight()
    })

    game.registerAction(' ', () => {
        ball.fire()
    })

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
    }

    game.update = function() {
        ball.move()
        if (paddle.collide(ball)) {
            ball.speedY = -ball.speedY
        }
    }
}

__main()
