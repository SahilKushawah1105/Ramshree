import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ChevronLeft, Loader, Share2 } from 'lucide-react'
import getApiUrl from '../api/config'
import '../styles/pages/Blogs.css'

const BlogDetail = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(getApiUrl(`/api/blogs/${id}`))
                const data = await response.json()
                setBlog(data)
            } catch (error) {
                console.error('Failed to fetch blog:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
        window.scrollTo(0, 0)
    }, [id])

    if (loading) {
        return (
            <div className="loader-container section-padding flex-center">
                <Loader className="spin" size={48} />
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="container section-padding text-center">
                <h2>Blog not found</h2>
                <Link to="/blogs" className="btn btn-primary mt-20">Back to Blogs</Link>
            </div>
        )
    }

    return (
        <div className="blog-detail-page">
            <div className="container">
                <Link to="/blogs" className="back-link">
                    <ChevronLeft size={20} /> Back to Blogs
                </Link>

                <motion.article
                    className="blog-article"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <header className="article-header text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {blog.title}
                        </motion.h1>
                        <div className="article-meta justify-center">
                            <span><Calendar size={18} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span><User size={18} /> {blog.author || 'Ramshree'}</span>
                        </div>
                    </header>

                    {blog.image && (
                        <motion.div
                            className="article-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <img src={getApiUrl(blog.image)} alt={blog.title} />
                        </motion.div>
                    )}

                    <div className="article-content">
                        {blog.content.split('\n').map((para, i) => (
                            para.trim() && <p key={i}>{para}</p>
                        ))}
                    </div>

                    <footer className="article-footer">
                        <div className="share-section">
                            <span>Share this post:</span>
                            <div className="share-buttons">
                                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')} aria-label="Share on Facebook"><Share2 size={18} /></button>
                                {/* Add more share buttons as needed */}
                            </div>
                        </div>
                    </footer>
                </motion.article>
            </div>
        </div>
    )
}

export default BlogDetail
