import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { extractObjectPath } from './utills'
import { en, th } from './resources'

const DEFAULT_LANGUAGE = 'en'

const resources = {
  en: {
    translation: en,
  },
  th: {
    translation: th,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
export const tkeys = extractObjectPath({ ...en })
