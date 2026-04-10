import React from 'react'
import { motion } from 'framer-motion'
import { Lock, User, ShieldCheck } from 'lucide-react'
import SEO from '../../components/SEO'
import '../../styles/pages/Admin.css'

const AdminLogin = () => {
    return (
        <div className="admin-login-page flex-center">
            <SEO title="Admin Login" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card"
            >
                <div className="login-header text-center">
                    <ShieldCheck size={48} color="var(--primary)" />
                    <h2>Admin <span>Portal</span></h2>
                    <p>Login to manage your product catalog.</p>
                </div>

                <form className="login-form">
                    <div className="form-group">
                        <label><User size={16} /> Username</label>
                        <input type="text" placeholder="admin" disabled />
                    </div>
                    <div className="form-group">
                        <label><Lock size={16} /> Password</label>
                        <input type="password" placeholder="••••••••" disabled />
                    </div>
                    <div className="alert-note">
                        <p>Admin panel integration is currently in progress. This portal will allow real-time product management.</p>
                    </div>
                    <button type="button" className="btn btn-primary w-100" style={{ cursor: 'not-allowed' }}>
                        Login Coming Soon
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default AdminLogin
