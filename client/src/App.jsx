import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import AnalyzePage from './Pages/AnalyzePage'
import SignInPage from './Pages/SingInPage'
import SingUpPage from './Pages/singUpPage'

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-[#f8fbff] font-['Inter',sans-serif] text-slate-900">
        <Routes>
          <Route path="/" element={<HeroSection/>} />
          <Route path="/analyze-content" element={<AnalyzePage />} />
         <Route path='/singup' element={<SingUpPage /> } />
         <Route path='/singin' element={<SignInPage /> } />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App


