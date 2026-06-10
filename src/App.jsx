import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <BrowserRouter>
      <CustomCursor />
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      {isLoaded && <AppContent />}
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered the new content
      setTimeout(() => {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }

    gsap.fromTo('#page-content, main', 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: 'power2.out',
        clearProps: 'transform' // <-- This removes the transform wrapper after 0.5s
      }
    )
  }, [location.pathname, location.hash])

  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
