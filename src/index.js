import { Application, Graphics, InteractionManager } from 'pixi.js'

import './index.css'
import distanceBetween from './utils/distanceBetween'
import Planet from './Planet'

const mapSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const app = new Application(mapSize)
app.ticker.maxFPS = 1
const interaction = new InteractionManager(app.renderer)

const objects = []

let newPlanet = null

interaction.on('mousedown', () => {
  const startingCoords = {
    x: interaction.mouse.global.x,
    y: interaction.mouse.global.y,
  }
  newPlanet = new Planet(startingCoords)
  app.stage.addChild(newPlanet.getGraphic())
})

interaction.on('mousemove', () => {
  if (!newPlanet) return
  const currentCoords = {
    x: interaction.mouse.global.x,
    y: interaction.mouse.global.y,
  }

  const radius = distanceBetween(currentCoords, newPlanet.getCoords())
  newPlanet.setRadius(radius)
})

interaction.on('mouseup', () => {
  objects.push(newPlanet)
  newPlanet = null
})

app.ticker.add(() => {

})

document.body.appendChild(app.view)
