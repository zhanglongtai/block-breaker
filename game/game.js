// const Game = function(fps, imgToLoad, loadedCallback) {
//     const canvas = document.querySelector('#id-game-interface')
//     const ctx = canvas.getContext('2d')

//     const g = {
//         canvas: canvas,
//         context: ctx,
//         actions: {},
//         keydowns: {},
//         imgList: {},
//         scene: null,
//     }

//     g.drawImage = function(imgObj) {
//         g.context.drawImage(imgObj.image, imgObj.x, imgObj.y)
//     }

//     window.addEventListener('keydown', (event) => {
//         g.keydowns[event.key] = true
//     })

//     window.addEventListener('keyup', (event) => {
//         g.keydowns[event.key] = false
//     })

//     g.registerAction = function(keyName, callback) {
//         g.actions[keyName] = callback
//     }

//     g.draw = function() {
//         g.scene.draw()
//     }

//     g.update = function() {
//         g.scene.update()
//     }

//     // timer
//     window.fps = fps
//     const runloop = function() {
//         // event
//         const keyList = Object.keys(g.actions)
//         for (const key of keyList) {
//             if (g.keydowns[key]) {
//                 g.actions[key]()
//             }
//         }
//         // update
//         g.update()
//         // clear
//         g.context.clearRect(0, 0, g.canvas.clientWidth, g.canvas.clientHeight)
//         // draw
//         g.draw()

//         // loop
//         setTimeout(runloop, 1000/window.fps)
//     }

//     // load image
//     const loadedList = []
//     const component = Object.keys(imgToLoad)
//     for (const imgName of component) {
//         const img = new Image()
//         img.src = imgToLoad[imgName]

//         img.onload = function() {
//             // store img
//             g.imgList[imgName] = img
//             // valid all img loaded
//             loadedList.push(1)
//             if (loadedList.length === component.length) {
//                 g.__init()
//             }
//         }
//     }

//     g.imgByName = function(name) {
//         const img = g.imgList[name]

//         const o = {
//             image: img,
//             width: img.width,
//             height: img.height,
//         }

//         return o
//     }

//     g.runWithScene = function(scene) {
//         g.scene = scene

//         // start game
//         setTimeout(runloop, 1000/window.fps)
//     }

//     g.replaceScene = function(scene) {
//         g.scene = scene
//     }

//     g.__init = function() {
//         loadedCallback(g)
//     }

//     return g
// }

class Game {
    constructor(fps, imgToLoad, loadedCallback) {
        window.fps = fps
        this.loadedCallback = loadedCallback

        const canvas = document.querySelector('#id-game-interface')
        const ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.context = ctx
        this.actions = {}
        this.keydowns = {}
        this.imgList = {}
        this.scene = null

        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
    
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })

        this.loadImg(imgToLoad)
    }

    static singleInstance(fps, imgToLoad, loadedCallback) {
        this.instance = this.instance || new this(fps, imgToLoad, loadedCallback)
        return this.instance
    }

    drawImage(imgObj) {
        this.context.drawImage(imgObj.image, imgObj.x, imgObj.y)
    }

    registerAction(keyName, callback) {
        this.actions[keyName] = callback
    }

    draw() {
        this.scene.draw()
    }

    update() {
        this.scene.update()
    }

    runloop() {
        // event
        const keyList = Object.keys(this.actions)
        for (const key of keyList) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        // draw
        this.draw()

        // loop
        setTimeout(this.runloop.bind(this), 1000/window.fps)
    }

    loadImg(imgToLoad) {
        const loadedList = []
        const component = Object.keys(imgToLoad)

        for (const imgName of component) {
            const img = new Image()
            img.src = imgToLoad[imgName]

            img.onload = () => {
                // store img
                this.imgList[imgName] = img
                // valid all img loaded
                loadedList.push(1)
                if (loadedList.length === component.length) {
                    this.__init()
                }
            }
        }
    }

    imgByName(name) {
        const img = this.imgList[name]

        const o = {
            image: img,
            width: img.width,
            height: img.height,
        }

        return o
    }

    runWithScene(scene) {
        this.scene = scene

        // start game
        setTimeout(this.runloop.bind(this), 1000/window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __init() {
        this.loadedCallback(this)
    }
}
