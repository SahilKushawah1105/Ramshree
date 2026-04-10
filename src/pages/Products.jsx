import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import SEO from '../components/SEO'
import '../styles/pages/Products.css'

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

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
