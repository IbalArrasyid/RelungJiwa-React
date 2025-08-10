import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Packages from './pages/Packages'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import PagesIndex from './pages/PagesIndex'
import StaticPage from './pages/StaticPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tentang', element: <About /> },
      { path: 'layanan', element: <Services /> },
      { path: 'paket', element: <Packages /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'kontak', element: <Contact /> },
      { path: 'pages', element: <PagesIndex /> },
      { path: 'pages/:slug', element: <StaticPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


