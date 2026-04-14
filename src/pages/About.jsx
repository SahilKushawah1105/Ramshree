import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { CheckCircle2, Loader } from 'lucide-react'
import getApiUrl from '../api/config'
import '../styles/pages/About.css'

const About = () => {
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(getApiUrl('/api/settings'))
                const data = await response.json()

                // Parse the JSON strings from settings
                setContent({
                    whoWeAre: JSON.parse(data.about_who_we_are || '{}'),
                    visionMission: JSON.parse(data.about_vision_mission || '{}'),
                    infrastructure: JSON.parse(data.about_infrastructure || '{"cards":[]}')
                })
            } catch (error) {
                console.error('Failed to fetch about content:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [])

    if (loading) return <div className="loader-container section-padding flex-center" style={{ minHeight: '60vh' }}><Loader className="spin" size={48} /></div>

    const { whoWeAre, visionMission, infrastructure } = content

    return (
        <div className="about-page">
            <SEO
                title="About Us"
                description={whoWeAre.desc1 || "Learn more about Ramshree International, a premier merchant exporter of Indian spices."}
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
                            <img src={getApiUrl(whoWeAre.image)} alt="About Ramshree" />
                        </motion.div>

                        <div className="about-content">
                            <span className="section-tag">Who We Are</span>
                            <h2>{whoWeAre.title?.split(' ')[0]} <span>{whoWeAre.title?.split(' ').slice(1).join(' ')}</span></h2>
                            <p>{whoWeAre.desc1}</p>
                            <p>{whoWeAre.desc2}</p>

                            <div className="vision-mission flex">
                                <div className="vm-box">
                                    <h3>{visionMission.vision_title || 'Our Vision'}</h3>
                                    <p>{visionMission.vision_desc}</p>
                                </div>
                                <div className="vm-box">
                                    <h3>{visionMission.mission_title || 'Our Mission'}</h3>
                                    <p>{visionMission.mission_desc}</p>
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
                        <h2>{infrastructure.title?.split(' ')[0]} <span>{infrastructure.title?.split(' ').slice(1).join(' ')}</span></h2>
                        <p>{infrastructure.desc}</p>
                    </div>

                    <div className="infra-grid grid">
                        {(infrastructure.cards || []).map((card, idx) => (
                            <div key={idx} className="infra-card">
                                <h4>{card.title}</h4>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
