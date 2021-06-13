import { Application, Graphics, InteractionManager } from 'pixi.js'

import './index.css'
import distanceBetween from './utils/distanceBetween'
import sumVectors from './utils/sumVectors'
import calculateGravity from './utils/calculateGravity'
import calcPlanetIntersectionArea from './utils/calcPlanetIntersectionArea'
import Planet from './Planet'

const mapSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const app = new Application(mapSize)
app.ticker.maxFPS = 60
const interaction = new InteractionManager(app.renderer)

let planets = []

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
  planets.push(newPlanet)
  newPlanet = null
})
let tick = 0
app.ticker.add(() => {
  tick += 1
  const newPlanets = planets.reduce((arr, planet) => {
    if (planet.isConsumed()) {
      app.stage.removeChild(planet.getGraphic())
      return arr
    }
    let finalVector = {rad: 0, magni: 0}
    planets.forEach((otherPlanet) => {
      if (otherPlanet == planet) return
      const force = calculateGravity(planet, otherPlanet)
      const rad = planet.calculateRadiansFrom(otherPlanet.getCoords())

      const overlappedArea = calcPlanetIntersectionArea(planet, otherPlanet)
      
      if (overlappedArea > otherPlanet.getMass()/2){
        planet.merge(otherPlanet)
      }

      finalVector = sumVectors({rad, magni: force}, finalVector)
    })
    const acceleration = finalVector.magni/planet.getMass()

    const newVelocity = sumVectors(planet.getVelocity(), {magni: acceleration, rad: finalVector.rad})

    planet.setVelocity(newVelocity)
    planet.update()

    arr.push(planet)
    return arr
  }, [])
  planets = newPlanets
})

document.body.appendChild(app.view)
