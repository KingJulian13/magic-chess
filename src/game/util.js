export function getRandomSquare() {
  const randomAtoH = 'abcdefgh'[Math.floor(Math.random() * 8)]
  const random1to8 = Math.floor(Math.random() * 8) + 1
  return `${randomAtoH}${random1to8}`
}
let idHash = 1

export function getId() {
  return idHash++
}
