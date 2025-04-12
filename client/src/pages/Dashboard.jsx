import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'


const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen'>
        {/* navbar recuiter panner */}
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between items-center'>
            <img onClick={e =>navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo}/>
            <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Welcome, GreatStack</p>
            <div className='relative group'>
              <img src ={ assets.company_icon}/>
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm'>
                  <li className='py-1 px-3 pr-10 cursor-pointer'>Logout</li>
                </ul>
              </div>
            </div>
            </div>    
        </div>
      </div>

      <div className='flex items-start'>
        {/* left sidebar with option to add job, manage job, view job */}
        <div className='inline-block min-h-screen border-r-1 border-gray-400 sm:w-1/6'>
        <ul className='flex flex-col items-start pt-5 text-gray-800'>
          <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 w-full hover:bg-gray-100 gap-2 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
          <img className='min-w-4' src={assets.add_icon} alt=''/>
          <p className='max-sm:hidden'>Add Job</p>
          </NavLink>

          <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 w-full hover:bg-gray-100 gap-2 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
          <img className='min-w-4' src={assets.home_icon} alt=''/>
          <p className='max-sm:hidden'>Manage Jobs</p>
          </NavLink>

          <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 w-full hover:bg-gray-100 gap-2 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
          <img className='min-w-4' src={assets.person_tick_icon} alt=''/>
          <p className='max-sm:hidden'>View Applictaion</p>
          </NavLink>
        </ul>
        </div>
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
