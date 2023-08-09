import { Chess as ChessJS } from 'chess.js'
import { SQUARES } from 'chess.js'
import { player1, player2 } from '@/src/game/Players.js'
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

  getCurrentPlayer() {
    return this.#chess.turn() === 'w' ? player1 : player2
  }

  move(from, to, force = false) {
    if (!force) {
      this.#chess.move({ from, to })
    } else {
      const { type, color } = this.#chess.get(from)
      if (!type) return
      this.#chess.remove(from)
      this.#chess.put({ type, color }, to)
    }
  }
}

export default new Chess()
