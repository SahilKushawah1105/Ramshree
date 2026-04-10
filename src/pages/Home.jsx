import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Globe, Shield, Zap, ArrowRight, Package, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Certifications from '../components/Certifications'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import SEO from '../components/SEO'
import '../styles/pages/Home.css'

const Counter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            let start = 0
            const end = parseInt(value.substring(0, value.replace(/[^0-9]/g, '').length))
            if (start === end) return

            let totalMilisecDur = duration * 1000
            let incrementTime = (totalMilisecDur / end)

            let timer = setInterval(() => {
                start += 1
                setCount(start)
                if (start === end) clearInterval(timer)
            }, incrementTime)

            return () => clearInterval(timer)
        }
    }, [isInView, value, duration])

    return <span ref={countRef}>{count}{value.replace(/[0-9]/g, '')}</span>
}

const Home = () => {
    const featuredProducts = products.slice(0, 3)

    const advantages = [
        {
            icon: <Shield size={24} />,
            title: 'Quality Assurance',
            desc: 'Strict quality control measures from sourcing to shipment.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Global Export',
            desc: 'Serving international markets with seamless logistics.'
        },
        {
            icon: <CheckCircle size={24} />,
            title: 'Certified Origin',
            desc: 'Authentic Indian spices sourced directly from farms.'
        },
        {
            icon: <Zap size={24} />,
            title: 'Timely Delivery',
            desc: 'Fast and reliable shipping to minimize wait times.'
        }
    ]

    return (
        <div className="home-page">
            <SEO
                title="Leading Indian Spices Exporter"
                description="Ramshree International exports premium Turmeric, Red Chili, and Cumin seeds. High curcumin, stemless chili, and bold cumin seeds for international markets."
                keywords="Spice Exporter, Indian Turmeric Wholesale, Red Chili Export, Cumin Seeds India"
            />

            <Hero />

            <section className="featured-products section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">Our Collection</span>
                        <h2>Featured <span>Spices</span></h2>
                        <p>Explore our selection of premium quality Indian spices.</p>
                    </div>
                    <div className="product-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                description={product.shortDesc}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-50">
                        <Link to="/products" className="btn btn-primary">View All Products <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            <Certifications />

            <section className="advantage-section section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">The Ramshree Advantage</span>
                        <h2>Why Partners <span>Choose Us</span></h2>
                        <p>We are committed to excellence in every aspect of our business, ensuring that our partners receive only the best Indian spices.</p>
                    </div>

                    <div className="features-grid">
                        {advantages.map((item, idx) => (
                            <div key={idx} className="feature-card">
                                <div className="icon-box">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="stats-section mt-50">
                        <div className="stats-container flex">
                            <div className="stat-card">
                                <div className="stat-icon"><Globe size={32} /></div>
                                <h3><Counter value="15+" /></h3>
                                <p>Countries Served Worldwide</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><Package size={32} /></div>
                                <h3><Counter value="50+" /></h3>
                                <p>Premium Spice Products</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><ShieldCheck size={32} /></div>
                                <h3><Counter value="100%" /></h3>
                                <p>Strict Quality Testing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-banner section-padding">
                <div className="container">
                    <div className="cta-content-box">
                        <span className="cta-tag">Experience The Best</span>
                        <h2>Ready to Experience Authentic Indian Flavors?</h2>
                        <p>Join our network of global partners and bring the finest Indian spices to your market. Quality, purity, and trust—delivered worldwide.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">Get A Custom Quote Now</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
