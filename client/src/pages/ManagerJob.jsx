import React, { useContext, useEffect, useState } from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManagerJob = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([])

  const {backendUrl, companyToken} = useContext(AppContext)

  // fetch company job app data
  const fetchCompanyJobs = async ()=>{

    try {
      const {data} = await axios.get(backendUrl + '/api/company/list-jobs', {headers:{token:companyToken}})

      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // func to chage job visibility 
  const changeJobVisibility = async (id)=>{

    try {

      const {data} = await axios.post(backendUrl + 'api/company/change-visibilty',
        { id },
        { header:{token: companyToken} }
    )

    if(data.success){
      toast.success(data.message)
      fetchCompanyJobs()
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs()
    }
  }, [companyToken])

  return (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Application</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='text-gray-700 '>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('l1')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input onChange={()=> changeJobVisibility(job._id)} className='scale' type='checkbox' checked={job.visible}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button
        onClick={()=>navigate('/dashboard/add-job')}
         className='bg-black tex text-white px-4 py-2 rounded'>Add new Job</button>
      </div>
    </div>
  );
};

export default ManagerJob;
