import { validateCountryCode } from './utils.js'

const params = new URLSearchParams(window.location.search)
const locale = params.get('lang') || 'en'
const currentRoute = window.location.pathname.split('.html')[0].slice(1)

const filters = params
  .get('server')
  ?.replace(/-/g, '_')
  .split(',')
  .map(f => {
    const [id, serverId] = f.split('_')
    return [validateCountryCode(id.toUpperCase(), serverId), serverId].join('_')
  })

export { locale, filters, currentRoute }
