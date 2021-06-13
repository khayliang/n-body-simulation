import { Application, Graphics, InteractionManager } from 'pixi.js'

import './index.css'
import distanceBetween from './utils/distanceBetween'

const mapSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const app = new Application(mapSize)
app.ticker.maxFPS = 60
const interaction = new InteractionManager(app.renderer)

const objects = []

let dragging = false
let newObject = null
let startingCoords = null
let endingCoords = null

interaction.on('mousedown', () => {
  dragging = true
  startingCoords = {
    x: interaction.mouse.global.x,
    y: interaction.mouse.global.y,
  }
  newObject = new Graphics()
  newObject.beginFill(0xffffff).drawCircle(startingCoords.x, startingCoords.y, 0).endFill()
  app.stage.addChild(newObject)
})
interaction.on('mousemove', () => {
  if (!startingCoords) return
  endingCoords = {
    x: interaction.mouse.global.x,
    y: interaction.mouse.global.y,
  }

  const radius = distanceBetween(endingCoords, startingCoords)

  newObject.clear()
  newObject.beginFill(0xffffff).drawCircle(startingCoords.x, startingCoords.y, radius).endFill()
})
interaction.on('mouseup', () => {
  dragging = false
  startingCoords = null
})

document.body.appendChild(app.view)
