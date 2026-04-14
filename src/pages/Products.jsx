import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import getApiUrl from '../api/config'
import { Search, Filter, ArrowRight, Loader } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import '../styles/pages/Products.css'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(getApiUrl('/api/products'))
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const categories = ['All', ...new Set(products.flatMap(p => p.categories || []))]

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => (p.categories || []).includes(activeCategory))

    return (
        <div className="products-page">
            <SEO
                title="Our Products"
                description="High quality Indian Spices including Turmeric, Red Chili, Cumin, and more for global export."
                keywords="Spices Export, Turmeric, Chili, Cumin, Indian Spices Wholesale"
            />

            <section className="page-header">
                <div className="container">
                    <h1>Premium <span>Collection</span></h1>
                    <p>Exporter of the finest quality Indian spices and agricultural commodities.</p>
                </div>
            </section>

            <section className="products-list section-padding">
                <div className="container">
                    <div className="category-filter">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="product-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        image={product.image}
                                        description={product.shortDesc}
                                        categories={product.categories}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products
