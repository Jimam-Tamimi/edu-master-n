import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function ControlledRoutes({children, show, navigateTo}) {
  if(show){
    return (
      <Routes>
        {children}
      </Routes>
    )
  } else {
   
  }
}
