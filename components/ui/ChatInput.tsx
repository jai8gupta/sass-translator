"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormMessage, Form } from './form'
import { Input } from './input'
import { Button } from './button'
import { useSession } from 'next-auth/react'
import { User, limitedMessageRef, messageRef } from '@/lib/converters/Messages'
import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useSubscriptionStore } from '@/store/store'
import { useToast } from './use-toast'
import { ToastAction } from './toast'
type Props = {
  chatId: string
}

const formSchema = z.object({
  input: z.string().max(1000),

})


const ChatInput = ({chatId}: Props) => {

  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: ""
    }
  })
  const subscription = useSubscriptionStore((state) => state.subscription);


  async function onsubmit(values:z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim()
    form.reset()
    if (values.input.length === 0) {
      return
    }
    if (!session?.user) {
      return;
    }
    const isPro = subscription?.role === "pro" && subscription?.status === "active";
    const messages = ((await getDocs(limitedMessageRef(chatId))).docs.map((doc)=> doc.data())).length;

    if (!isPro && messages >= 20) {
      toast({
        title: "Free Plan limit exceeded",
        description: "Upgrade to PRO for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction altText='Upgrade' onClick={()=> router.push("/register")}>
            Uprade to PRO
          </ToastAction>
        )
      })
    }

    const userToStore : User = {
      id: session.user.id,
      email: session.user.email,
      image: session.user.image || "",
      name: session.user.name
    }

    addDoc(messageRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    })

  }



  return (
    <div className='sticky w-96 lg:w-auto'>
      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onsubmit)}
        className='flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800'
        >
          <FormField control={form.control} name='input'
          render={({field}) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input className='border-none bg-transparent dark:placeholder:text-white/70'
                placeholder='Enter text in ANY language...'
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type='submit' className='bg-violet-600 text-white'>
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput