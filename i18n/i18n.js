import i18n from "i18next";
import en from './locales/en.json';
import fr from './locales/fr.json';
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: en,
        language: 'English'
    },
    fr: {
        translation: fr,
        language: 'Français'
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        compatibilityJSON: 'v3',
        fallbackLng: 'fr',
        react: {
            useSuspense: false
        },

    }).then(r => console.log("test"));


export default i18n;