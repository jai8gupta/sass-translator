"use client"
import {
  Dialog, 
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription
} from "./dialog"

import { Input } from "./input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from 'zod'
import { getDocs, serverTimestamp, setDoc  } from "firebase/firestore"
import {addChatRef, chatMembersRef} from "@/lib/converters/ChatMembers"
import { useSession } from "next-auth/react"
import { getUserByEmailRef } from "@/lib/converters/User"
import { useState } from 'react'
import { useToast } from "./use-toast"
import useAdminId from "@/hooks/useAdminId"
import { PlusCircleIcon } from "lucide-react"
import { useSubscriptionStore } from "@/store/store"
import { ToastAction } from "./toast"
import { useRouter } from "next/navigation"
import { Button } from "./button"
import ShareLink from "./ShareLink"


type Props = {
    chatId: string
}



const formSchema = z.object({
  email: z.string().email("Please enter a valid email address")
})

const InviteUser = ({chatId}: Props) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({chatId});
  const subscription = useSubscriptionStore(state => state.subscription);
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);
  const isPro = subscription?.role === "pro" && subscription.status === 'active'
  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: ""
      }
    }
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) return;

    toast({
      title: "Sending Invite ...",
      description: "Please wait while we send the invite"
    })

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc)=> {
      return doc.data();
    }).length;

    if (!isPro && noOfUsersInChat >= 2) {
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

    const querySnapShot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapShot.empty) {
      toast({
        title: "User Not Found",
        description: "Please enter an email Address of a registered user or resend the invitation once they have signed up!",
        variant: 'destructive'
      });
      return;
    }else {
      const user = querySnapShot.docs[0].data();

      await setDoc(addChatRef(chatId, user.id), {
        chatId: chatId,
        email: user.email!,
        image: user.image || "",
        timestamp: serverTimestamp(),
        isAdmin: false,
        userId: user.id!
      }).then(()=> {
        setOpen(false);

        toast({
          title: "Added to Chat",
          description: "User Has Been Added to Chat",
          className: "bg-green-600 text-white",
          duration: 3000,
        })

        setOpenInviteLink(true);
      }).catch(()=> {
        toast({
          title: "Error",
          description: "There was an error adding the user to the chat",
          variant: 'destructive'
        })
        setOpen(false);
      })
    }

    form.reset()

  }




  return (
    adminId === session?.user.id && (
      <div className="w-auto">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User to Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                Add User to Chat
              </DialogTitle>
              <DialogDescription>
                Simply add another users email to invite them to chat:{" "}
                <span className="text-indigo-600 font-bold">(Note: they must be registered)</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
              >
                <FormField
                control={form.control}
                name="email"
                render={({ field })=>(
                  <FormItem>
                    <FormControl>
                      <Input placeholder="ddeez@nuts.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add to Cart
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
        isOpen={openInviteLink}
        setIsOpen={setOpenInviteLink}
        chatId={chatId}
        />
      </div>
    )
  )
}

export default InviteUser