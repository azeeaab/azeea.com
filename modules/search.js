const state = {
  intensity: [0.5, '50%'],
  location: [0.5, '100km'],
  network: [0.5, '50%'],
  prefs: [0.5, '50%'],
}

export const intensity = () => state.intensity[1]
export const location = () => state.location[1]
export const network = () => state.network[1]
export const prefs = () => state.prefs[1]

const setLocation = value => {
  const valueIndex = Math.round(value * 3)
  state.location = [valueIndex / 3, distances[valueIndex]]
}

export const searchValue = tabId => {
  const prop = property(tabId)
  return state[prop][1]
}

export const searchPercentage = tabId => {
  const prop = property(tabId)
  return state[prop][0]
}

export const setSearchValue = (percentage, tabId) => {
  const prop = property(tabId)
  if (prop === 'location')
    setLocation(percentage)
  else
    state[prop] = percentageValue(percentage)
  document.dispatchEvent(new StateChangedEvent(prop, state[prop][0], state[prop][1]))
}

export const tabId = state => {
  switch (state) {
    case 'intensity': return '_0'
    case 'location': return '_1'
    case 'network': return '_2'
    case 'prefs': return '_3'
  }
}

export const property = tabId => {
  switch (tabId) {
    case '_0': return 'intensity'
    case '_1': return 'location'
    case '_2': return 'network'
    case '_3': return 'prefs'
  }
}

class StateChangedEvent extends Event {
  constructor(state, percentage, value) {
    super('search-changed')
    this.state = state
    this.percentage = percentage
    this.value = value
    Object.freeze(this)
  }
}

const percentageValue = value =>
  [Math.round(value * 100) / 100, `${Math.round(value * 100)}%`]

const distances = [
  '1km',
  '10km',
  '100km',
  'anywhere',
]
