import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/components/ProductCard.css'

const ProductCard = ({ id, name, image, description }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="product-card"
        >
            <div className="product-image">
                <img src={image} alt={name} />
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p>{description}</p>
                <Link to={`/products/${id}`} className="product-link">
                    Explore Specifications <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    )
}

export default ProductCard
