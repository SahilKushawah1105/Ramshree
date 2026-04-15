import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Loader, X, Save, Upload } from 'lucide-react'
import getApiUrl from '../../api/config'
import '../../styles/pages/Admin.css'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        image: ''
    })

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

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        const formDataUpload = new FormData()
        formDataUpload.append('image', file)

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/blogs/upload'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataUpload
            })

            if (response.ok) {
                const data = await response.json()
                setFormData(prev => ({ ...prev, image: data.url }))
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

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog)
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                excerpt: blog.excerpt || '',
                author: blog.author || '',
                image: blog.image || ''
            })
        } else {
            setEditingBlog(null)
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                author: '',
                image: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const token = localStorage.getItem('adminToken')
            const url = editingBlog ? getApiUrl(`/api/blogs/${editingBlog.id}`) : getApiUrl('/api/blogs')
            const method = editingBlog ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await fetchBlogs()
                setIsModalOpen(false)
            } else {
                alert('Failed to save blog')
            }
        } catch (error) {
            console.error('Save error:', error)
            alert('An error occurred while saving')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl(`/api/blogs/${id}`), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.ok) {
                setBlogs(prev => prev.filter(b => b.id !== id))
            }
        } catch (error) {
            alert('Failed to delete blog')
        }
    }

    return (
        <div className="admin-layout">
            <div className="admin-products"> {/* Reusing styles from products */}
                <header className="admin-header flex-between">
                    <div>
                        <h1>Blog <span>Management</span></h1>
                        <p>Share updates and stories with your audience.</p>
                    </div>
                    <button className="primary-btn" onClick={() => handleOpenModal()}>
                        <Plus size={20} /> Add Blog
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
                                        placeholder="Search blogs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map(blog => (
                                        <tr key={blog.id}>
                                            <td><strong>{blog.title}</strong></td>
                                            <td>{blog.author || 'Ramshree'}</td>
                                            <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                            <td className="actions-cell">
                                                <button className="icon-btn edit" onClick={() => handleOpenModal(blog)}><Edit2 size={16} /></button>
                                                <button className="icon-btn delete" onClick={() => handleDelete(blog.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>

            {/* Blog Edit/Add Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} className="modal-body">
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Blog Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Author</label>
                                    <input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Blog Image</label>
                                    <div className="image-uploader" onClick={() => document.getElementById('imageInput').click()}>
                                        <input
                                            type="file"
                                            id="imageInput"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        {uploading ? (
                                            <div className="upload-placeholder"><Loader className="spin" /> Uploading...</div>
                                        ) : formData.image ? (
                                            <div className="image-preview">
                                                <img src={getApiUrl(formData.image)} alt="Preview" />
                                                <button type="button" className="remove-image" onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: '' }) }}>
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="upload-placeholder">
                                                <Upload size={32} />
                                                <span>Click to upload blog cover image</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Excerpt (Short Summary)</label>
                                    <textarea rows="3" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
                                </div>
                            </div>

                            <div className="input-group" style={{ marginTop: '20px' }}>
                                <label>Content</label>
                                <textarea required rows="10" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" disabled={saving} className="primary-btn">
                                    {saving ? <Loader className="spin" size={20} /> : <Save size={20} />}
                                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blogs
