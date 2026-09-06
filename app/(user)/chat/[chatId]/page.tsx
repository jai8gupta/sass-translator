import { authOptions } from '@/auth'
import AdminControls from '@/components/ui/AdminControls'
import ChatInput from '@/components/ui/ChatInput'
import ChatMembersShipBadge from '@/components/ui/ChatMembersShipBadge'
import ChatMessages from '@/components/ui/ChatMessages'
import { chatMembersRef } from '@/lib/converters/ChatMembers'
import { sortedMessagesRef } from '@/lib/converters/Messages'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params:{
    chatId: string
  }
}

async function ChatPage({params: { chatId }}: Props) {
  const session = await getServerSession(authOptions);
  const initialMessages = ((await getDocs(sortedMessagesRef(chatId))).docs.map(doc => doc.data()))

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs.map(doc => doc.id).includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission")


  return (
    <div className='w-auto'>
      <AdminControls chatId={chatId} />
      <ChatMembersShipBadge chatId={chatId} />
      <div className='flex-1'>
        <ChatMessages
        chatId={chatId}
        sesssion={session}
        initialMessages={initialMessages}
        />
      </div>

      <div className=' mt-52'>
        <ChatInput chatId={chatId} />
      </div>
    </div>
  )
}

export default ChatPage