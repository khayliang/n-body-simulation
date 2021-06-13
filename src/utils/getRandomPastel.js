const hslToHex = (h, s, l) => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `0x${f(0)}${f(8)}${f(4)}`
}

const getRandomPastel = () =>
  hslToHex(360 * Math.random(), 180 * Math.random(), 85 + 10 * Math.random())

export default getRandomPastel
