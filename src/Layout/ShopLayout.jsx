import React from 'react'

import Footer from './Footer'
import Navbar from './Navbar'

const ShopLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default ShopLayout
