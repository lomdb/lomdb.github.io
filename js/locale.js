const params = new URLSearchParams(window.location.search)
const locale = params.get('lang') || 'en'

export { locale }
