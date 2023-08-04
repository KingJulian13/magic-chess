import Spell from "./Spell.js"
import { chess, board, removeSpell, updateBoard } from "@/src/game/index.js"
import { toColor, toDests } from '@/src/game/util.js'
import { ANIMATION_FRAME } from "@/src/game/variables.js"
export let count = 0

export default class Portal extends Spell {
    /** color: blue or red */
    constructor() {
        if (count > 11) {
            throw new Error("Too many portals")
        }
        super("portal")
        this.count = count
        count += 1
    }

    getClass() {
        return `${this.type} portal-${this.count}`
    }

    setLinkedPortal(portalSpell) {
        this.linkedPortal = portalSpell
    }

    onFigureEnter(orig, dest, meta) {
        console.debug(`Portal ${this.key} is entered from: `, orig)
        board.set({
            turnColor: toColor(chess),
            movable: {
                color: undefined,
                dests: toDests(chess)
            }
        });
        const { type, color } = chess.get(this.key)
        setTimeout(() => {
            chess.remove(this.key)
            chess.put({ type, color }, this.linkedPortal.key)
            board.set({
                fen: chess.fen(),
            })
            updateBoard()
            this.destroy()
            this.linkedPortal.destroy()
            board.set({
                movable: {
                    color: toColor(chess),
                }
            });
        }, ANIMATION_FRAME)
    }

    destroy() {
        super.destroy()
        count -= 1
    }
}

