import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import DemoGif from "@/images/DemoGif.gif"
export default function Home() {
  return (
    <main className='overflow-x-hidden'>
      <div className='py-12 sm:py-20 lg:pb-40'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl pb-10'>Chat With Us Anytime. Anywhere, Any Language</h1>
          <span className="text-indigo-600 dark:text-indigo-500 text-2xl">Let AI handle the difference of Language</span>
        </div>
        
      <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/chat" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
          text-white dark:text-white shadow-sm hover:bg-indigo-500 focus:visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-indigo-500
          ">Get Started</Link>
          <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300
          ">View Pricing <span aria-hidden={true}>-&gt;</span></Link>
      </div>
        <div className='mt-16 flow-root sm:mt-24 grid place-items-center'>
            <div className="-m-2 rounded-xl bg-gray-500/5 p-2  ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
              unoptimized
              src={DemoGif}
              alt='demo'
              width={1200}
              height={1200}
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
        </div>
      </div>
    </main>
  )
}
