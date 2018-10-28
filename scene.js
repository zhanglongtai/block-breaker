const Scene = function(game) {
    const s = {
        game: game,
    }

    // init scene
    const paddle = Paddle(game)
    const ball = Ball(game)
    const blocks = loadLevel(game, 1)

    let score = 0

    game.registerAction('ArrowLeft', () => {
        paddle.moveLeft()
    })

    game.registerAction('ArrowRight', () => {
        paddle.moveRight()
    })

    game.registerAction(' ', () => {
        ball.fire()
    })

    s.draw = function() {
        // background
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)
        // component
        game.drawImage(paddle)
        game.drawImage(ball)
        for (const b of blocks) {
            if (b.alive) {
                game.drawImage(b)
            }
        }

        game.context.fillText(`score: ${score}`, 10, 300)
    }

    s.update = function() {
        if (window.paused) {
            return
        }
        
        ball.move()

        // game over
        if (ball.y > paddle.y) {
            sceneEnd = SceneEnd(game)
            game.replaceScene(sceneEnd)
        }

        if (paddle.collide(ball)) {
            ball.reverse()
        }

        for (const b of blocks) {
            if (b.collide(ball)) {
                b.destroy()
                score += 10
                ball.reverse()
            }
        }
    }

    // drag ball
    let dragging = false
    game.canvas.addEventListener('mousedown', (event) => {
        const x = event.offsetX
        const y = event.offsetY

        // check if click on ball
        if (ball.hasPoint(x, y)) {
            dragging = true
        }
    })

    game.canvas.addEventListener('mousemove', (event) => {
        const x = event.offsetX
        const y = event.offsetY

        if (dragging) {
            ball.x = x
            ball.y = y
        }
    })

    game.canvas.addEventListener('mouseup', (event) => {
        const x = event.offsetX
        const y = event.offsetY

        dragging = false
    })

    return s
}
