'use client'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../Logo.js/Logo'
import SearchForm from '../Form/SearchForm'


const AuthLinks = ({user}) => {
  return (
    <nav className='mx-auto max-w-screen-xl px-4 py-8 flex justify-between items-center gap-6'>
        <Logo />
        <SearchForm /> 
        <div className='flex items-center'>
            {
             !user
             ? 
             <div>
                <button onClick={() => signIn('google')}>
                    LogIn
                </button>
            </div>
            :
            <div className='flex items-center gap-2'>
                <Link 
                className='links adjustment'
                href={'/upload'}>
                    Upload
                </Link>
                <Link href={`/profile/${user?._id}`} className='avatar adjustment'>
                    <Image
                    style={{borderRadius: '50px'}}
                    src={user?.image} alt={user?.name}
                    width={120} height={120} sizes='' />
                  </Link>
                <button 
                className='adjustment cursor-pointer'
                onClick={() => signOut()}>
                    LogOut
                </button>
            </div>
            }
        </div> 
    </nav>
  )
}

export default AuthLinks