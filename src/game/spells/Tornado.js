import Spell from "./Spell.js"

export default class Tornado extends Spell {
    /** color: blue or red */
    constructor() {
        super(`tornado`)
    }

    destroy() {
        super.destroy()
    }
}

