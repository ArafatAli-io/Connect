"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const handleDialogChange = (value) => {
    setOpen(value);
    if (!value) {
      setText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="min-w-[50vw] p-0 flex flex-col">
        <div className="flex flex-1">
          {/* Left Side: Media Display */}
          <div className="w-1/2 min-w-[20vw] min-h-[60vh]">
            <img
              src="/cat.jpg"
              alt="Picture of a cat"
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          <div className="w-1/2 min-w-[20vw] min-h-[60vh] flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link href="/">
                  <Avatar>
                    <AvatarImage src="https://github.com" alt="logo" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href="/" className="font-semibold text-lg">
                    username
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
            <hr/>
            <div className="flex-1 overflow-y-auto max-h-96 p-3">
              comment by the other users
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <Input type="text" placeholder="Add a comment..."/>
                <Button variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
