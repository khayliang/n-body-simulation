import distanceBetween from "./distanceBetween"

export default function calculateGravity(originObj, targetObj){
  const gravConstant = 1
  const dist = distanceBetween(originObj.getCoords(), targetObj.getCoords())
  const force = gravConstant * ((originObj.getMass() * targetObject.getMass())/ dist)
  return force
}