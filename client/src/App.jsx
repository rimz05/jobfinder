import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJobs from './pages/ApplyJobs'
import Application from './pages/Application'
import Dashboard from './pages/Dashboard'
import ManagerJob from './pages/ManagerJob'
import AddJobs from './pages/AddJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'
const App = () => {
  return (
    <div >
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/apply-job/:id' element={<ApplyJobs/>}/>
      <Route path='/applications' element={<Application/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='add-job' element={<AddJobs/>}/>
        <Route path='manage-jobs' element={<ManagerJob/>}/>
        <Route path='view-applications' element={<ViewApplication/>}/>
      </Route>
      </Routes>
    </div>
  )
}

export default App
