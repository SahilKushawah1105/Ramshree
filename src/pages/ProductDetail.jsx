import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import getApiUrl from '../api/config'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2, Loader } from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/pages/ProductDetail.css'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchProduct = async () => {
            try {
                const response = await fetch(getApiUrl(`/api/products/${id}`))
                const data = await response.json()
                setProduct(data)
            } catch (error) {
                console.error('Failed to fetch product:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="container section-padding text-center flex-center" style={{ minHeight: '60vh' }}>
                <Loader className="spin" size={48} />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container section-padding text-center">
                <h2>Product not found</h2>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Products</Link>
            </div>
        )
    }

    return (
        <div className="product-detail-page">
            <SEO
                title={product.name}
                description={product.shortDesc || product.description}
                keywords={`${product.name}, Indian Spice Export, ${(product.categories || []).join(', ')}`}
            />

            <section className="detail-header">
                <div className="container">
                    <Link to="/products" className="back-link">
                        <ArrowLeft size={18} /> Back to Products
                    </Link>
                    <div className="detail-grid">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="product-main-image"
                        >
                            <img src={getApiUrl(product.image)} alt={product.name} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="product-main-info"
                        >
                            <div className="flex flex-wrap gap-10 mb-15">
                                {(product.categories || []).map((cat, i) => (
                                    <span key={i} className="category-tag">{cat}</span>
                                ))}
                            </div>
                            <h1>{product.name}</h1>
                            <p className="large-desc">{product.description}</p>

                            {product.packaging && product.packaging.length > 0 && (
                                <div className="packaging-info">
                                    <h3>Packaging Options</h3>
                                    <div className="pack-tags">
                                        {product.packaging.map((pack, idx) => (
                                            <span key={idx} className="pack-tag"><CheckCircle2 size={18} color="#10b981" /> {pack}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link to="/contact" className="btn btn-secondary contact-btn btn-lg">
                                Request a Quote <Send size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {product.specs && Object.keys(product.specs).length > 0 && (
                <section className="specifications section-padding">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2>Technical <span>Specifications</span></h2>
                            <p>Guaranteed quality parameters for international trade.</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="specs-container"
                        >
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
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default ProductDetail
