import { getPrefix } from './nano_helpers.js'

class Spirit extends HTMLElement {
  constructor() {
    super()
  }

  static #spirit(word, klaso) {
    return `<span class='nn-${klaso}'>${word}</span>`
  }

  static #ESCAPE_MAP = {
    '\n': 'n-line',
    '\t': 'tab',
    ' ': 'space',
    '<': 'lt',
    '>': 'gt',
    '&': 'amp',
    '/': 'slash',
    '*': 'asterik',
    "'": 's-quote',
    '"': 'd-quote',
    '`': 'acute',
    '(': 'parenthesis-o',
    '[': 'bracket-o',
    '{': 'brace-o',
    ')': 'parenthesis-c',
    ']': 'bracket-c',
    '}': 'brace-c',
  }

  static #REVERSE_ESCAPE_MAP = Object.fromEntries(
    Object.entries(Spirit.#ESCAPE_MAP).map(([char, name]) => [
      `♥♥${name}♥♥`,
      char,
    ])
  )

  static #escapeChar(char) {
    return `♥♥${Spirit.#ESCAPE_MAP[char]}♥♥`
  }

  static compressText(text) {
    return text
      .trim()
      .replace(/[\n\t <>&/*'"`(){}\[\]]/g, char => Spirit.#escapeChar(char))
  }

  static decompressText(text) {
    for (const [pattern, original] of Object.entries(
      Spirit.#REVERSE_ESCAPE_MAP
    )) {
      const replaceWith = pattern.includes('n-line')
        ? `${Spirit.#spirit('', 'n-line')}<br>`
        : pattern.includes('tab')
          ? Spirit.#spirit('', 'tab')
          : pattern.includes('space')
            ? Spirit.#spirit('', 'space')
            : `&#${original.charCodeAt(0)};`

      text = text.replaceAll(pattern, replaceWith)
    }
    return text
  }

  static formatJs(text) {
    let processed = Spirit.compressText(text)

    // Strings
    processed = processed.replace(
      /(♥♥(?:s-quote|d-quote|acute)♥♥).*?(♥♥(?:s-quote|d-quote|acute)♥♥)/g,
      match => Spirit.#spirit(match, 'string')
    )

    // Line comments
    processed = processed.replace(
      /(♥♥slash♥♥){2}.*?(♥♥n-line♥♥)/g,
      match => Spirit.#spirit(match, 'comment')
    )

    // Block comments
    processed = processed.replace(
      /(♥♥slash♥♥)(♥♥asterik♥♥).*?(♥♥asterik♥♥)(♥♥slash♥♥)/g,
      match => Spirit.#spirit(match, 'comment')
    )

    // Reserved keywords
    processed = processed.replace(/\b(new|import|from|get|set)\b/g, match =>
      Spirit.#spirit(match, 'reserved')
    )

    // Booleans and null/undefined
    processed = processed.replace(/\b(true|false|null|undefined)\b/g, match =>
      Spirit.#spirit(match, 'boolean')
    )

    // Numbers
    processed = processed.replace(/[+-]?(\d+)?\.?\d+/g, match =>
      Spirit.#spirit(match, 'number')
    )

    // Generics/types inside angle brackets
    processed = processed.replace(/(♥♥lt♥♥).*?(♥♥gt♥♥)/g, match =>
      Spirit.#spirit(match, 'type')
    )

    // Brackets/parentheses/braces
    processed = processed.replace(
      /♥♥(parenthesis-[oc]|bracket-[oc]|brace-[oc])♥♥/g,
      match => Spirit.#spirit(match, 'parenthesis')
    )

    return Spirit.decompressText(processed)
  }

  connectedCallback() {
    this.innerHTML = Spirit.formatJs(this.innerHTML)
  }

  static get observedAttributes() {
    return ['text']
  }
}

customElements.define(getPrefix('code'), Spirit)

export default Spirit
