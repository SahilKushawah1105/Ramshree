import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react'
import '../styles/components/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <Link to="/" className="logo">
                            <span className="logo-text">RAMSHREE</span>
                            <span className="logo-sub">INTERNATIONAL</span>
                        </Link>
                        <p className="brand-desc">
                            Leading merchant exporter of premium Indian spices. Dedicated to quality, authenticity, and global excellence since inception.
                        </p>
                        <div className="footer-social">
                            <a href="#"><Globe size={20} /></a>
                            <a href="#"><Globe size={20} /></a>
                            <a href="#"><Globe size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/"><ArrowRight size={14} /> Home</Link></li>
                            <li><Link to="/about"><ArrowRight size={14} /> About Us</Link></li>
                            <li><Link to="/products"><ArrowRight size={14} /> Our Products</Link></li>
                            <li><Link to="/contact"><ArrowRight size={14} /> Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Our Products</h3>
                        <ul>
                            <li><Link to="/products"><ArrowRight size={14} /> Turmeric Powder</Link></li>
                            <li><Link to="/products"><ArrowRight size={14} /> Red Chili Powder</Link></li>
                            <li><Link to="/products"><ArrowRight size={14} /> Cumin Seeds</Link></li>
                            <li><Link to="/products"><ArrowRight size={14} /> Coriander Powder</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col contact-col">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <MapPin size={24} className="icon" />
                            <p>A-13, Saidham Tenament, Nr. Kameshwar Park, Vastral Road, Ahmedabad - 382418</p>
                        </div>
                        <div className="contact-item">
                            <Phone size={20} className="icon" />
                            <p>+91 972 757 1536</p>
                        </div>
                        <div className="contact-item">
                            <Mail size={20} className="icon" />
                            <p>info@ramshreeinternational.com</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Ramshree International. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
