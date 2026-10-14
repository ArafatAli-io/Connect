"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <img
          src="/cat.jpg"
          alt="Picture of a cat"
          className="w-full rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;

