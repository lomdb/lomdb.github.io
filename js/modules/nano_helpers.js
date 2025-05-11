const nano = 'nn-'

function getPrefix(name) {
  return [nano, name].join('')
}

export { nano, getPrefix }
