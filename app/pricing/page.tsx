import React from 'react'
import {} from 'next/navigation'
import PricingCards from '@/components/ui/PricingCards';
type Props = {}

const PricingPage = (props: Props) => {
    return (
        <div className="isolate overflow-hidden w-full dark:bg-gray-900">
          <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-indigo-600 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                    
                  <span className="relative">Affordable</span>
                </span>{' '}
                for everyone
              </h2>
              <p className="text-base text-white md:text-lg">
                The Right Pricing for You !!!
              </p>
            </div>
            <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,
                transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
            >
                <ellipse
                    cx={604}
                    cy={512}
                    fill="url(#radial-gradient-pricing)"
                    rx={604}
                    ry={512}
                />
                <defs>
                    <radialGradient id='radial-gradient-pricing'>
                        <stop stopColor="#777506"/>
                        <stop offset={1} stopColor="#E935C1" />

                    </radialGradient>
                </defs>
            </svg>
          <PricingCards redirect={true} />
       
          </div>
        </div>
      );
}

export default PricingPage