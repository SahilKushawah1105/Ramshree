import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Settings, Users, ArrowUpRight, FileText } from 'lucide-react'
import getApiUrl from '../../api/config'
import { Link } from 'react-router-dom'
import '../../styles/pages/Admin.css'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        settingsUpdated: 0,
        totalUsers: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(getApiUrl('/api/admin/stats'), {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
                })
                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error('Failed to fetch stats:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="admin-layout">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-dashboard"
            >
                <header className="admin-header">
                    <h1>Admin <span>Dashboard</span></h1>
                    <p>Welcome back! Here's your business at a glance.</p>
                </header>

                <div className="stats-grid">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="stat-card"
                    >
                        <div className="stat-icon products">
                            <Package size={32} />
                        </div>
                        <div className="stat-info">
                            <h3>Total Products</h3>
                            <p className="stat-value">{loading ? '...' : stats.totalProducts}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="stat-card"
                    >
                        <div className="stat-icon settings">
                            <Settings size={32} />
                        </div>
                        <div className="stat-info">
                            <h3>Active Settings</h3>
                            <p className="stat-value">{loading ? '...' : stats.settingsUpdated}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="stat-card"
                    >
                        <div className="stat-icon users">
                            <Users size={32} />
                        </div>
                        <div className="stat-info">
                            <h3>Admin Users</h3>
                            <p className="stat-value">{loading ? '...' : stats.totalUsers}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/admin/products" className="action-card">
                            <Package size={24} />
                            <div>
                                <strong>Manage Products</strong>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>Add, edit or remove catalog items</p>
                            </div>
                            <ArrowUpRight size={20} />
                        </Link>
                        <Link to="/admin/settings" className="action-card">
                            <Settings size={24} />
                            <div>
                                <strong>Application Settings</strong>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>Update contact info and social links</p>
                            </div>
                            <ArrowUpRight size={20} />
                        </Link>
                        <Link to="/admin/blogs" className="action-card">
                            <FileText size={24} />
                            <div>
                                <strong>Manage Blogs</strong>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>Add, edit or remove blog posts</p>
                            </div>
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Dashboard
