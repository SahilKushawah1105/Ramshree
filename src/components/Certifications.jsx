import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import getApiUrl from '../api/config'
import '../styles/components/Certifications.css'

const Certifications = () => {
    const [certs, setCerts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCert, setSelectedCert] = useState(null)

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
                            onClick={() => setSelectedCert(cert)}
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

            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        className="cert-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            className="cert-modal-content"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>
                                <X size={24} />
                            </button>
                            <div className="cert-modal-body">
                                <div className="cert-modal-image">
                                    <img 
                                        src={selectedCert.icon.startsWith('http') ? selectedCert.icon : getApiUrl(selectedCert.icon)} 
                                        alt={selectedCert.title} 
                                    />
                                </div>
                                <div className="cert-modal-info">
                                    <span className="section-tag">Certification</span>
                                    <h2>{selectedCert.title}</h2>
                                    <p>{selectedCert.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Certifications
