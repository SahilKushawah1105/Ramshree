import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Globe } from 'lucide-react'
import { products } from '../data/products'
import SEO from '../components/SEO'
import '../styles/pages/Contact.css'

const Contact = () => {
    return (
        <div className="contact-page">
            <SEO
                title="Contact Us & Get Inquiry"
                description="Get a custom quote for bulk spice export. Contact Ramshree International for premium turmeric, chili, and cumin exports."
            />

            <section className="page-header">
                <div className="container">
                    <h1>Contact <span>Us</span></h1>
                    <p>Have a question or need a custom quote? Reach out to our trade experts.</p>
                </div>
            </section>

            <section className="contact-main section-padding">
                <div className="container">
                    <div className="contact-grid grid">
                        <div className="contact-info-panel">
                            <div className="info-card">
                                <span className="section-tag">Get in Touch</span>
                                <h2>Trade <span>Inquiries</span></h2>
                                <p>We typically respond to all business inquiries within 24 working hours.</p>

                                <div className="info-items">
                                    <div className="info-item flex">
                                        <div className="icon-box"><Phone size={24} /></div>
                                        <div>
                                            <h4>Call Us</h4>
                                            <p>+91-9727571536</p>
                                        </div>
                                    </div>
                                    <div className="info-item flex">
                                        <div className="icon-box"><Mail size={24} /></div>
                                        <div>
                                            <h4>Email Us</h4>
                                            <p>ramshreeinter@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="info-item flex">
                                        <div className="icon-box"><MapPin size={24} /></div>
                                        <div>
                                            <h4>Visit Us</h4>
                                            <p>A-13, Saidham Tenament, Nr. Kameshwar Park, Mahadev Nagar Tekra, Vastral Road, Ahmedabad - 382418</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-panel">
                            <form className="inquiry-form">
                                <div className="form-grid grid">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>
                                <div className="form-grid grid">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" placeholder="+1 234 567 890" />
                                    </div>
                                    <div className="form-group">
                                        <label>Interested Product</label>
                                        <select required>
                                            <option value="">Select a Product</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                            <option value="other">Other / Multiple</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Message / Requirements</label>
                                    <textarea placeholder="Tell us about your requirements (Quantity, Destination, etc.)" rows="5" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary submit-btn">
                                    Send Inquiry <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section">
                <iframe
                    title="Ramshree International Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.486259648!2d72.645069!3d23.003926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e866879e6f2b7%3A0xe5a3c0cb9f323f4c!2sVastral%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    )
}

export default Contact
