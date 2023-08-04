import { registerListener, updateSpells, removeSpell, unregisterListener } from "@/src/game/index.js"

export default class Spell {
    constructor(type) {
        this.key
        this.type = type
        this.domEl = null
        this.isDrawnOnBoard = true
        this.player = null

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    if (mutation.addedNodes[0]?.className === this.type) {
                        this.handleNewSpell(mutation.addedNodes[0])
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
        this.listener = registerListener("afterMove", this.onBoardMove.bind(this))
    }

    putOnKey(key) {
        this.key = key
    }

    getClass() {
        return this.type
    }

    getRender() {
        if (!this.isDrawnOnBoard || !this.key) return null
        return [this.key, this.type]
    }

    onBoardMove(orig, dest, meta) {
        if (dest === this.key) {
            this.onFigureEnter(orig, dest, meta)
        }
        if (orig === this.key) {
            this.onFigureLeave(orig, dest, meta)
        }
    }

    onFigureEnter(orig, dest, meta) {
        console.debug(`Spell ${this.constructor.name} is entered from: `, orig)
    }
    onFigureLeave(orig, dest, meta) {
        console.debug(`Spell ${this.constructor.name} is left to: `, dest)
    }
    
    handleNewSpell(el) {
        this.domEl = el
        // console.debug(`Spell ${this.constructor.name} created square element: `, el, "\n on Position: ", el.getBoundingClientRect())
        const x = el.getBoundingClientRect().x
        const y = el.getBoundingClientRect().y
        const width = el.getBoundingClientRect().width
        const height = el.getBoundingClientRect().height

    }
    destroy() {
        removeSpell(this)
        unregisterListener("afterMove", this.listener)
        updateSpells()
        console.debug(`Spell ${this.constructor.name} destroyed`)
    }
}

