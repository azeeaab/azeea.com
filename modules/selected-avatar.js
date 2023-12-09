import { avatarName, config } from "./config.js"
import { domExport } from "./dom.js"

export const selectedAvatar = () => selectedId

export const selectAvatar = id => {
  selectedId = id

  document.dispatchEvent(
    new AvatarChangedEvent(selectedId, avatarName(id), config(id))
  )
}
domExport(selectAvatar, 'selectAvatar')

let selectedId

class AvatarChangedEvent extends Event {
  constructor(id, avatarName, config) {
    super('avatar-changed')
    this.id = id
    this.avatarName = avatarName
    this.config = config
  }
}
