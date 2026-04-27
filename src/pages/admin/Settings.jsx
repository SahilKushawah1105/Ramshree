import { useState, useEffect } from 'react'
import { Save, Mail, Phone, MapPin, Loader, Image as ImageIcon, Plus, Trash2, Layout, Settings as SettingsIcon, FileText } from 'lucide-react'
import getApiUrl from '../../api/config'
import '../../styles/pages/Admin.css'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general')
    const [settings, setSettings] = useState({
        email: '',
        phone: '',
        address: '',
        facebook: '',
        instagram: '',
        twitter: '',
        about_who_we_are: '',
        about_vision_mission: '',
        about_infrastructure: '',
        chatbot_enabled: 'true',
        chatbot_instructions: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(getApiUrl('/api/settings'))
                const data = await response.json()
                if (Object.keys(data).length > 0) {
                    setSettings(prev => ({ ...prev, ...data }))
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleJsonChange = (settingKey, field, value) => {
        const currentData = JSON.parse(settings[settingKey] || '{}')
        const updatedData = { ...currentData, [field]: value }
        setSettings(prev => ({ ...prev, [settingKey]: JSON.stringify(updatedData) }))
    }

    const handleInfraCardChange = (index, field, value) => {
        const currentData = JSON.parse(settings.about_infrastructure || '{"cards":[]}')
        const updatedCards = [...currentData.cards]
        updatedCards[index] = { ...updatedCards[index], [field]: value }
        setSettings(prev => ({
            ...prev,
            about_infrastructure: JSON.stringify({ ...currentData, cards: updatedCards })
        }))
    }

    const addInfraCard = () => {
        const currentData = JSON.parse(settings.about_infrastructure || '{"cards":[]}')
        const updatedCards = [...currentData.cards, { title: 'New Card', desc: '' }]
        setSettings(prev => ({
            ...prev,
            about_infrastructure: JSON.stringify({ ...currentData, cards: updatedCards })
        }))
    }

    const removeInfraCard = (index) => {
        const currentData = JSON.parse(settings.about_infrastructure || '{"cards":[]}')
        const updatedCards = currentData.cards.filter((_, i) => i !== index)
        setSettings(prev => ({
            ...prev,
            about_infrastructure: JSON.stringify({ ...currentData, cards: updatedCards })
        }))
    }

    const handleImageUpload = async (e, settingKey) => {
        const file = e.target.files[0]
        if (!file) return

        setUploadingImage(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/settings/upload'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            if (response.ok) {
                const data = await response.json()
                handleJsonChange(settingKey, 'image', data.url)
            } else {
                alert('Failed to upload image')
            }
        } catch (error) {
            alert('Upload error')
        } finally {
            setUploadingImage(false)
        }
    }

    const handleCatalogUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploadingImage(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/settings/upload'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            if (response.ok) {
                const data = await response.json()
                setSettings(prev => ({ ...prev, catalog_url: data.url }))
            } else {
                alert('Failed to upload catalog')
            }
        } catch (error) {
            alert('Upload error')
        } finally {
            setUploadingImage(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(getApiUrl('/api/settings'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(settings)
            })

            if (response.ok) {
                alert('Settings saved successfully!')
            } else {
                alert('Failed to save settings')
            }
        } catch (error) {
            alert('Failed to save settings')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="loader-container section-padding flex-center"><Loader className="spin" /></div>

    const aboutContent = JSON.parse(settings.about_who_we_are || '{}')
    const vmContent = JSON.parse(settings.about_vision_mission || '{}')
    const infraContent = JSON.parse(settings.about_infrastructure || '{"cards":[]}')

    return (
        <div className="admin-layout">
            <div className="admin-settings">
                <header className="admin-header flex-between">
                    <div>
                        <h1>System <span>Configuration</span></h1>
                        <p>Customize your website content and contact parameters.</p>
                    </div>
                    <button className="primary-btn" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader size={20} className="spin" /> : <Save size={20} />}
                        {saving ? 'Saving...' : 'Save All Changes'}
                    </button>
                </header>

                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <SettingsIcon size={18} /> General Settings
                    </button>
                    <button
                        className={`admin-tab ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        <Layout size={18} /> About Page Content
                    </button>
                    <button
                        className={`admin-tab ${activeTab === 'chatbot' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chatbot')}
                    >
                        <SettingsIcon size={18} /> AI Chatbot
                    </button>
                </div>

                <div className="settings-form-container">
                    {activeTab === 'general' ? (
                        <>
                            <section className="settings-section">
                                <h2><Mail size={22} /> Contact Information</h2>
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="e.g. info@ramshree.com"
                                        value={settings.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid-2">
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="e.g. +91 972 757 1536"
                                            value={settings.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Business Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="City, State, Country"
                                            value={settings.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="settings-section">
                                <h2><SettingsIcon size={22} /> Social Media Links</h2>
                                <div className="input-grid">
                                    <div className="input-group">
                                        <label>Facebook URL</label>
                                        <input type="text" name="facebook" placeholder="https://facebook.com/..." value={settings.facebook} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Instagram URL</label>
                                        <input type="text" name="instagram" placeholder="https://instagram.com/..." value={settings.instagram} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Twitter URL</label>
                                        <input type="text" name="twitter" placeholder="https://twitter.com/..." value={settings.twitter} onChange={handleChange} />
                                    </div>
                                </div>
                            </section>

                            <section className="settings-section">
                                <h2><FileText size={22} /> Product Catalog</h2>
                                <p className="mb-15 text-muted">Upload your latest PDF catalog for customers to download.</p>
                                <div className="input-group">
                                    <label>Catalog PDF File</label>
                                    <div className="flex-between gap-20">
                                        <div className="flex-grow-1">
                                            <input 
                                                type="text" 
                                                readOnly 
                                                placeholder="No catalog uploaded" 
                                                value={settings.catalog_url || ''} 
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn-light flex-center gap-10"
                                            onClick={() => document.getElementById('catalogUpload').click()}
                                            disabled={uploadingImage}
                                        >
                                            {uploadingImage ? <Loader size={18} className="spin" /> : <Plus size={18} />}
                                            Upload PDF
                                        </button>
                                        <input 
                                            type="file" 
                                            id="catalogUpload" 
                                            hidden 
                                            accept="application/pdf"
                                            onChange={(e) => handleCatalogUpload(e)}
                                        />
                                    </div>
                                    {settings.catalog_url && (
                                        <div className="mt-10">
                                            <a href={getApiUrl(settings.catalog_url)} target="_blank" rel="noopener noreferrer" className="text-primary flex-center gap-10" style={{ justifyContent: 'flex-start' }}>
                                                <FileText size={16} /> View Current Catalog
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    ) : activeTab === 'about' ? (
                        <>
                            <section className="settings-section">
                                <h2><ImageIcon size={22} /> Who We Are Section</h2>
                                <div className="about-edit-grid">
                                    <div className="about-image-edit">
                                        <div className="settings-image-preview">
                                            <img src={getApiUrl(aboutContent.image)} alt="About Section Preview" />
                                            <label className="upload-overlay">
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleImageUpload(e, 'about_who_we_are')}
                                                    disabled={uploadingImage}
                                                />
                                                {uploadingImage ? <Loader className="spin" size={24} /> : <ImageIcon size={24} />}
                                                <span>Change Photo</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="about-text-edit">
                                        <div className="input-group">
                                            <label>Hero Heading</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Ramshree International"
                                                value={aboutContent.title}
                                                onChange={(e) => handleJsonChange('about_who_we_are', 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Primary Narrative</label>
                                            <textarea
                                                rows="6"
                                                placeholder="Tell your story..."
                                                value={aboutContent.desc1}
                                                onChange={(e) => handleJsonChange('about_who_we_are', 'desc1', e.target.value)}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Secondary Narrative</label>
                                            <textarea
                                                rows="6"
                                                placeholder="Additional details..."
                                                value={aboutContent.desc2}
                                                onChange={(e) => handleJsonChange('about_who_we_are', 'desc2', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-40 grid-2">
                                    <div className="input-group">
                                        <label>Vision Statement</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Where do you see the company in 10 years?"
                                            value={vmContent.vision_desc}
                                            onChange={(e) => handleJsonChange('about_vision_mission', 'vision_desc', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Mission Statement</label>
                                        <textarea
                                            rows="4"
                                            placeholder="What is your purpose today?"
                                            value={vmContent.mission_desc}
                                            onChange={(e) => handleJsonChange('about_vision_mission', 'mission_desc', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="settings-section">
                                <div className="flex-between mb-20">
                                    <h2><Layout size={22} /> Infrastructure & Setup</h2>
                                    <button className="primary-btn btn-sm" onClick={addInfraCard}>
                                        <Plus size={16} /> Add Specialty Card
                                    </button>
                                </div>
                                <div className="infra-cards-manager">
                                    {(infraContent.cards || []).map((card, idx) => (
                                        <div key={idx} className="infra-manage-card">
                                            <div className="infra-card-header">
                                                <input
                                                    type="text"
                                                    placeholder="Feature Title"
                                                    value={card.title}
                                                    onChange={(e) => handleInfraCardChange(idx, 'title', e.target.value)}
                                                />
                                                <button className="delete-btn" onClick={() => removeInfraCard(idx)} title="Delete Card">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <textarea
                                                rows="5"
                                                placeholder="Describe this facility or process..."
                                                value={card.desc}
                                                onChange={(e) => handleInfraCardChange(idx, 'desc', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : activeTab === 'chatbot' ? (
                        <>
                            <section className="settings-section">
                                <h2><SettingsIcon size={22} /> AI Chatbot Configuration</h2>
                                <p className="mb-20 text-muted">Configure how the AI behaves and what information it knows about your business.</p>

                                <div className="input-group">
                                    <label className="flex-between">
                                        Enable AI Chatbot
                                        <div className={`toggle-switch ${settings.chatbot_enabled === 'true' ? 'active' : ''}`}
                                            onClick={() => setSettings(prev => ({ ...prev, chatbot_enabled: prev.chatbot_enabled === 'true' ? 'false' : 'true' }))}>
                                            <div className="toggle-knob"></div>
                                        </div>
                                    </label>
                                </div>

                                <div className="input-group">
                                    <label>AI "Training" Instructions (System Prompt)</label>
                                    <p className="input-hint mb-10">Provide detailed instructions, product details, and personality guidelines for the AI. The AI will follow these instructions strictly.</p>
                                    <textarea
                                        rows="12"
                                        name="chatbot_instructions"
                                        placeholder="e.g. You are a helpful assistant for Ramshree International. You know about our spices: Turmeric, Chili..."
                                        value={settings.chatbot_instructions}
                                        onChange={handleChange}
                                        className="code-font"
                                    />
                                </div>
                                <div className="alert alert-info mt-20">
                                    <strong>Tip:</strong> Be as specific as possible. Mention your products, pricing (if public), and how you want the AI to greet customers.
                                </div>
                            </section>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Settings
