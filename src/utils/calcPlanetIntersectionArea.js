// borrowed from https://github.com/infusion/Circle.js/blob/master/circle.js
export default function calcPlanetIntersectionArea(planet1, planet2) {
  const coords1 = planet1.getCoords()
  const coords2 = planet2.getCoords()
  const d = Math.hypot(coords2.x - coords1.x, coords2.y - coords1.y)

  if (d <= planet1.getRadius() + planet2.getRadius()) {
    const a = planet1.getRadius() * planet1.getRadius()
    const b = planet2.getRadius() * planet2.getRadius()

    const x = (a - b + d * d) / (2 * d)
    const z = x * x
    const y = Math.sqrt(a - z)

    if (d <= Math.abs(planet2.getRadius() - planet1.getRadius())) {
      return Math.PI * Math.min(a, b)
    }
    return (
      a * Math.asin(y / planet1.getRadius()) +
      b * Math.asin(y / planet2.getRadius()) -
      y * (x + Math.sqrt(z + b - a))
    )
  }
  return 0
}
