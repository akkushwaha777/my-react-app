import React from 'react'
import Navbar from './componets/navbar'
import Header from './componets/Header'
import Footer from './componets/Footer'
import Image from './componets/image'
import Student from './componets/student'

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="container text-center my-5">
        <h1>Namaste</h1>
        <Image />
      </div>
      <Student />
      <Footer />
    </>
  )
}

