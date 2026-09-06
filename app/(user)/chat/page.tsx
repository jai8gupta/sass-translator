import ChatList from '@/components/ui/ChatList'
import ChatPermissionError from '@/components/ui/ChatPermissionError'
import React from 'react'

type Props = {
    params: {},
    searchParams : {
        error: string
    }
}

const ChatsPage = ({searchParams: {error}}: Props) => {
  return (
    <div>

      {error && (
        <div className='mr-2'>
          <ChatPermissionError />
        </div>
      )}


        <ChatList />
    </div>
  )
}

export default ChatsPage