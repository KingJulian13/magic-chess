export default class Player {
    constructor(name) {
        this.name = name
        this.items = []
        this.selectedItem = null
    }

    addItem(item) {
        this.items.push(item)
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item)
        if (this.selectedItem === item) {
            this.selectedItem = null
        }
    }

    selectItem(item) {
        this.selectedItem = item
    }

}