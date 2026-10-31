import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StructuredData from './components/StructuredData'

export default function App() {
  return <div className="min-h-screen bg-surface text-espresso"><StructuredData /><Navbar /><main><Outlet /></main><Footer /></div>
}
