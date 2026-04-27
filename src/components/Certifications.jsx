import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import getApiUrl from '../api/config'
import '../styles/components/Certifications.css'

const Certifications = () => {
    const [certs, setCerts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const response = await fetch(getApiUrl('/api/certifications'))
                const data = await response.json()
                if (Array.isArray(data)) {
                    setCerts(data)
                } else {
                    console.error('Expected an array for certifications, got:', data)
                }
            } catch (error) {
                console.error('Error fetching certifications:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCerts()
    }, [])

    if (loading) return null;

    return (
        <section className="certifications section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Trust & Standards</span>
                    <h2>Our <span>Certifications</span></h2>
                    <p>We adhere to the highest international quality and safety standards.</p>
                </div>

                <div className="cert-grid">
                    {certs.map((cert, idx) => (
                        <motion.div
                            key={cert.id || idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="cert-card"
                        >
                            <div className="icon-wrapper">
                                {cert.icon ? (
                                    <img 
                                        src={cert.icon.startsWith('http') ? cert.icon : getApiUrl(cert.icon)} 
                                        alt={cert.title} 
                                        className="cert-icon-img" 
                                    />
                                ) : (
                                    <div className="cert-icon-placeholder" />
                                )}
                            </div>
                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p>{cert.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications
