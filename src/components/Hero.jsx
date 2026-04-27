import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import getApiUrl from '../api/config'
import heroBg from '../assets/hero-bg.png'
import '../styles/components/Hero.css'

const Hero = () => {
    const [catalogUrl, setCatalogUrl] = useState('')
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(getApiUrl('/api/settings'))
                const data = await response.json()
                if (data.catalog_url) {
                    setCatalogUrl(data.catalog_url)
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            }
        }
        fetchSettings()
    }, [])

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={ref} className="hero">
            <div className="hero-overlay"></div>
            <motion.img
                style={{ y }}
                src={heroBg}
                alt="Spices Background"
                className="hero-bg"
            />

            <div className="container hero-content">
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-text"
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hero-tagline"
                    >
                        Authentic Indian Heritage
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        Exporters of Premium <br /><span>Indian Spices</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Delivering the rich essence of Indian flavors to the global market with
                        unmatched quality, purity, and excellence in every shipment.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="hero-btns"
                    >
                        <Link to="/products" className="btn btn-primary">Our Products <ArrowRight size={18} /></Link>
                        <Link to="/contact" className="btn btn-outline">Send Inquiry</Link>
                        {catalogUrl && (
                            <a
                                href={getApiUrl(catalogUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-catalog flex-center gap-10"
                            >
                                <FileText size={18} /> Download catalogue
                            </a>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
