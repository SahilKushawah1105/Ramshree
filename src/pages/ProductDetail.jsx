import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import { products } from '../data/products'
import SEO from '../components/SEO'
import '../styles/pages/ProductDetail.css'

const ProductDetail = () => {
    const { id } = useParams()
    const product = products.find(p => p.id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!product) {
        return (
            <div className="container section-padding text-center">
                <h2>Product not found</h2>
                <Link to="/products" className="btn btn-primary">Back to Products</Link>
            </div>
        )
    }

    return (
        <div className="product-detail-page">
            <SEO
                title={product.name}
                description={product.shortDesc}
                keywords={`${product.name}, Indian Spice Export, ${product.category}, HS Code ${product.specs['HS Code']}`}
            />

            <section className="detail-header">
                <div className="container">
                    <Link to="/products" className="back-link">
                        <ArrowLeft size={18} /> Back to Products
                    </Link>
                    <div className="detail-grid grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="product-main-image"
                        >
                            <img src={product.image} alt={product.name} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="product-main-info"
                        >
                            <span className="category-tag">{product.category}</span>
                            <h1>{product.name}</h1>
                            <p className="large-desc">{product.description}</p>

                            <div className="packaging-info">
                                <h3>Packaging Options</h3>
                                <div className="pack-tags">
                                    {product.packaging.map((pack, idx) => (
                                        <span key={idx} className="pack-tag"><CheckCircle2 size={14} /> {pack}</span>
                                    ))}
                                </div>
                            </div>

                            <Link to="/contact" className="btn btn-secondary contact-btn">
                                Request a Quote <Send size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="specifications section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Technical <span>Specifications</span></h2>
                        <p>Guaranteed quality parameters for international trade.</p>
                    </div>

                    <div className="specs-container">
                        <table className="specs-table">
                            <thead>
                                <tr>
                                    <th>Parameters</th>
                                    <th>Value / Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(product.specs).map(([param, value], idx) => (
                                    <tr key={idx}>
                                        <td className="param-name">{param}</td>
                                        <td className="param-value">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail
