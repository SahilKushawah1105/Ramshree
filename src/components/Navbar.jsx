import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, Globe } from 'lucide-react'
import '../styles/components/Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [location])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="top-bar">
                <div className="container flex justify-between">
                    <div className="contact-info flex">
                        <a href="tel:+919727571536" className="flex items-center">
                            <Phone size={14} /> <span>+91 972 757 1536</span>
                        </a>
                        <a href="mailto:info@ramshreeinternational.com" className="flex items-center">
                            <Mail size={14} /> <span>info@ramshreeinternational.com</span>
                        </a>
                    </div>
                    <div className="social-links flex">
                        <a href="#"><Globe size={14} /></a>
                        <a href="#"><Globe size={14} /></a>
                        <a href="#"><Globe size={14} /></a>
                    </div>
                </div>
            </div>

            <div className="main-nav">
                <div className="container flex justify-between items-center">
                    <Link to="/" className="logo">
                        <span className="logo-text">RAMSHREE</span>
                        <span className="logo-sub">INTERNATIONAL</span>
                    </Link>

                    <div className="desktop-links flex items-center">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
                        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                        <Link to="/contact" className="btn btn-primary nav-cta">Get Inquiry</Link>
                    </div>

                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/contact" className="btn btn-primary">Get Inquiry</Link>
            </div>
        </nav>
    )
}

export default Navbar
