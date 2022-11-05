import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function ControlledComponent({children, show}) {
  if(show){
    return (
        <children />
    )
  } else {
   
  }
}
