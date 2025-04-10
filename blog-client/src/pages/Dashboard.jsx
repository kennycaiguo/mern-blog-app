import React, { useState,useEffect } from 'react'
import { useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export default function DashBoard() {
  let location = useLocation()
  let [tab,setTab] = useState('')
  useEffect(()=>{
    let urlParams =new URLSearchParams(location.search)
    let tabFromUrl = urlParams.get('tab')
    // console.log(tabFromUrl);
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* side bar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile /> }
      
    </div>
  )
}
