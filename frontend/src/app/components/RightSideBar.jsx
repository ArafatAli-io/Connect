
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import SuggestedUsers from './SuggestedUsers';

const RightSideBar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${user?._id}`}>
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user?.profilePicture}
              alt="profile picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0">
          <h1 className="font-semibold text-sm">
            <Link href={`/profile/${user?._id}`}>
              {user?.username}
            </Link>
          </h1>

          <span className="text-sm text-gray-500">
            {user?.bio || 'Bio here...'}
          </span>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  );
};

export default RightSideBar;
