import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useRef } from 'react'

const CreatePost = ({ open, setOpen }) => {
const imageRef = useRef();

const createPostHandler = async (e) => {
  e.preventDefault();
  try {
    
  } catch (error) {
    
  }
}

  const handleDialogChange = (value) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent >
        <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src="https://github.com" alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>Username</h1>
            <spam className="text-gray-600 text-xs">Bio here...</spam>
          </div>
        </div>
        <Textarea placeholder='Write a caption...'/>
        <Input ref={imageRef} type='file' className='hidden'/>
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-blue-600 hover:bg-blue-800'>Add your Post</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
