import { create } from 'zustand';
import { Subscription } from '@/types/Subscription'

export type LanguageSupported = "en"|"es"|"de"|"fr"|"hi"|"ru"


export const LanguageSupportedMap: Record<LanguageSupported, string> = {
    en: "English",
    es: "Spanish",
    de: "Germam",
    fr: "French",
    hi: "Hindi",
    ru: "Russian"
}
const LANGUAGES_IS_FREE = 2;
interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null)=> void;
}

interface LanguageState {
    language: LanguageSupported;
    setLanguage: (language: LanguageSupported) => void;
    getLanguages: (isPro: boolean) => LanguageSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[];

}

export const useLanguageStore = create<LanguageState>((set, get)=> ({
    language: 'en',
    setLanguage: (language: LanguageSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        if (isPro) {
            return Object.keys(LanguageSupportedMap) as LanguageSupported[];
        } else {
            return Object.keys(LanguageSupportedMap).slice(0,LANGUAGES_IS_FREE) as LanguageSupported[];
        }
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        if (isPro) return [];
        return Object.keys(LanguageSupportedMap).slice(LANGUAGES_IS_FREE) as LanguageSupported[];
    }

}))

export const useSubscriptionStore= create<SubscriptionState>((set)=> ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription }),
}))