import React, { useState, useEffect } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import '../styles/components/FloatingWidgets.css'

const FloatingWidgets = () => {
    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const openWhatsApp = () => {
        window.open('https://wa.me/919727571536?text=Hi, I am interested in your spice products.', '_blank')
    }

    return (
        <div className="floating-widgets">
            <button
                className={`widget-btn scroll-btn ${showScroll ? 'visible' : ''}`}
                onClick={scrollTop}
                aria-label="Back to Top"
            >
                <ArrowUp size={24} />
            </button>

            <button
                className="widget-btn whatsapp-btn"
                onClick={openWhatsApp}
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle size={28} />
                <span className="tooltip">Chat with us</span>
            </button>
        </div>
    )
}

export default FloatingWidgets
