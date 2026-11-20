"use client";

import React from 'react'
import Feed from '../components/Feed'
import RightSideBar from '../components/RightSideBar'
import useGetAllPost from './hooks/useGetAllPost'
import userGetSuggestedUsers from './hooks/userGetSuggested';

const Page = () => {
  useGetAllPost();
  userGetSuggestedUsers();

  return (
    <div className="flex mx-auto w-full max-w-8xl">
      <div className="flex flex-1 justify-center">
        <Feed />
      </div>

      <div className="w-80 shrink-0">
        <RightSideBar />
      </div>
    </div>
  )
}

export default Page
