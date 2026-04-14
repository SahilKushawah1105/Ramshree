import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import getApiUrl from '../api/config'
import '../styles/components/ProductCard.css'

const ProductCard = ({ id, name, image, description, categories }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="product-card"
        >
            <div className="product-image">
                {image ? (
                    <img src={getApiUrl(image)} alt={name} loading="lazy" />
                ) : (
                    <div className="no-image flex-center">
                        <Package size={48} color="#cbd5e1" />
                    </div>
                )}
            </div>
            <div className="product-content">
                <div className="flex flex-wrap gap-5 mb-10">
                    {(categories || []).map((cat, i) => (
                        <span key={i} className="card-badge">{cat}</span>
                    ))}
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <Link to={`/products/${id}`} className="view-more">
                    Explore Details <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    )
}

export default ProductCard
