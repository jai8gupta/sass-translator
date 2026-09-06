import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CheckoutButton from './CheckoutButton'

type Props = {
    redirect: boolean
}

const tiers = [
    {
        name: "Starter",
        id: null,
        href: "#",
        priceMonthly: null,
        description: "Get Chatting Right Away with Anywone and AnyWhere!",
        features: [
            "20 Message Chat limit in Chats",
            "2 Participant limit in Chat",
            "3 Chat Rooms limit",
            "Support 2 languages",
            "48-hours support response time"
        ],
    },
    {
        name: "Pro",
        id: "pro",
        href: "#",
        priceMonthly: "₹ 299",
        description: "Unlock the Full Potential with Pro!",
        features: [
            "Unlimited Messages in Chats",
            "Unlimited Participants in Chats",
            "Unlimited Chat Rooms",
            "Multimedia support in chats (coming soon)",
            "1-hour, dedicated support response time",
            "Early access to New Features"
        ],
    },
]



const PricingCards = ({redirect}: Props) => {
  return (
    <div>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map(tiers => (
                <div 
                key={tiers.id}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                    <div>
                        <h3 id={tiers.id + tiers.name} className='text-base font-semibold leading-7 text-indigo-600'>
                            {tiers.name}
                        </h3>
                        <div className='mt-4 flex items-baseline gap-x-2'>
                            {tiers.priceMonthly ? (
                                <>
                                  <span className='text-5xl font-bold tracking-tight text-gray-900'>
                                    {tiers.priceMonthly}
                                  </span>
                                  <span className='text-base font-semibold leading-7 text-gray-600'>
                                    /month
                                  </span>
                                </>
                            ): (
                                <span className='text-5xl font-bold tracking-tight text-gray-900'>
                                    Free
                                </span>
                            )}
                        </div>
                        <p className='mt-6 text-base leading-7 text-gray-600'>
                            {tiers.description}
                        </p>
                        <ul
                        role='list'
                        className='mt-10 space-y-4 text-sm leading-6 to-gray-600'
                        >
                            {tiers.features.map((feature) => (
                                <li key={feature} className='flex gap-x-3'>
                                    <CheckIcon
                                    className='h-6 w-5 flex-none to-indigo-600'
                                    aria-hidden="true"
                                    />
                                    <span className='text-black'>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                </div>
                    {redirect ? (
                        <Link className='mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold 
                        leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80
                        ' href="/register">
                            Get Started Today
                        </Link>
                    ) : (
                        tiers.id && <CheckoutButton />
                    )}
            </div>
            ))}
        </div>
    </div>
  )
}

export default PricingCards