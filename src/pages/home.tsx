import React from 'react'
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import Dashboard from '@/components/Dashboard';

const Home = () => {
    return (
        <div className='flex bg-black' >
            {/* <Sidebar />
            <div className='w-full' >
                <Navbar />
            </div> */}

            <Dashboard />
        </div>
    )
}

export default Home;