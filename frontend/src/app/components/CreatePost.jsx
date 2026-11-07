import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { setPosts } from '@/lib/redux/postSlice';
import { readFileAsDataURL } from '@/lib/utils';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector((store) => store.post); 
  const dispatch = useDispatch();

  const fileChangeHandeler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }


  const createPostHandler = async (e) => {
    e.preventDefault();

    if (!caption.trim() && !file) {
      toast.error("Please add a caption or select an image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);

    if (file) {
      formData.append("image", file);
    }
    console.log(formData)

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/post/addpost`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setCaption("");
        setFile(null);
        setImagePreview("");
        setOpen(false);
      } else {
        toast.error(res.data.message || "Post creation failed");
      }

    } catch (error) {
      console.error("Post creation error:", error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleDialogChange = (value) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent >
        <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{user?.username}</h1>
            <span className="text-gray-600 text-xs">Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Write a caption...' />
        {
          imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        <Input onChange={fileChangeHandeler} ref={imageRef} type='file' className='hidden' />
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-blue-600 hover:bg-blue-800'>Create Post</Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className="w-full">
                Add New Post
              </Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
