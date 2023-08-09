import Board from '../Board.js'
import Item from './Item.js'

export default class Tornado extends Item {
  /** color: blue or red */
  constructor() {
    super(`tornado`)

    this.image = new URL(`../../assets/items/tornado.jpg`, import.meta.url)
    this.name = 'Tornado'
    this.description = 'Tornado description with some text and stuff to describe the item.'
    this.effect = 'Randomly moves figues in 1 square radius. (in clockwise direction)'
  }

  renderClass() {
    return 'tornado'
  }
  renderHoverClass() {
    return 'tornado-hover'
  }
  async onAddedToBoard(key) {
    super.onAddedToBoard(key)
    // randomly move figures in 1 square radius around the key square
    for (let i = 0; i < 4; i++) {
      const orig = Board.getRandomSquareInRadius(key)
      const dest = Board.getRandomEmptySquareInRadius(orig)
      console.log(orig, dest)
      Board.move(orig, dest, true)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    this.destroy()
  }

  destroy() {
    super.destroy()
  }
}
