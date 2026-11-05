"use client";

import React from 'react'
import Feed from '../components/Feed'
import Outlet from '../components/Outlet'
import RightSideBar from '../components/RightSideBar'
import useGetAllPost from './hooks/useGetAllPost'

const page = () => {
  useGetAllPost();
  return (
    <div className='flex mx-auto'>
      <div className='flex '>
        <Feed/>
        <Outlet/>
      </div>
      <RightSideBar/>
    </div>
  )
}

export default page
