"use client"

import useAdminId from '@/hooks/useAdminId'
import { ChatMembers, chatMemberAdminRef, chatMembersRef, deletechatMembersRef } from '@/lib/converters/ChatMembers'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import LoadingSpinner from './LoadingSpinner'
import { Badge } from './badge'
import UserAvatar from './UserAvatar'
import { MinusCircleIcon } from 'lucide-react'
import { deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useToast } from './use-toast'
import { useSession } from 'next-auth/react'
type Props = {
    chatId: string,
}

const ChatMembersShipBadge = ({ chatId }: Props) => {
    const [members, loading, error] = useCollectionData<ChatMembers>(
        chatMembersRef(chatId)
    )

    const {data: session} = useSession();

    const adminId = useAdminId({chatId});
    const {toast} = useToast();

    if (loading && !members) return <LoadingSpinner />

    const deleteUserFromChat = async (id: string) => {
      await deleteDoc(doc(db, "chats", chatId, "members", id)).then(()=> {
        toast({
          title: "User deleted successfully",
          description: "This User is No longer part of the chat",
          duration: 3000,
        })
      }).catch(()=> {
        toast({
          title: "There was an Error",
          description: "This User could not be deleted..., Sorry",
          variant: 'destructive'
        })
      })
    }

  return (
    !loading && (
      <div className='p-2 rounded-xl border m-5'>
        <div className='flex flex-wrap justify-center md:justify-start items-center gap-2 p-2'> 
          {members?.map((member) => (
            <Badge variant="secondary" key={member.email} className='h-14 p-5 pl-2 pr-5 flex space-x-2'>
              <div className='flex items-center space-x-2'>
                <UserAvatar name={member.email} image={member.image} />
              </div>

              <div>
                <p>{member.email}</p>
                {member.userId === adminId && (
                  <p className='text-indigo-400 animate-pulse'>Admin</p>
                )}
              </div>
              <div>
                {(member.userId !== adminId && session?.user.id === adminId) && (
                  <MinusCircleIcon className='bg-red-600 cursor-pointer hover:scale-105 rounded-full' onClick={() => deleteUserFromChat(member.userId)} />
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  )
}

export default ChatMembersShipBadge