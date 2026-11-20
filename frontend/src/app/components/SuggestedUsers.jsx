"use client";

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';

const SuggestedUsers = () => {

    const { suggestedUsers } = useSelector (store => store.auth);

    return (
        <div>
            <div className="my-10">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-gray-600">
                        Suggestions for you
                    </h1>
                    <span className="font-medium cursor-pointer">
                        See All
                    </span>
                </div>
            </div>

            {
                suggestedUsers.map((user) => (
                    <div key={user._id} className="w-full p-4">
                        <div className="flex items-center gap-3">
                            <Link href={`/profile/${user?._id}`}>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user?.profilePicture} alt="profile picture" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>

                            <div className="min-w-0 flex-1">
                                <h1 className="font-semibold text-sm">
                                    <Link href={`/profile/${user?._id}`}>{user?.username}</Link>
                                </h1>

                                <span className="text-sm text-gray-500">{user?.bio || 'Bio here...'} </span>
                            </div>

                            <button className="text-blue-500 text-sm font-semibold">Follow </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SuggestedUsers;
