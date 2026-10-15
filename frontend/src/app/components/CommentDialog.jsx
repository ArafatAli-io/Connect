"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='min-w-[50vw]  p-0 flex flex-col'>
        <div className="flex flex-1">
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
                <Link href='/'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href='/' className="font-semibold text-lg">username</Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center text-lg text-center'>
                  <div className="cursor-pointer w-full text-red-500 font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">
                    Add to favorites
                  </div>
                </DialogContent>

              </Dialog>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;

