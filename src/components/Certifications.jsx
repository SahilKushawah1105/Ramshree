import React from 'react'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react'
import '../styles/components/Certifications.css'

const Certifications = () => {
    const certs = [
        { icon: <Award className="cert-icon" />, title: 'FSSAI Certified', desc: 'Food Safety and Standards Authority of India' },
        { icon: <ShieldCheck className="cert-icon" />, title: 'APEDA Member', desc: 'Agricultural & Processed Food Products Export Development Authority' },
        { icon: <CheckCircle2 className="cert-icon" />, title: 'ISO 9001:2015', desc: 'International Quality Management Standard' },
        { icon: <FileCheck className="cert-icon" />, title: 'Import Export Code', desc: 'Registered with Directorate General of Foreign Trade' }
    ]

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
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="cert-card"
                        >
                            <div className="icon-wrapper">
                                {cert.icon}
                            </div>
                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p>{cert.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications
