import Item from "./Item.js"

export default class Tornado extends Item {
    /** color: blue or red */
    constructor() {
        super(`tornado`)
    }

    destroy() {
        super.destroy()
    }
}

