import React from 'react'
import Navbar from './componets/navbar'
import Header from './Header'
import Footer from './Footer'
import Image from './componets/image'

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="container text-center my-5">
        <h1>Namaste</h1>
        <Image />
      </div>
      <Footer />
    </>
  )
}

