"use client"
import { LanguageSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from '@/store/store'
import { usePathname } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import Link from 'next/link'

type Props = {}

const LanguageSelect = (props: Props) => {
    const [language, getLanguages, getNotSupportedLanguages, setLanguage] = useLanguageStore((state) => [
        state.language,
        state.getLanguages,
        state.getNotSupportedLanguages,
        state.setLanguage
    ])

    const subscription = useSubscriptionStore((state) => state.subscription);
    const isPro = subscription?.role === "pro" && subscription?.status === "active";
    
    const pathname = usePathname();
    const isChatPage = pathname.includes("/chat");


  return isChatPage && (
    <div>
        <Select onValueChange={(value: LanguageSupported)=> setLanguage(value)}>
             <SelectTrigger className='w-[150px] text-black dark:text-white'>
                <SelectValue placeholder={LanguageSupportedMap[language]} className=''/>
             </SelectTrigger>
             <SelectContent>
                {subscription === undefined ? (<LoadingSpinner />) : (
                    <>
                        {getLanguages(isPro).map(language => (
                            <SelectItem key={language} value={language}>
                                {LanguageSupportedMap[language]}
                            </SelectItem>
                        ))}
                        {getNotSupportedLanguages(isPro).map(language => (
                            <Link href="/register" key={language} prefetch={false}>
                                <SelectItem
                                key={language}
                                value={language}
                                disabled
                                className='bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1'
                                >
                                    {LanguageSupportedMap[language]} (PRO)
                                </SelectItem>
                            </Link>
                        ))}
                    </>
                )}
             </SelectContent>
        </Select>
    </div>
  )
}

export default LanguageSelect