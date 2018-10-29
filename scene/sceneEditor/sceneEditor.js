class SceneEditor extends Scene {
    constructor(game) {
        super(game)

        this.initPosition = [180, 250]
        this.newBlock = null
        this.savedBlock = []
        this.level = [[]]
        this.dragging = false

        this.game.registerAction('a', () => {
            // init a new block
            this.newBlock = Block(this.game, this.initPosition)
        })

        this.game.registerAction('y', () => {
            if (this.newBlock !== null) {
                this.savedBlock.push(this.newBlock)

                const x = this.newBlock.x
                const y = this.newBlock.y
                this.level[0].push([x, y])

                // this.newBlock.forceDie()
                this.newBlock = null
            }
        })

        this.game.registerAction('Enter', () => {
            const scene = SceneMain.new(this.game, this.level, 1)
            this.game.replaceScene(scene)
        })

        this.game.canvas.addEventListener('mousedown', (event) => {
            const x = event.offsetX
            const y = event.offsetY

            if (this.newBlock !== null) {
                if (this.newBlock.hasPoint(x, y)) {
                    this.dragging = true
                }
            }
        })

        this.game.canvas.addEventListener('mousemove', (event) => {
            const x = event.offsetX
            const y = event.offsetY

            if (this.dragging) {
                this.newBlock.x = x
                this.newBlock.y = y
            }
        })

        this.game.canvas.addEventListener('mouseup', (event) => {
            this.dragging = false
        })
    }

    draw() {
        // draw labels
        this.game.context.fillText('press a to add block', 20, 260)
        this.game.context.fillText('press y to save current block', 20, 275)
        this.game.context.fillText('press Enter to play custom level', 20, 290)

        for (const b of this.savedBlock) {
            this.game.drawImage(b)
        }
        if (this.newBlock !== null) {
            this.game.drawImage(this.newBlock)
        }
    }
}
