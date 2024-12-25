import React from 'react'
import profile from "../assets/download.jpeg"
export const Profile = () => {
    return (
        <div className='flex items-center gap-3 text-white' >
            <div className='w-3/12 ' >
            <img src={profile} alt="user profile" className='w-full rounded-full object-cover' />
            </div>
            <span>
                Alex
            </span>
        </div>
    )
}
