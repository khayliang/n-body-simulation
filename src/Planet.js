import { Graphics } from 'pixi.js'
import getRandomPastel from './utils/getRandomPastel'

export default class Planet {
  constructor({ x, y }) {
    this.color = getRandomPastel()
    this.graphic = new Graphics()
    this.graphic.beginFill(this.color).drawCircle(0, 0, 0).endFill()
    this.graphic.x = x
    this.graphic.y = y
    this.radius = 0
    this.consumed = false

    this.velocityVector = {
      rad: 0,
      magni: 0,
    }
  }

  merge(planet) {
    const newMass = planet.getMass() + this.getMass()
    const radius = Math.sqrt(newMass / Math.PI)
    this.setRadius(radius)
    planet.consume()
    return this
  }

  consume() {
    this.consumed = true
  }

  isConsumed() {
    return this.consumed
  }

  getVelocity() {
    return this.velocityVector
  }

  setVelocity(vector) {
    this.velocityVector = vector
    return this
  }

  getMass() {
    return Math.PI * this.radius * this.radius
  }

  getGraphic() {
    return this.graphic
  }

  getCoords() {
    return {
      x: this.graphic.x,
      y: this.graphic.y,
    }
  }

  setRadius(radius) {
    this.graphic.clear().beginFill(this.color).drawCircle(0, 0, radius).endFill()
    this.radius = radius
    return this
  }

  getRadius() {
    return this.radius
  }

  setCoords({ x, y }) {
    this.graphic.x = x
    this.graphic.y = y
    return this
  }

  calculateRadiansFrom(coords) {
    const myCoords = this.getCoords()
    const rad = Math.atan2(coords.y - myCoords.y, coords.x - myCoords.x)
    return rad
  }

  update() {
    const { rad, magni } = this.getVelocity()
    const dx = magni * Math.cos(rad)
    const dy = magni * Math.sin(rad)

    const { x, y } = this.getCoords()

    this.setCoords({
      x: x + dx,
      y: y + dy,
    })
    return this
  }
}
