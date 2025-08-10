import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Tentang', path: '/tentang' },
  { name: 'Layanan', path: '/layanan' },
  { name: 'Paket', path: '/paket' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Kontak', path: '/kontak' }
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 
     ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full`

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <div className="flex items-center justify-between w-full max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-white">
            Relung Jiwa
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} className={navLinkClass} end>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* WhatsApp Button Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/6281351780173"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp className="text-lg" />
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6 flex flex-col gap-4 md:hidden">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className="text-white/90 hover:text-white text-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href="https://wa.me/6281351780173"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-medium shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="text-lg" />
              Konsultasi Gratis
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
