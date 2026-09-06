"use client"

import React, { useState } from 'react'
import { Button } from './button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSubscriptionStore } from '@/store/store'
import { useToast } from './use-toast'
import {v4 as uuidv4} from "uuid"
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { addChatRef, chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { ToastAction } from './toast'
type Props = {
  isLarge?: boolean
}

const CreateChatButton = ({isLarge}: Props) => {
    const router = useRouter();
    const {data: session} = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const {toast} = useToast();
    const subscription = useSubscriptionStore(state => state.subscription);
    const createNewChat = async() => {
      if (!session?.user.id) return;
      setLoading(true);

      toast({
        title: "Creating New Chat",
        description: "Hold tight as we create your new chat...",
        duration: 3000,
      })

      // TODO: check if user is pro and limit if not

      const noOfChats = (await getDocs(chatMembersCollectionGroupRef(session?.user.id))).docs.map(doc => doc.data()).length;
      const isPro = subscription?.role === "pro" && subscription?.status === "active";
      if (!isPro && noOfChats >= 3) {
        toast({
          title: "Free Plan limit exceeded",
          description: "You have exceeded the number of users in a single chat for the FREE plan. Please Upgrade to PRO to continue adding more users",
          variant: "destructive",
          action: (
            <ToastAction altText="Upgrade" onClick={()=> router.push("/register")}>
              Upgrade to PRO
            </ToastAction>
          )
        })
        return;
      }
      const chatId = uuidv4();

      await setDoc(addChatRef(chatId, session.user.id), {
        userId: session.user.id!,
        email: session.user.email!,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId: chatId,
        image: session.user.image || ""
      }).then(()=> {
        toast({
          title: "Success",
          description: "Your Chat is being created",
          className: "bg-green-600 text-white",
          duration: 2000,
        })

        router.push(`/chat/${chatId}`);
      }).catch(()=>{
        toast({
          title: "Error",
          description: "There was an error creating your chat!",
          variant: "destructive"
        })
      }).finally(()=> {
        setLoading(false);
      })



    }

    if (isLarge) {
      return (
        <Button onClick={createNewChat} variant={'default'}>
            <MessageSquarePlusIcon  />
        </Button>
      )
    }

  return (
    <Button onClick={createNewChat} variant={'ghost'}>
        <MessageSquarePlusIcon  />
    </Button>
  )
}

export default CreateChatButton