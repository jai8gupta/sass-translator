"use client"
import { authOptions } from '@/auth'
import { db } from '@/firebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useSubscriptionStore } from '@/store/store'
import ManageAccountButton from './ManageAccountButton'

type Props = {}

const CheckoutButton = (props: Props) => {
  const {data: session} = useSession()
  const [loading, setLoading] = useState(false)
  const subscription = useSubscriptionStore(state => state.subscription)

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active" && subscription?.role === "pro"
  const createCheckOutSession = async() => {
    if (!session?.user.id) return
    // push a document into firestore db
    setLoading(true);

    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
      price : "price_1ONey9SFoWeeJDov6LC8IkD9",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })
    // ... stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;
      
      if (error) {
        alert(`An Error Occured: ${error?.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    })

    

    // redirect user to checkout page
  }
  return (
    <div className='flex flex-col space-y-2'>
      <div className='mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold 
      leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80
      '>
        {isSubscribed ? (
          <ManageAccountButton />
        ): (
          isLoadingSubscription || loading ? <LoadingSpinner />: <button onClick={()=> createCheckOutSession()}>Sign Up</button>
        )
        }
        </div>
    </div>
  )
}

export default CheckoutButton