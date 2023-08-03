import { Chess } from 'chess.js'
import { Chessground } from 'chessground'
import { playOtherSide, toDests, toColor } from './util'

export let chess = new Chess()
export let board = null

let spells = new Map()

export function init(el) {
    const config = {
        movable: {
            color: 'white',
            free: false,
            dests: toDests(chess)
        },
        draggable: {
            showGhost: true
        },
        drawable: {
            eraseOnClick: false,
            onChange: (shapes) => {
                console.log('onChange', shapes)
            }
        },
    }
    board = Chessground(el, config)
    board.set({
        movable: { events: { after: playOtherSide(board, chess) } }
    })
}

export function undo() {
    chess.undo()
    board.set({
        fen: chess.fen(),
        turnColor: toColor(chess),
        movable: {
            color: toColor(chess),
            dests: toDests(chess)
        }
    })
}

export function addSpell(key, spell) {
    spells.set(key, spell)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                if (mutation.addedNodes[0]?.className === spell) {
                    handleNewSpell(mutation.addedNodes[0])
                    observer.disconnect();
                }
            }
        });
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
    });
    board.set({
        highlight: {
            custom: spells
        }
    })
}

function handleNewSpell(el) {
    console.log("do stuff on el:", el)
    const x = el.getBoundingClientRect().x
    const y = el.getBoundingClientRect().y
    const width = el.getBoundingClientRect().width
    const height = el.getBoundingClientRect().height
    console.log("x:", x, "y:", y, "width:", width, "height:", height)
    
}