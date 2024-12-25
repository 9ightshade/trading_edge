import React from 'react'
import logo from "../assets/logo.svg"
import logout from "../assets/logout.png"
export const Sidebar = () => {
    return (
        <div className='bg-[#0D0D0D] py-4 px-4 h-[100vh] relative w-2/12' >
            <div className='logo flex items-center gap-2 '  >
                <img src={logo} alt="logo" />
                <span className='text-white font-bold' >
                    Trading Edge
                </span>
            </div>

            <div className='main flex flex-col gap-2 text-white mt-7' >
                <p>
                    <button className='hover:text-green-400 bg-gray-900 py-2 px-5 rounded-full w-full' >
                        Dashboard
                    </button>
                </p>
                <p>
                    <button className='hover:text-green-400 bg-gray-900 py-2 px-5 rounded-full w-full'>
                        WatchList
                    </button>
                </p>
                <p>
                    <button className='hover:text-green-400 bg-gray-900 py-2 px-5 rounded-full w-full'>
                        Alerts
                    </button>
                </p>
            </div>



            <div className='footer text-white absolute bottom-0 left-0 p-4' >
                <button className='flex gap-2 items-center hover:text-green-400 ' >
                    <img src={logout} alt="logout" />  <span>
                        Log out
                    </span>
                </button>
            </div>
        </div>
    )
}
