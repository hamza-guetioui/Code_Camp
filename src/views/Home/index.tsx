"use client"
import { useAuth } from '@/context/authContext';
import React from 'react'


const Index = () => {
    const {isAuth , user} = useAuth();
    console.log(user , isAuth);
  return (
    <div>Index</div>
  )
}

export default Index