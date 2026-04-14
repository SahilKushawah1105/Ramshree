import { useState, useEffect, useRef } from 'react'
import { Plus, Edit2, Trash2, Search, Loader, X, Save, PlusCircle, MinusCircle, Upload, Check, ChevronDown } from 'lucide-react'
import getApiUrl from '../../api/config'
import '../../styles/pages/Admin.css'

const CATEGORIES = [
    'Ground Spices',
    'Whole Spices',
    'Oil Seeds',
    'Grains & Pulses',
    'Blended Spices',
    'Other'
]

const Products = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const categoryRef = useRef(null)

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        categories: [],
        price: '',
        shortDesc: '',
        description: '',
        image: '',
        specs: {},
        packaging: []
    })

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

    useEffect(() => {
        fetchProducts()

        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        const formDataUpload = new FormData()
        formDataUpload.append('image', file)

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/products/upload'), {
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

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name || '',
                categories: product.categories || [],
                price: product.price || '',
                shortDesc: product.shortDesc || '',
                description: product.description || '',
                image: product.image || '',
                specs: product.specs || {},
                packaging: product.packaging || []
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: '',
                categories: [],
                price: '',
                shortDesc: '',
                description: '',
                image: '',
                specs: {},
                packaging: []
            })
        }
        setIsModalOpen(true)
    }

    const toggleCategory = (cat) => {
        setFormData(prev => {
            const current = [...prev.categories]
            const index = current.indexOf(cat)
            if (index > -1) {
                current.splice(index, 1)
            } else {
                current.push(cat)
            }
            return { ...prev, categories: current }
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (formData.categories.length === 0) {
            alert('Please select at least one category')
            return
        }

        setSaving(true)
        try {
            const token = localStorage.getItem('adminToken')
            const url = editingProduct ? getApiUrl(`/api/products/${editingProduct.id}`) : getApiUrl('/api/products')
            const method = editingProduct ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await fetchProducts()
                setIsModalOpen(false)
            } else {
                alert('Failed to save product')
            }
        } catch (error) {
            console.error('Save error:', error)
            alert('An error occurred while saving')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl(`/api/products/${id}`), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.ok) {
                setProducts(prev => prev.filter(p => p.id !== id))
            }
        } catch (error) {
            alert('Failed to delete product')
        }
    }

    // Dynamic Specs Handlers
    const addSpec = () => {
        setFormData(prev => ({
            ...prev,
            specs: { ...prev.specs, '': '' }
        }))
    }

    const updateSpec = (oldKey, newKey, value) => {
        const newSpecs = { ...formData.specs }
        if (oldKey !== newKey) {
            delete newSpecs[oldKey]
        }
        newSpecs[newKey] = value
        setFormData(prev => ({ ...prev, specs: newSpecs }))
    }

    const removeSpec = (key) => {
        const newSpecs = { ...formData.specs }
        delete newSpecs[key]
        setFormData(prev => ({ ...prev, specs: newSpecs }))
    }

    // Packaging Handlers
    const addPack = () => {
        setFormData(prev => ({
            ...prev,
            packaging: [...prev.packaging, '']
        }))
    }

    const updatePack = (index, value) => {
        const newPack = [...formData.packaging]
        newPack[index] = value
        setFormData(prev => ({ ...prev, packaging: newPack }))
    }

    const removePack = (index) => {
        setFormData(prev => ({
            ...prev,
            packaging: prev.packaging.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className="admin-layout">
            <div className="admin-products">
                <header className="admin-header flex-between">
                    <div>
                        <h1>Product <span>Management</span></h1>
                        <p>Add and manage your premium spice catalog.</p>
                    </div>
                    <button className="primary-btn" onClick={() => handleOpenModal()}>
                        <Plus size={20} /> Add Product
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
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                                        <tr key={product.id}>
                                            <td><strong>{product.name}</strong></td>
                                            <td>
                                                <div className="flex flex-wrap gap-5">
                                                    {(product.categories || []).map((cat, i) => (
                                                        <span key={i} className="badge">{cat}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>₹{product.price || 'N/A'}</td>
                                            <td className="actions-cell">
                                                <button className="icon-btn edit" onClick={() => handleOpenModal(product)}><Edit2 size={16} /></button>
                                                <button className="icon-btn delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>

            {/* Product Edit/Add Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} className="modal-body">
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Product Name</label>
                                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Product Categories</label>
                                    <div className="custom-multiselect" ref={categoryRef}>
                                        <div
                                            className={`multiselect-header ${isCategoryOpen ? 'active' : ''}`}
                                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        >
                                            <div className="selected-tags">
                                                {formData.categories.length > 0 ? (
                                                    formData.categories.map(cat => (
                                                        <span key={cat} className="tag">
                                                            {cat}
                                                            <X size={12} onClick={(e) => { e.stopPropagation(); toggleCategory(cat); }} />
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="placeholder">Select categories...</span>
                                                )}
                                            </div>
                                            <ChevronDown size={18} className={`arrow ${isCategoryOpen ? 'up' : ''}`} />
                                        </div>

                                        {isCategoryOpen && (
                                            <div className="multiselect-dropdown">
                                                {CATEGORIES.map(cat => (
                                                    <div
                                                        key={cat}
                                                        className={`dropdown-item ${formData.categories.includes(cat) ? 'selected' : ''}`}
                                                        onClick={() => toggleCategory(cat)}
                                                    >
                                                        {cat}
                                                        {formData.categories.includes(cat) && <Check size={16} />}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Price (₹)</label>
                                    <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Product Image</label>
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
                                                <span>Click to upload product image</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Short Description</label>
                                <input value={formData.shortDesc} onChange={e => setFormData({ ...formData, shortDesc: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label>Full Description</label>
                                <textarea required rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div className="form-sections flex gap-30">
                                <div className="section-half flex-1">
                                    <div className="flex-between mb-15">
                                        <h3>Specifications</h3>
                                        <button type="button" onClick={addSpec} className="text-btn flex items-center gap-5"><PlusCircle size={16} /> Add Param</button>
                                    </div>
                                    <div className="specs-editor">
                                        {Object.entries(formData.specs).map(([key, value], idx) => (
                                            <div key={idx} className="spec-row flex gap-10 mb-10">
                                                <input placeholder="Key" value={key} onChange={e => updateSpec(key, e.target.value, value)} className="flex-1" />
                                                <input placeholder="Value" value={value} onChange={e => updateSpec(key, key, e.target.value)} className="flex-1" />
                                                <button type="button" onClick={() => removeSpec(key)} className="icon-btn delete"><MinusCircle size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="section-half flex-1">
                                    <div className="flex-between mb-15">
                                        <h3>Packaging</h3>
                                        <button type="button" onClick={addPack} className="text-btn flex items-center gap-5"><PlusCircle size={16} /> Add Option</button>
                                    </div>
                                    <div className="packaging-editor">
                                        {formData.packaging.map((pack, idx) => (
                                            <div key={idx} className="pack-row flex gap-10 mb-10">
                                                <input placeholder="e.g. 25kg PP Bag" value={pack} onChange={e => updatePack(idx, e.target.value)} className="flex-1" />
                                                <button type="button" onClick={() => removePack(idx)} className="icon-btn delete"><MinusCircle size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" disabled={saving} className="primary-btn">
                                    {saving ? <Loader className="spin" size={20} /> : <Save size={20} />}
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
