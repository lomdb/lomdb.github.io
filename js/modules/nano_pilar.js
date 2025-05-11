import { getPrefix } from './nano_helpers.js'

function parseSize(size) {
  const [num, denom] = size.split('/').map(Number)
  return { str: size, value: num / denom }
}

const sizes = [
  '1/20',
  '1/19',
  '1/18',
  '1/17',
  '1/16',
  '1/15',
  '1/14',
  '1/13',
  '1/12',
  '1/11',
  '1/10',
  '1/9',
  '1/8',
  '1/7',
  '3/20',
  '1/6',
  '1/5',
  '1/4',
  '3/10',
  '1/3',
  '7/20',
  '2/5',
  '5/12',
  '9/20',
  '1/2',
  '11/20',
  '7/12',
  '3/5',
  '13/20',
  '2/3',
  '7/10',
  '3/4',
  '4/5',
  '5/6',
  '17/20',
  '9/10',
  '11/12',
  '19/20',
  '1/1',
].map(parseSize)

function formatClass(fraction) {
  return (
    fraction &&
    fraction.str
      .split('/')
      .reduce((numerator, denominator) => ['n', numerator, 'd', denominator].join(''))
  )
}

const sizeValueMap = new Map(sizes.map(s => [s.value, s]))
const sizeStrMap = new Map(sizes.map(s => [s.str, s]))

function percent2Class(percent) {
  const percentValue = parseFloat(percent) / 100
  return formatClass(sizeValueMap.get(percentValue))
}

function fraction2Class(fraction) {
  return formatClass(sizeStrMap.get(fraction))
}

class Pilar extends HTMLElement {
  constructor() {
    super()
  }

  removeCustomClass(regex) {
    ;[...this.classList].forEach(
      currentClass => regex.test(currentClass) && this.classList.remove(currentClass)
    )
  }

  updateAttr(name, regex) {
    this.removeCustomClass(regex)
    const size = this.getAttribute(name)
    if (!size) return

    const isCalc = /[-+*]/g.test(size)
    const hasPercent = /\d+%/.test(size)
    const hasFraction = /\d+\/\d+/.test(size)
    const isStyle = /([mc]m|ex|ch|v[wh]|v(min|max)|p[ctx]|r?em|[-+*])/.test(size)

    if (hasPercent && !isStyle) {
      const newClass = percent2Class(size)
      if (newClass) this.classList.add(newClass)
      return
    }

    if (hasFraction && !isStyle) {
      const newClass = fraction2Class(size)
      if (newClass) this.classList.add(newClass)
      return
    }

    if (isStyle) {
      const newStyle = isCalc ? `calc(${size})` : size
      this.style.width = newStyle
      this.style.maxWidth = newStyle
      this.style.flexBasis = newStyle
    }
  }

  connectedCallback() {
    this.updateAttr('size', /\d+\/\d+/)
  }

  static get observedAttributes() {
    return ['size']
  }

  attributeChangedCallback(prop) {
    switch (prop) {
      case 'size':
        this.updateAttr('size', /\d+\/\d+/)
        break
    }
  }
}

window.customElements.define(getPrefix('pilar'), Pilar)
