import { Application, InteractionManager, Text } from 'pixi.js'

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
const initialPlanets = 50
const maxRadius = 50
const maxVelocity = 5

const app = new Application(mapSize)
app.ticker.maxFPS = 60
const interaction = new InteractionManager(app.renderer)
const text = new Text('Click and drag to spawn a planet', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xff3f00,
  align: 'center',
})
app.stage.addChild(text)

let planets = []

for (let i = 0; i !== initialPlanets; i += 1){
  const coords = {
    x: mapSize.width * Math.random(),
    y: mapSize.height * Math.random(),
  }
  const newPlanet = new Planet(coords)
  newPlanet.setRadius(Math.random() * maxRadius).setVelocity({
    magni: Math.random() * maxVelocity,
    rad: Math.random() * Math.PI * 2 - Math.PI * 2
  })
  app.stage.addChild(newPlanet.getGraphic())
  planets.push(newPlanet)
}

let newPlanet = null

interaction.on('mousedown', () => {
  const startingCoords = {
    x: interaction.mouse.global.x,
    y: interaction.mouse.global.y,
  }
  newPlanet = new Planet(startingCoords)
  newPlanet.setRadius(1)
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
  if (!newPlanet) return
  planets.push(newPlanet)
  newPlanet = null
  console.log(planets)
})
app.ticker.add(() => {
  const newPlanets = planets.reduce((arr, planet) => {
    if (planet.isConsumed()) {
      app.stage.removeChild(planet.getGraphic())
      return arr
    }
    let finalVector = { rad: 0, magni: 0 }
    planets.forEach((otherPlanet) => {
      // eslint-disable-next-line
      if (otherPlanet == planet) return
      const force = calculateGravity(planet, otherPlanet)
      const rad = planet.calculateRadiansFrom(otherPlanet.getCoords())

      const overlappedArea = calcPlanetIntersectionArea(planet, otherPlanet)

      if (overlappedArea > otherPlanet.getMass() / 1.1) {
        planet.merge(otherPlanet)
      }

      finalVector = sumVectors({ rad, magni: force }, finalVector)
    })
    const acceleration = finalVector.magni / planet.getMass()

    const newVelocity = sumVectors(planet.getVelocity(), {
      magni: acceleration,
      rad: finalVector.rad,
    })

    planet.setVelocity(newVelocity)
    planet.update()

    arr.push(planet)
    return arr
  }, [])
  planets = newPlanets
})

document.body.appendChild(app.view)
