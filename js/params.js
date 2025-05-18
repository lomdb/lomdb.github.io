import { validateCountryCode } from './utils.js'

const params = new URLSearchParams(window.location.search)
const locale = params.get('lang') || 'en'
const filters = params
  .get('server')
  ?.replace(/-/g, '_')
  .split(',')
  .map(f => {
    const [id, serverId] = f.split('_')
    return [validateCountryCode(id.toUpperCase(), serverId), serverId].join('_')
  })

export { locale, filters }
