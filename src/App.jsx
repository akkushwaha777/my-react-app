import { useState } from 'react'
import Header from './componets/Header'
import Navbar from './componets/navbar'
import StudentList from './componets/student'
import Footer from './componets/Footer'
import './index.css'
import Image from './componets/image'
function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <Header />
      <Navbar />
      <Image />
      <StudentList />
      <Footer />
    </div>
  )
}

export default App

