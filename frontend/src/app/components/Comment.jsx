
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const Comment = ({ comment }) => {
    return (
        <div className='flex items-center gap-2 '>
            <div className='p-1'>
                <Avatar>
                    <AvatarImage src={comment?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='ml-2'>
                <h1 className='font-bold'>
                    {comment?.author?.username}
                </h1>
                <span className='text-sm '>{comment?.text}</span>
            </div>
        </div>
    )
}

export default Comment

