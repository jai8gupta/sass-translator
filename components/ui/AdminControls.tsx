import React from 'react'
import InviteUser from './InviteUser'
import DeleteChatButton from './DeleteChatButton'

type Props = {
    chatId: string
}

const AdminControls = ({chatId}: Props) => {
  return (
    <div className='flex justify-end space-x-2 m-5 mb-0'>
        <InviteUser chatId={chatId} />
        <DeleteChatButton chatId={chatId} />
    </div>
  )
}

export default AdminControls