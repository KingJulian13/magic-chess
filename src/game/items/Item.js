import Board from '@/src/game/Board.js'

export default class Item {
  constructor(type) {
    this.key = null // set if item is on board
    this.isPrivate = false // only visible to owner
    this.name = 'Item'
    this.description = 'Item description with some text and stuff to describe the item.'
    this.effect = 'Effect'
    this.type = type
    this.domEl = null
    this.player = null
    this.#addMutationObserver()
  }

  renderClass() {
    return this.type
  }
  renderHoverClass() {
    return this.type + '-hover'
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
  addToBoard(key) {
    this.key = key
  }

  destroy() {
    Board.removeItem(this)
    Board.updateItems()
  }

  /**
   * Adds mutation observer to the document body to find the item's DOM element
   * and set it to this.domEl
   */
  #addMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes[0]?.className === this.renderClass()) {
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
