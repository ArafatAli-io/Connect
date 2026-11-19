"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { FaHeart, FaPaperPlane, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa'
import CommentDialog from './CommentDialog'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import Posts from './Posts'
import { setPosts } from '@/lib/redux/postSlice'
import { setSelectedPost } from '@/lib/redux/postSlice'
import { Badge } from '@/components/ui/badge'


const Post = ({ post }) => {

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changeEventHandeler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${post._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map(p =>
          p._id == post._id ? {
            ...p,
            likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id]
          } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/${post._id}/comment`, { text }, {
        headers: {
          'content-Type': 'application/json'
        }, withCredentials: true
      });
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id == post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deletePostHandeler = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/post/delete/${post?._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="Profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex items-center gap-3'>
             <h1>{post.author?.username}</h1>
             {user?._id == post.author._id && <Badge variant='secondary'>Author</Badge>}
          </div>
          
        </div>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant='ghost' className="cursor-pointer text-red-500 w-fit font-bold font-serif">unfollow</Button>
            <Button variant='ghost' className="cursor-pointer w-fit font-semibold font-serif">Add to favorites</Button>
            {
              user && user?._id === post?.author._id &&
              <Button onClick={deletePostHandeler} variant='ghost' className="cursor-pointer w-fit font-semibold font-serif">Delete</Button>}
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full min-h-[75vh] min-w-[27vw] overflow-hidden rounded-xl mt-4">
        <Image
          src={post.image}
          alt="post"
          width={1200}
          height={800}
          className="w-full h-[75vh] object-cover rounded-2xl"
        />
      </div>
      <div className='flex items-center justify-between my-2'>
        <div className=' flex items-center gap-3'>
          {
            liked ? <FaHeart onClick={likeOrDislikeHandler} size={"20px"} color='red' className='cursor-pointer' /> : <FaRegHeart onClick={likeOrDislikeHandler} size={"20px"} className='cursor-pointer hover:text-gray-600' />
          }
          <FaRegComment onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }} size={"20px"} className='cursor-pointer hover:text-gray-600' />
          <FaPaperPlane size={"20px"} className='cursor-pointer hover:text-gray-600' />
        </div>
        <FaRegBookmark size={"20px"} className='cursor-pointer hover:text-gray-600' />
      </div>
      <span className='font-semibold block mr-2'>{postLike} Likes</span>
      <p>
        <span className='font-semibold block mr-2'>{post.author?.username}</span>
        {post.caption}
      </p>{
        comment.length > 0 && (
          <span onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
        )
      }
      <CommentDialog open={open} setOpen={setOpen} />
      <div className='flex items-center justify-between'>
        <input
          type='text'
          placeholder='Add a comment...'
          value={text}
          onChange={changeEventHandeler}
          className='outline-none text-sm w-full'
        />
        {
          text && <span onClick={commentHandler} className='text-[#38ADF8] cursor-pointer'>Post</span>
        }
      </div>
    </div>
  )
}

export default Post
