import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Loader, X, Save, Upload } from 'lucide-react'
import getApiUrl from '../../api/config'
import '../../styles/pages/Admin.css'

const Certifications = () => {
    const [certs, setCerts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCert, setEditingCert] = useState(null)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: ''
    })

    const fetchCerts = async () => {
        try {
            const response = await fetch(getApiUrl('/api/certifications'))
            const data = await response.json()
            if (Array.isArray(data)) {
                setCerts(data)
            } else {
                console.error('Expected an array for certifications, got:', data)
            }
        } catch (error) {
            console.error('Failed to fetch certifications:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCerts()
    }, [])

    const handleIconUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        const formDataUpload = new FormData()
        formDataUpload.append('icon', file)

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/certifications/upload'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataUpload
            })

            if (response.ok) {
                const data = await response.json()
                setFormData(prev => ({ ...prev, icon: data.url }))
            } else {
                alert('Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('An error occurred during upload')
        } finally {
            setUploading(false)
        }
    }

    const handleOpenModal = (cert = null) => {
        if (cert) {
            setEditingCert(cert)
            setFormData({
                title: cert.title || '',
                description: cert.description || '',
                icon: cert.icon || ''
            })
        } else {
            setEditingCert(null)
            setFormData({
                title: '',
                description: '',
                icon: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const token = localStorage.getItem('adminToken')
            const url = editingCert ? getApiUrl(`/api/certifications/${editingCert.id}`) : getApiUrl('/api/certifications')
            const method = editingCert ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await fetchCerts()
                setIsModalOpen(false)
            } else {
                alert('Failed to save certification')
            }
        } catch (error) {
            console.error('Save error:', error)
            alert('An error occurred while saving')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this certification?')) return

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl(`/api/certifications/${id}`), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.ok) {
                setCerts(prev => prev.filter(c => c.id !== id))
            }
        } catch (error) {
            alert('Failed to delete certification')
        }
    }

    return (
        <div className="admin-layout">
            <div className="admin-products">
                <header className="admin-header flex-between">
                    <div>
                        <h1>Certification <span>Management</span></h1>
                        <p>Manage the trust and standards certifications shown on your website.</p>
                    </div>
                    <button className="primary-btn" onClick={() => handleOpenModal()}>
                        <Plus size={20} /> Add Certification
                    </button>
                </header>

                <div className="table-container">
                    {loading ? (
                        <div className="loader-container section-padding flex-center"><Loader className="spin" /></div>
                    ) : (
                        <>
                            <div className="table-actions">
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search certifications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certs.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map(cert => (
                                        <tr key={cert.id}>
                                            <td><strong>{cert.title}</strong></td>
                                            <td>{cert.description}</td>
                                            <td className="actions-cell">
                                                <button className="icon-btn edit" onClick={() => handleOpenModal(cert)}><Edit2 size={16} /></button>
                                                <button className="icon-btn delete" onClick={() => handleDelete(cert.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>{editingCert ? 'Edit Certification' : 'Add New Certification'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} className="modal-body">
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Icon</label>
                                    <div className="image-uploader" onClick={() => document.getElementById('iconInput').click()}>
                                        <input
                                            type="file"
                                            id="iconInput"
                                            hidden
                                            accept="image/*"
                                            onChange={handleIconUpload}
                                        />
                                        {uploading ? (
                                            <div className="upload-placeholder"><Loader className="spin" /> Uploading...</div>
                                        ) : formData.icon ? (
                                            <div className="image-preview">
                                                <img src={formData.icon.startsWith('http') ? formData.icon : getApiUrl(formData.icon)} alt="Preview" />
                                                <button type="button" className="remove-image" onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, icon: '' }) }}>
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="upload-placeholder">
                                                <Upload size={32} />
                                                <span>Click to upload icon</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" disabled={saving} className="primary-btn">
                                    {saving ? <Loader className="spin" size={20} /> : <Save size={20} />}
                                    {editingCert ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Certifications
