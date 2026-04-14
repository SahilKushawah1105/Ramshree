import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Loader, User, Bot, Minimize2 } from 'lucide-react'
import getApiUrl from '../api/config'
import '../styles/components/Chatbot.css'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am the Ramshree AI assistant. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [enabled, setEnabled] = useState(true)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(getApiUrl('/api/settings'))
                const data = await response.json()
                if (data.chatbot_enabled === 'false') {
                    setEnabled(false)
                }
            } catch (error) {
                console.error('Failed to fetch chatbot settings:', error)
            }
        }
        fetchSettings()
    }, [])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            const response = await fetch(getApiUrl('/api/chatbot/query'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    history: messages.slice(1) // Exclude initial greeting from history if needed
                })
            })

            const data = await response.json()
            if (data.message) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }])
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Is the AI server running?' }])
        } finally {
            setLoading(false)
        }
    }

    if (!enabled) return null

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen ? (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <MessageCircle size={28} />
                    <span className="toggle-label">Chat with AI</span>
                </button>
            ) : (
                <div className="chatbot-window">
                    <header className="chatbot-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3>Ramshree AI</h3>
                                <span className="status-online">Online</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <Minimize2 size={20} />
                        </button>
                    </header>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-wrapper ${msg.role}`}>
                                <div className="message-icon">
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className="message-content">
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message-wrapper assistant">
                                <div className="message-icon">
                                    <Bot size={16} />
                                </div>
                                <div className="message-content thinking">
                                    <Loader className="spin" size={16} />
                                    <span>Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim() || loading}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Chatbot
