import LoadingSpinner from '@/components/ui/LoadingSpinner'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className='flex items-center p-10 justify-center'>
        <LoadingSpinner />
    </div>
  )
}

export default loading