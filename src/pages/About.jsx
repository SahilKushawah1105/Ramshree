import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import aboutImg from '../assets/office.png'
import '../styles/pages/About.css'

const About = () => {
    return (
        <div className="about-page">
            <SEO
                title="About Us"
                description="Learn more about Ramshree International, a premier merchant exporter of Indian spices based in Ahmedabad, Gujarat."
            />

            <section className="page-header">
                <div className="container">
                    <h1>Our <span>Legacy</span></h1>
                    <p>Commitment to quality, authenticity, and global excellence since inception.</p>
                </div>
            </section>

            <section className="about-intro section-padding">
                <div className="container">
                    <div className="about-grid grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-image"
                        >
                            <img src={aboutImg} alt="About Ramshree" />
                        </motion.div>

                        <div className="about-content">
                            <span className="section-tag">Who We Are</span>
                            <h2>Ramshree <span>International</span></h2>
                            <p>
                                Ramshree International is a premier merchant exporter of high-quality Indian spices,
                                based in the heart of the global spice trade—Ahmedabad, India.
                                Our journey began with a simple vision: to bring the authentic flavors of Indian
                                heritage to every kitchen worldwide.
                            </p>
                            <p>
                                We specialize in sourcing, processing, and exporting a wide range of spices,
                                including Turmeric, Red Chili, Cumin, and Oil Seeds. Every product we export
                                undergoes rigorous quality testing to ensure it meets international food safety standards.
                            </p>

                            <div className="vision-mission flex">
                                <div className="vm-box">
                                    <h3>Our Vision</h3>
                                    <p>To be the globally recognized leader in the spice export industry, known for purity and trust.</p>
                                </div>
                                <div className="vm-box">
                                    <h3>Our Mission</h3>
                                    <p>To provide high-quality agricultural products that enrich the lives of consumers worldwide.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="infrastructure section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">Our Setup</span>
                        <h2>Modern <span>Infrastructure</span></h2>
                        <p>Strategically located facilities for efficient processing and global distribution.</p>
                    </div>

                    <div className="infra-grid grid">
                        <div className="infra-card">
                            <h4>Advanced Processing</h4>
                            <p>Our processing units are equipped with modern machinery for cleaning, sorting, and grinding spices while maintaining their volatile oils.</p>
                        </div>
                        <div className="infra-card">
                            <h4>Quality Lab</h4>
                            <p>Dedicated quality control laboratories to test moisture content, purity levels, and microbial parameters before every shipment.</p>
                        </div>
                        <div className="infra-card">
                            <h4>Strategic Locations</h4>
                            <p>Proximity to major ports like Mundra and Kandla ensures cost-effective and timely shipping for our global partners.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
