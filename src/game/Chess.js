import { Chess as ChessJS } from 'chess.js'
import { SQUARES } from 'chess.js'

class Chess {
  #chess = new ChessJS()

  constructor() {}

  getDestinations() {
    const dests = new Map()
    SQUARES.forEach((s) => {
      const ms = this.#chess.moves({ square: s, verbose: true })
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        )
    })
    return dests
  }

  getTurnColor() {
    return this.#chess.turn() === 'w' ? 'white' : 'black'
  }

  getFigureAt(key) {
    return this.#chess.get(key)
  }

  getFen() {
    return this.#chess.fen()
  }

  move(from, to, force = false) {
    if (!force) {
      this.#chess.move({ from, to })
    } else {
      const { type, color } = this.#chess.get(from)
      this.#chess.remove(from)
      this.#chess.put({ type, color }, to)
    }
  }
}

export default new Chess()
