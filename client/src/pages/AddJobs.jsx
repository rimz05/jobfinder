import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddJobs = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Banglore')
  const [category, setCategory] = useState('Programming')
  const [level, setLevel] = useState('beginner level')
  const [salary, setSalary] = useState(0)

  const editorRef = useRef(null)
  const quilRef = useRef(null)

  const {backendURL, companyToken} = useContext(AppContext)

const onsubmitHandler = async (e)=>{

  e.preventDefault()
  try{

    const description = quilRef.current.root.innerHTML
    const {data} = await axios.post( backendURL + '/api/company/post-job', {title, description, location, salary, category, level},{headers:{token:companyToken}})

    if(data.sucess){
      toast.success(data.message)

      setTitle('')
      setSalary(0)
      quilRef.current.root.innerHTML = ""
    }else{
      toast.error(data.message)
    }

  }catch(error){

    toast.error(error.message)
  }
}
 
  useEffect(()=>{
    // initiate quill only once
    if(!quilRef.current && editorRef.current){
      quilRef.current = new Quill(editorRef.current,{
        theme:'snow',
      })
    }

  },[])
  return (
    <form onSubmit={onsubmitHandler} className='container p-4 flrx flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
        className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
         type='text' placeholder='Type here' onChange={e =>setTitle(e.target.value)} value={title} required/>
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div className='border border-gray-300' ref={editorRef}>
        </div>
      </div>
      
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='my-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setCategory(e.target.value)}>{JobCategories.map((category,index)=>(
            <option key={index} value={category}>{category}</option>
          ))}
          </select>
        </div>

        <div>
          <p className='my-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLocation(e.target.value)}>{JobLocations.map((location,index)=>(
            <option key={index} value={location}>{location}</option>
          ))}
          </select>
        </div>

        <div>
          <p className='my-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLevel(e.target.value)}>
            <option value="Beginner Level">Begineer Level</option>
            <option value="Beginner Level">Begineer Level</option>
            <option value="Beginner Level">Senior Level</option>
          </select>
        </div>
      </div>
      <div>
        <p className='mb-2'>Job salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' onChange={e=>setSalary(e.target.value)} type='Number' placeholder='2500'/>
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
  ) 
}

export default AddJobs
