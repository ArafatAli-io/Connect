"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/lib/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {

  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
  if (selectedPost) {
    setComment(selectedPost.comments || []);
  }
}, [selectedPost]);


  const changeEventHandeler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandeler = async () => {
    try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${selectedPost._id}/comment`,
      { text },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    if (res.data.success) {
      // Update comments immediately
      const updatedComments = [
        ...(selectedPost.comments || []),
        res.data.comment
      ];

      // Update local state
      setComment(updatedComments);

      // Update Redux posts
      const updatedPosts = posts.map((p) =>
        p._id === selectedPost._id
          ? { ...p, comments: updatedComments }
          : p
      );

      dispatch(setPosts(updatedPosts));

      // Update selected post in Redux too
      dispatch(setSelectedPost({
        ...selectedPost,
        comments: updatedComments
      }));

      setText("");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Comment failed");
  }
};

  const handleDialogChange = (value) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="min-w-[50vw] p-0 flex flex-col">
        <div className="flex flex-1">

          <div className="w-1/2 min-w-[20vw] min-h-[60vh]">
            <img
              src={selectedPost?.image}
              alt="post_image"
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          <div className="w-1/2 min-w-[20vw] min-h-[60vh] flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link href="/">
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} alt="logo" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href="/" className="font-semibold text-lg">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger>
                  <button
                    className="focus:outline-none p-1 cursor-pointer block rounded-full hover:bg-muted transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal />
                  </button>
                </DialogTrigger>

                <DialogContent className="flex flex-col items-center text-lg text-center p-2 gap-1">
                  <button className="cursor-pointer w-full text-red-500 font-bold p-2 hover:bg-muted rounded-md transition-colors">
                    Unfollow
                  </button>
                  <button className="cursor-pointer w-full p-2 hover:bg-muted rounded-md transition-colors">
                    Add to favorites
                  </button>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-2 bg-gray-400">
              {
                selectedPost?.comments.map((comment) =>
                  <div className="bg-gray-300 m-2 rounded-md">
                    <Comment key={comment._id} comment={comment} />
                  </div>
                )
              }
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <Input type="text" value={text} onChange={changeEventHandeler} placeholder="Add a comment..." />
                <Button className='bg-blue-400 ' disabled={!text.trim()} onClick={sendMessageHandeler} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
