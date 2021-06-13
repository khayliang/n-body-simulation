import { Graphics } from "pixi.js"

export default class Planet {
  constructor({x, y}) {
    this.color = 0xffffff
    this.graphic = new Graphics()
    this.graphic.beginFill(this.color).drawCircle(0, 0, 0).endFill()
    this.graphic.x = x
    this.graphic.y = y
  }

  merge(planet) {
    const newMass = planet.getMass() + this.getMass()
    const radius = Math.sqrt(newMass / Math.PI)
    this.setRadius(radius)
    return this
  }

  getMass() {
    return Math.PI * radius * radius
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
    return this
  }

}