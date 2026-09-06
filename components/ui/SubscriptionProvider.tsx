'use client'

import { subscriptionRef } from '@/lib/converters/Subscription'
import { useSubscriptionStore } from '@/store/store'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

const SubscriptionProvider = ({children}: Props) => {
    const {data: session} = useSession();
    const setSubscription = useSubscriptionStore((state)=> state.setSubscription);


    useEffect(()=>{
        if (!session) return;
        return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
            if (snapshot.empty) {
                console.log("User has No Subscription");
                setSubscription(null);
                return;
            }else {
                console.log("User has Subscription")
                setSubscription(snapshot.docs[0].data());
            }
        }, (error) => {
            console.log("Error Getting The document", error);
        })
    },[session, setSubscription])

  return (
    <div>{children}</div>
  )
}

export default SubscriptionProvider