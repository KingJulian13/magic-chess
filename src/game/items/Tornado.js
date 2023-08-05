import Item from './Item.js'

export default class Tornado extends Item {
  /** color: blue or red */
  constructor() {
    super(`tornado`)
   
    this.image = new URL(`../../assets/items/tornado.jpg`, import.meta.url)
    this.name = 'Tornado'
    this.description = 'Tornado description with some text and stuff to describe the item.'
    this.effect = 'Randomly moves figues in 1 square radius. (in clockwise direction)'
  }

  renderClass() {}
  renderHoverClass() {
    return 'tornado-hover'
  }
  destroy() {
    super.destroy()
  }
}
