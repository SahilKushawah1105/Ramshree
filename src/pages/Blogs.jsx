import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import getApiUrl from '../api/config'
import '../styles/pages/Blogs.css'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(getApiUrl('/api/blogs'))
                const data = await response.json()
                setBlogs(data)
            } catch (error) {
                console.error('Failed to fetch blogs:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    if (loading) {
        return (
            <div className="loader-container section-padding flex-center">
                <Loader className="spin" size={48} />
            </div>
        )
    }

    return (
        <div className="blogs-page">
            <section className="page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Our <span>Blogs</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Stay updated with the latest news, recipes, and insights from the world of spices.
                    </motion.p>
                </div>
            </section>

            <section className="blogs-grid-section section-padding">
                <div className="container">
                    {blogs.length > 0 ? (
                        <div className="blogs-grid">
                            {blogs.map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    className="blog-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="blog-image">
                                        <img src={blog.image ? getApiUrl(blog.image) : '/assets/images/placeholder.jpg'} alt={blog.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span><User size={14} /> {blog.author || 'Ramshree'}</span>
                                        </div>
                                        <h3>{blog.title}</h3>
                                        <p>{blog.excerpt || blog.content.substring(0, 150) + '...'}</p>
                                        <Link to={`/blogs/${blog.id}`} className="read-more">
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-blogs">
                            <h3>No blogs found</h3>
                            <p>We're currently writing some interesting stories. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Blogs
