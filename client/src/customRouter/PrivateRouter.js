import React from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'

const PrivateRouter = ({ component: Component, ...rest }) => {
  const firstLogin = localStorage.getItem('firstLogin')
  return firstLogin ? <Routes> <Route {...rest} element={<Component />} /></Routes> : <Navigate to="/" />
}

export default PrivateRouter

