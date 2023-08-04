import { Chess } from 'chess.js'
import { Chessground } from 'chessground'
import { toDests, toColor } from './util'
import { ANIMATION_FRAME } from "@/src/game/variables.js"

export let chess = new Chess()
export let board = null

const spells = new Map()

export function isSpellOnSquare(key) {
    return spells.has(key)
}


let boardListeners = new Map(
    [
        ["drawChange", []],
        ["afterMove", []],
        ["afterNewPiece", []],
    ]
)

export function init(el) {
    const config = {
        movable: {
            color: 'white',
            free: false,
            dests: toDests(chess)
        },
        animation: {
            duration: ANIMATION_FRAME,
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
    registerListener("afterMove", onPlayerMove)

    /** Map listeners */
    board.set({
        movable: {
            events: {
                after: getListenerFn("afterMove"),
                afterNewPiece: getListenerFn("afterNewPiece")
            }
        }
    })
}

export function undo() {
    // Must manually save the state of the board
    // chess.undo()
    // updateBoard()
}

export function addSpell(spell, key) {
    console.log("adding spell", spell, key)
    spell.key = key
    if (spells.has(spell.key)) {
        spells.get(spell.key).push(spell)
    } else {
        spells.set(spell.key, [spell])
    }
    updateSpells()
}

export function removeSpell(spell) {
    if (spells.has(spell.key)) {
        const arr = spells.get(spell.key)
        const index = arr.indexOf(spell)
        if (index > -1) {
            arr.splice(index, 1)
        }
    }
    updateSpells()
}

export function updateSpells() {
    const custom = new Map()
    spells.forEach((arr, key) => {
        custom.set(key, arr.map(spell => spell.getClass()).join(" "))
    })
    board.set({
        highlight: {
            custom: custom // must be map of format: <key, classString>
        }
    })
}
export function registerListener(event, listener) {
    if (boardListeners.has(event)) {
        boardListeners.get(event).push(listener)
    } else {
        boardListeners.set(event, [listener])
    }
    return listener
}

export function unregisterListener(event, listener) {
    if (boardListeners.has(event)) {
        const arr = boardListeners.get(event)
        const index = arr.indexOf(listener)
        if (index > -1) {

            arr.splice(index, 1)
        }
    }
}

export function onClickOnBoard(player, event) {
    const x = event.clientX
    const y = event.clientY
    const key = board.getKeyAtDomPos([x, y])
    if (!key) return
    console.debug(`${player.name} clicked ${key}`)
    const selectedItem = player.selectedItem
    if (!selectedItem) return
    console.debug(`${player.name} is trying to place ${selectedItem} to ${key}`)
    addSpell(selectedItem, key)
    player.removeItems(selectedItem)

}

export function updateBoard() {
    board.set({
        turnColor: toColor(chess),
        movable: {
            color: toColor(chess),
            dests: toDests(chess)
        }
    })
}

function onPlayerMove(orig, dest) {
    chess.move({ from: orig, to: dest });
    updateBoard()
};

function getListenerFn(key) {
    const listeners = boardListeners.get(key)
    return function () {
        listeners.forEach(listener => {
            listener.call(null, ...arguments)
        })
    }
}
