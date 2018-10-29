// const SceneMain = function(game) {
//     const s = {
//         game: game,
//     }

//     // init scene
//     const paddle = Paddle(game)
//     const ball = Ball(game)
//     const blocks = loadLevel(game, 1)

//     let score = 0

//     game.registerAction('ArrowLeft', () => {
//         paddle.moveLeft()
//     })

//     game.registerAction('ArrowRight', () => {
//         paddle.moveRight()
//     })

//     game.registerAction(' ', () => {
//         ball.fire()
//     })

//     s.draw = function() {
//         // background
//         // game.context.fillStyle = "#554"
//         // game.context.fillRect(0, 0, 400, 300)
//         // component
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for (const b of blocks) {
//             if (b.alive) {
//                 game.drawImage(b)
//             }
//         }

//         game.context.fillText(`score: ${score}`, 10, 300)
//     }

//     s.update = function() {
//         if (window.paused) {
//             return
//         }
        
//         ball.move()

//         // game over
//         if (ball.y > paddle.y) {
//             sceneEnd = SceneEnd(game)
//             game.replaceScene(sceneEnd)
//         }

//         if (paddle.collide(ball)) {
//             ball.reverse()
//         }

//         for (const b of blocks) {
//             if (b.collide(ball)) {
//                 b.destroy()
//                 score += 10
//                 ball.reverse()
//             }
//         }
//     }

//     // drag ball
//     let dragging = false
//     game.canvas.addEventListener('mousedown', (event) => {
//         const x = event.offsetX
//         const y = event.offsetY

//         // check if click on ball
//         if (ball.hasPoint(x, y)) {
//             dragging = true
//         }
//     })

//     game.canvas.addEventListener('mousemove', (event) => {
//         const x = event.offsetX
//         const y = event.offsetY

//         if (dragging) {
//             ball.x = x
//             ball.y = y
//         }
//     })

//     game.canvas.addEventListener('mouseup', (event) => {
//         const x = event.offsetX
//         const y = event.offsetY

//         dragging = false
//     })

//     return s
// }

class SceneMain extends Scene {
    constructor(game, customLevel, levelIndex) {
        super(game)

        this.paddle = Paddle(this.game)
        this.ball = Ball(this.game)
        this.levels = customLevel || localLevels
        this.levelIndex = levelIndex || 1
        this.blocks = loadLevel(this.game, this.levels, this.levelIndex)

        this.score = 0
        this.dragging = false

        this.game.registerAction('ArrowLeft', () => {
            this.paddle.moveLeft()
        })
    
        this.game.registerAction('ArrowRight', () => {
            this.paddle.moveRight()
        })
    
        this.game.registerAction('f', () => {
            this.ball.fire()
        })

        this.game.canvas.addEventListener('mousedown', (event) => {
            const x = event.offsetX
            const y = event.offsetY
            if (this.ball.hasPoint(x, y)) {
                this.dragging = true
            }
        })

        this.game.canvas.addEventListener('mousemove', (event) => {
            const x = event.offsetX
            const y = event.offsetY
            if (this.dragging) {
                this.ball.x = x
                this.ball.y = y
            }
        })

        this.game.canvas.addEventListener('mouseup', (event) => {
            this.dragging = false
        })
    }

    draw() {
        // background
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)
        // component
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        for (const b of this.blocks) {
            if (b.alive) {
                this.game.drawImage(b)
            }
        }

        this.game.context.fillText(`score: ${this.score}`, 10, 290)
    }

    update() {
        if (window.paused) {
            return
        }
        
        this.ball.move()

        // game over
        if (this.ball.y > this.paddle.y) {
            const sceneEnd = SceneEnd.new(this.game)
            this.game.replaceScene(sceneEnd)
        }

        if (this.paddle.collide(this.ball)) {
            this.ball.reverse()
        }

        for (const b of this.blocks) {
            if (b.collide(this.ball)) {
                b.destroy()
                this.score += 10
                this.ball.reverse()
            }
        }
    }
}
