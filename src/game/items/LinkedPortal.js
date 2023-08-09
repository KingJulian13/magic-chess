import Item from './Item.js'
import { ANIMATION_FRAME } from '@/src/game/variables.js'
import Board from '@/src/game/Board.js'

export let count = 0

export default class LinkedPortal extends Item {
  constructor(linkedPortal) {
    super('portal')
    this.linkedPortal = linkedPortal
    this.image = new URL(`../../assets/items/portal.jpg`, import.meta.url)
    this.name = 'Portal'
    this.count = count
    count += 1
  }

  onAddedToBoard(key) {
    super.onAddedToBoard(key)
  }

  renderClass() {
    return `${this.type} portal-${this.count}`
  }

  renderHoverClass() {
    return 'portal-hover'
  }

  onFigureEnter(orig) {
    console.debug(`Portal ${this.key} is entered from: `, orig)
    Board.disable()
    setTimeout(() => {
      Board.move(this.key, this.linkedPortal.key, true)
      this.destroy()
      this.linkedPortal.destroy()
      Board.enable()
    }, ANIMATION_FRAME)
  }

  destroy() {
    super.destroy()
    count -= 1
  }
}
