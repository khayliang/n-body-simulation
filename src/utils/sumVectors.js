export default function sumVectors(vec1, vec2){
  const {rad: rad1, magni: magni1} = vec1
  const {rad: rad2, magni: magni2} = vec2

  const x1 = magni1 * Math.cos(rad1)
  const y1 = magni1 * Math.sin(rad1)

  const x2 = magni2 * Math.cos(rad2)
  const y2 = magni2 * Math.sin(rad2)

  const x = x2 + x1
  const y = y2 + y1

  const rad = Math.atan2(y, x)
  const magni = Math.sqrt(x*x + y*y)
  return {rad, magni}
}