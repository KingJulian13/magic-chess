// make items array responsive when used within vue3 component via player.items
import { reactive } from 'vue'

export default class Player {
  constructor(name) {
    this.name = name
    this.items = reactive([])
    this.selectedItem = null
  }
  addItem(item) {
    this.items.push(item)
  }
  removeItem(item) {
   
    const index = this.items.indexOf(item)
    this.items.splice(index, 1)
    if (this.selectedItem === item) {
      this.selectedItem = null
    }
  }
  selectItem(item) {
    this.selectedItem = item
  }
}

export const player1 = new Player('Player 1') // white
export const player2 = new Player('Player 2') // black
