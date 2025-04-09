import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'


export default function PrivateRoute() {
  let {currentUser} = useSelector(state=>state.user)  
  return currentUser?<Outlet />:<Navigate to='/sign-in' />
}
