// distance from point1 to point2
export default function distanceBetween(point1, point2) {
  const dx = Math.abs(point2.x - point1.x)
  const dy = Math.abs(point2.y - point1.y)

  return Math.sqrt(dx * dx + dy * dy)
}
