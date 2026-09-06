"use client"

import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog, 
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter,
    DialogClose
  } from "./dialog"
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Copy } from 'lucide-react'
import { useToast } from './use-toast'
type Props = {
    isOpen: boolean,
    chatId: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ShareLink = ({isOpen, chatId, setIsOpen}: Props) => {
  const { toast } = useToast();
  const host = window.location.host;
  const linktoChat = process.env.NODE_ENV === "development" ? `http://${host}/chat/${chatId}`: `https://${host}/chat/${chatId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(linktoChat);

      toast({
        title: "Copied Successfully",
        description: "Share this with the person you want to chat with !!",
        className: "bg-green-600 text-white"
      })
    } catch (error) {
      console.error("Failed to Copy Text -", error)
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)} defaultOpen={isOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">
        <Copy className='mr-2' />
        Share Link
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
        Share Link
        </DialogTitle>
        <DialogDescription>
          Any User With this link that has been{" "}
          <span className="text-indigo-600 font-bold">granted Access</span>
        </DialogDescription>
      </DialogHeader>

      <div className='flex items-center space-x-2'>
        <div className='grid flex-1 gap-2'>
          <Label htmlFor='link' className='sr-only'>
            Link
          </Label>
          <Input id="link" defaultValue={linktoChat} readOnly />
        </div>
        <Button type='submit' size="sm" className='px-3' onClick={()=> copyToClipboard()}>
          <span className='sr-only'>Copy</span>
          <Copy className='h-4 w-4' />
        </Button>
      </div>
      <DialogFooter className='sm:justify-start'>
        <DialogClose asChild>
          <Button type='button' variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>

    </DialogContent>
  </Dialog>
  )
}

export default ShareLink