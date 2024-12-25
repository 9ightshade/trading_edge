import React from 'react'
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

const Home = () => {
    return (
        <div className='flex bg-black' >
            <Sidebar />
            <div className='w-full' >
                <Navbar />
            </div>
        </div>
    )
}

export default Home;