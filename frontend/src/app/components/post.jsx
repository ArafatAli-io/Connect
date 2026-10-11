import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaPaperPlane, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa'

const Post = () => {
  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className='cursor-pointer'/>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant='ghost' className="cursor-pointer w-fit font-bold font-serif">unfollow</Button>
            <Button variant='ghost' className="cursor-pointer w-fit font-semibold font-serif">Add to favorites</Button>
            <Button variant='ghost' className="cursor-pointer w-fit font-semibold font-serif">Delete</Button>
          </DialogContent>
        </Dialog>
      </div>
     <div className="w-full min-h-[55vh] overflow-hidden rounded-xl mt-4">
  <Image
    src="/cat.jpg"
    alt="Picture of a cat"
    width={1200}
    height={800}
    className="w-full h-[55vh] object-cover rounded-2xl"
  />
</div>
<div className='flex items-center justify-between my-2'>
  <div className=' flex items-center gap-3'>
    <FaRegHeart size={"20px"} className='cursor-pointer hover:text-gray-600'/>
    <FaRegComment size={"20px"} className='cursor-pointer hover:text-gray-600'/>
    <FaPaperPlane size={"20px"} className='cursor-pointer hover:text-gray-600'/>
  </div>
  <FaRegBookmark size={"20px"} className='cursor-pointer hover:text-gray-600'/>
</div>
<span className='font-semibold block mr-2'>1k Likes</span>
<p>
  <span className='font-semibold block mr-2'>username</span>
  caption
</p>
<span>view all 10 comments</span>
    </div>
  )
}

export default Post
