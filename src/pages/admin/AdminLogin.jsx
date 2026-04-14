import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, ShieldCheck, ArrowRight, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import getApiUrl from '../../api/config'
import SEO from '../../components/SEO'
import loginBg from '../../assets/admin_login_bg.png'
import '../../styles/pages/Admin.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(getApiUrl('/api/auth/login'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('adminToken', data.access_token)
                localStorage.setItem('adminUser', JSON.stringify(data.user))
                navigate('/admin/dashboard')
            } else {
                setError(data.message || 'Invalid credentials. Please try again.')
            }
        } catch (err) {
            setError('Connection error. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-wrapper" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="login-overlay"></div>
            <SEO title="Admin Login | Ramshree International" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="premium-login-card"
            >
                <div className="login-brand text-center">
                    <div className="brand-logo-container">
                        <ShieldCheck size={40} className="brand-icon" />
                    </div>
                    <h1>Secure <span>Access</span></h1>
                    <p>Enter your credentials to manage the platform</p>
                </div>

                <form className="premium-login-form" onSubmit={handleLogin}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="login-error-alert"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="login-input-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <User size={18} />
                            <input
                                type="email"
                                placeholder="name@ramshree.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-input-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading ? <Loader className="spin" size={20} /> : (
                            <>
                                Authenticate <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div className="login-footer-text">
                        <p>© 2026 Ramshree International. All Rights Reserved.</p>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default AdminLogin
