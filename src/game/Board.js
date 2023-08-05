import { Chessground } from 'chessground'
import { ANIMATION_FRAME } from '@/src/game/variables.js'
import Chess from '@/src/game/Chess.js'
import { getRandomSquare } from '@/src/game/util.js'

class Board {
  #board = null
  #listeners = new Map([
    ['drawChange', []],
    ['afterMove', []],
    ['afterNewPiece', []]
  ])
  items = new Map()

  constructor() {}

  init(el) {
    const config = {
      movable: {
        color: 'white',
        free: false,
        dests: Chess.getDestinations()
      },
      animation: {
        duration: ANIMATION_FRAME
      },
      draggable: {
        showGhost: true
      },
      drawable: {
        eraseOnClick: false
      }
    }
    this.#board = Chessground(el, config)
    this.registerListener('afterMove', this.#onPlayerMove.bind(this))

    this.#board.set({
      movable: {
        events: {
          after: this.#getListenerFn('afterMove'),
          afterNewPiece: this.#getListenerFn('afterNewPiece')
        }
      },
      drawable: {
        onChange: this.#getListenerFn('drawChange')
      }
    })
  }

  registerListener(event, listener) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).push(listener)
    } else {
      this.#listeners.set(event, [listener])
    }
    return listener
  }

  unregisterListener(event, listener) {
    if (this.#listeners.has(event)) {
      const arr = this.#listeners.get(event)
      const index = arr.indexOf(listener)
      if (index > -1) {
        arr.splice(index, 1)
      }
    }
  }

  disable() {
    this.#board.set({
      movable: {
        color: undefined
      }
    })
  }

  enable() {
    this.#board.set({
      movable: {
        color: Chess.getTurnColor()
      }
    })
  }

  move(from, to, force) {
    Chess.move(from, to, force)
    this.updateBoard()
  }

  updateBoard() {
    const turnColor = Chess.getTurnColor()
    this.#board.set({
      fen: Chess.getFen(),
      turnColor: turnColor,
      movable: {
        color: turnColor,
        dests: Chess.getDestinations()
      }
    })
  }

  handleClick(event) {
    const x = event.clientX
    const y = event.clientY
    const key = this.#board.getKeyAtDomPos([x, y])
    if (!key) return
    const currentPlayer = Chess.getCurrentPlayer()
    if (currentPlayer.selectedItem) {
      this.addItem(currentPlayer.selectedItem, key)
      currentPlayer.selectedItem = null
    }
    // this.#getListenerFn('click')(key, event)
  }

  handleHover(e) {
    const x = e.clientX
    const y = e.clientY
    const key = this.#board.getKeyAtDomPos([x, y])
    if (!key) return
    this.#getListenerFn('hover')(key, e)
  }

  addItem(item, key) {
    console.log(item, item - key)
    item.addToBoard(key)
    if (this.items.has(key)) {
      this.items.get(key).push(item)
    } else {
      this.items.set(key, [item])
    }
    this.updateItems()
  }

  removeItem(item) {
    if (this.items.has(item.key)) {
      const arr = this.items.get(item.key)
      const index = arr.indexOf(item)
      if (index > -1) {
        arr.splice(index, 1)
      }
    }
    this.updateItems()
  }

  updateItems() {
    const custom = new Map()
    this.items.forEach((arr, key) => {
      custom.set(key, arr.map((item) => item.renderClass()).join(' '))
    })
    this.#board.set({
      highlight: {
        custom: custom // must be map of format: <key, classString>
      }
    })
  }

  isItemOnSquare(key) {
    return this.items.has(key)
  }

  getRandomEmptySquare() {
    let square = getRandomSquare()
    while (Chess.getFigureAt(square) !== false || this.isItemOnSquare(square)) {
      square = getRandomSquare()
    }
    return square
  }

  #getListenerFn(key) {
    const listeners = this.#listeners.get(key)
    if (!listeners) return () => {}
    return function () {
      listeners.forEach((listener) => {
        listener.call(null, ...arguments)
      })
    }
  }

  #onPlayerMove(orig, dest, meta) {
    Chess.move(orig, dest)
    this.updateBoard()
    this.items.forEach((arr) => {
      arr.forEach((item) => {
        item.onBoardMove(orig, dest, meta)
      })
    })
  }
}

export default new Board()
