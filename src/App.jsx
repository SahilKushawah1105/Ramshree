import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingWidgets from './components/FloatingWidgets'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminSettings from './pages/admin/Settings'
import AdminBlogs from './pages/admin/Blogs'
import AdminCertifications from './pages/admin/Certifications'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/App.css'

function App() {
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin';

  return (
    <div className="app">
      <ScrollToTop />
      {!isAdminLogin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          } />

          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } />

          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          } />

          <Route path="/admin/certifications" element={
            <ProtectedRoute>
              <AdminCertifications />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <FloatingWidgets />
      <Chatbot />
      {!isAdminLogin && <Footer />}
    </div>
  )
}

export default App
