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
      currentPlayer.removeItem(currentPlayer.selectedItem)
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
    item.onAddedToBoard(key)
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

  /**
   * Returns a random square in a given square radius around the given key.
   * Does not overlap with borders. (e.g. if radius is 1, it will not return a square outside the board)
   * Uses string parsing and manuel calculation to avoid using a loop.
   * @param {string} key - key string of the square - format: 'a1'
   * @param {number} radius - radius around the given square (in squares)
   */
  getRandomSquareInRadius(key, radius = 1) {
    const [file, rank] = key.split('')
    const fileIndex = file.charCodeAt(0) - 97
    const rankIndex = parseInt(rank) - 1
    const minFile = Math.max(0, fileIndex - radius)
    const maxFile = Math.min(7, fileIndex + radius)
    const minRank = Math.max(0, rankIndex - radius)
    const maxRank = Math.min(7, rankIndex + radius)
    const newFile = String.fromCharCode(
      Math.floor(Math.random() * (maxFile - minFile + 1)) + minFile + 97
    )
    const newRank = Math.floor(Math.random() * (maxRank - minRank + 1)) + minRank + 1
    return `${newFile}${newRank}`
  }

  /**
   * Returns a random empty square in a given square radius around the given key.
   * Does not overlap with borders. (e.g. if radius is 1, it will not return a square outside the board)
   * Uses string parsing and manuel calculation to avoid using a loop.
   * Returns null if no empty square was found.
   * @param {string} key - key string of the square - format: 'a1'
   * @param {number} radius - radius around the given square (in squares)
   */
  getRandomEmptySquareInRadius(key, radius = 1) {
    const [file, rank] = key.split('')
    const fileIndex = file.charCodeAt(0) - 97
    const rankIndex = parseInt(rank) - 1
    const minFile = Math.max(0, fileIndex - radius)
    const maxFile = Math.min(7, fileIndex + radius)
    const minRank = Math.max(0, rankIndex - radius)
    const maxRank = Math.min(7, rankIndex + radius)
    const emptySquares = []
    for (let i = minFile; i <= maxFile; i++) {
      for (let j = minRank; j <= maxRank; j++) {
        const square = `${String.fromCharCode(i + 97)}${j + 1}`
        if (Chess.getFigureAt(square) === false && !this.isItemOnSquare(square)) {
          emptySquares.push(square)
        }
      }
    }
    if (emptySquares.length === 0) return null
    return emptySquares[Math.floor(Math.random() * emptySquares.length)]
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
