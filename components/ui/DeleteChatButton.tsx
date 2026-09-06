"use client"

import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useToast } from './use-toast'
import { useRouter } from 'next/navigation'
import useAdminId from '@/hooks/useAdminId'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'

type Props = {
    chatId: string
}

const DeleteChatButton = ({ chatId }: Props) => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const adminId = useAdminId({chatId});

    const handleClick = async () => {
        toast({
            title: "Deleting Chat",
            description: "Please Wait while we delete this Chat"
        })

        await fetch("/api/chat/delete", {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chatId: chatId, adminId: adminId})
        }).then(res => {
            toast({
                title: "Success",
                description: "Your Chat has been deleted",
                className: "bg-green-600 text-white",
                duration: 3000
            });
            router.replace('/chat');
        }).catch((err) => {
            console.log(err.message);
            toast({
                title: "Error",
                description: "There was an error deleting your chat",
                variant:"destructive"
            });
        })
    }


  return session?.user.id === adminId && (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="destructive">
        Delete Chat
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
        Are You Sure
        </DialogTitle>
        <DialogDescription>
         This Will Delete Chat for{" "}
          <span className="text-red-600 font-bold">All Users</span>
        </DialogDescription>
      </DialogHeader>

      <div className='flex items-center space-x-2'>
        <div className='grid flex-1 gap-2'>
            <Button variant="destructive" onClick={handleClick}>
                Delete
            </Button>
            <Button variant="outline" onClick={()=> setOpen(false)}>
                Cancel
            </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteChatButton