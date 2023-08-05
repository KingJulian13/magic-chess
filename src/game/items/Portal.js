import Item from './Item.js'
import { ANIMATION_FRAME } from '@/src/game/variables.js'
import Board from '@/src/game/Board.js'

export let count = 0

export default class Portal extends Item {
  /** color: blue or red */
  constructor() {
    if (count > 11) {
      throw new Error('Too many portals')
    }
    super('portal')
    this.count = count
    count += 1
  }

  getClass() {
    return `${this.type} portal-${this.count}`
  }

  setLinkedPortal(portalSpell) {
    this.linkedPortal = portalSpell
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
