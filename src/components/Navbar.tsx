import React from 'react'
import searchicon from '../assets/search-normal.svg'

export const Navbar = () => {
    return (
        <div className='flex items-center gap-5 p-3 justify-end' >
            <div className='flex items-center gap-3 bg-gray-900 p-3 rounded-full' >
                <div className='w-[20px]' >
                <img src={searchicon} alt="search" className='w-full  ' />
                </div>
                <input type="text" name="search" id="search" placeholder='Search your Coin' className='bg-transparent outline-none text-white' />
            </div>


          
        </div>
    )
}
