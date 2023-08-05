import Board from '@/src/game/Board.js'

export default class Item {
  constructor(type) {
    this.key = null // set if item is on board
    this.type = type 
    this.domEl = null
    this.player = null
    this.#addMutationObserver()
  }

  getClass() {
    return this.type
  }

  onBoardMove(orig, dest, meta) {
    if (dest === this.key) {
      this.onFigureEnter(orig, dest, meta)
    }
    if (orig === this.key) {
      this.onFigureLeave(orig, dest, meta)
    }
  }

  onFigureEnter() {}
  onFigureLeave() {}

  destroy() {
    Board.removeItem(this)
    Board.unregisterListener('afterMove', this.listener)
    Board.updateItems()
    console.debug(`Item ${this.constructor.name} destroyed`)
  }

  /**
   * Adds mutation observer to the document body to find the item's DOM element
   * and set it to this.domEl
   */
  #addMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes[0]?.className === this.getClass()) {
            this.domEl = mutation.addedNodes[0]
            observer.disconnect()
          }
        }
      })
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    })
  }
}
