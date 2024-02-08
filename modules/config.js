import * as aqua_dude from '../aqua_dude/config.js'
import * as tennis_queen from '../tennis_queen/config.js'
import * as basket_jr from '../basket_jr/config.js'
import * as blank from '../blank/config.js'

const avatarConfigs = {
  aqua_dude,
  tennis_queen,
  basket_jr,
  blank,
}

export const mapAvatars = newMapping => {
  const set = unknownNames(newMapping)
  if (set.size !== 0)
    throw new Error(`Unknown avatar(s): '${set}'`)

  mapping = newMapping
}

export const config = avatarId => avatarConfigs[avatarName(avatarId)]
export const avatarName = avatarId => mapping[avatarId]

const unknownNames = newMapping => {
  const mappedNames = Object.values(newMapping)
  const knownNames = Object.keys(avatarConfigs)
  const set = new Set(mappedNames)
  for (const name of knownNames) set.delete(name)
  return set
}

let mapping = {}
