import { NavLink, Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    isActive
      ? 'text-white font-semibold bg-blue-800/40'
      : 'text-white/90 hover:text-white hover:bg-blue-800/30'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl bg-blue-600 backdrop-blur-md rounded-3xl shadow-lg px-6 py-5">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">
            Relung Jiwa
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClass} end>Beranda</NavLink>
          <NavLink to="/tentang" className={navLinkClass}>Tentang</NavLink>
          <NavLink to="/layanan" className={navLinkClass}>Layanan</NavLink>
          <NavLink to="/paket" className={navLinkClass}>Paket</NavLink>
          <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
          <NavLink to="/kontak" className={navLinkClass}>Kontak</NavLink>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6281351780173"
            className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full hover:bg-green-500 text-sm font-medium shadow-md"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp className="text-lg" />
            Konsultasi Gratis 15 Menit
          </a>
        </div>
      </div>
    </header>
  )
}
