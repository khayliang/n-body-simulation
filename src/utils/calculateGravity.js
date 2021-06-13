import distanceBetween from './distanceBetween'

export default function calculateGravity(originObj, targetObj) {
  const gravConstant = 0.0001
  const dist = distanceBetween(originObj.getCoords(), targetObj.getCoords())
  const force = gravConstant * ((originObj.getMass() * targetObj.getMass()) / dist)
  return force
}
