import de from "./translations_de.js"
import en from "./translations_en.js"
import es from "./translations_es.js"
import fr from "./translations_fr.js"
import pt from "./translations_pt.js"

const params = new URLSearchParams(window.location.search)
const locale = params.get('lang') || 'en'

const dictionary = {
  en,
  es,
  pt,
  // fr,
  // de,
}

export function t(key, params = {}) {
  const raw = dictionary?.[locale]?.[key] || key;

  return raw.replace(/\{\{(\w+)\}\}/g, (_, param) => {
    return params[param] ?? `{{${param}}}`;
  });
}