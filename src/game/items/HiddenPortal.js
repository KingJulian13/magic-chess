import Portal from './Portal.js'

export let count = 0

export default class HiddenPortal extends Portal {
  constructor() {
    super('hidden-portal')
    this.image = new URL(`../../assets/items/hiddenportal.jpg`, import.meta.url)

    this.isPrivate = true
  }
}
