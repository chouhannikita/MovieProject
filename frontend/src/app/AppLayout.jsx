'use client'
import React from 'react'
import Header from './header/Header'
import ThemeRegistry from '@/theme/ThemeRegistry'

const AppLayout = ({children}) => {
  return (
   <ThemeRegistry>
     {/* <Header/> */}
     {children}
   </ThemeRegistry>
  )
}

export default AppLayout