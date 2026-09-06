import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Button } from './button'
import Link from 'next/link'


type Props = {}

const ChatPermissionError = (props: Props) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className='flex'>
        <p className='flex-1'>
            You dont have Permission to View this Chat !!
            <br />
            <span className='font-bold'>
                Please ask the chat admin to add you to the chat
            </span>
        </p>

        <Link href="/chat" replace>
            <Button variant="destructive">Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default ChatPermissionError