import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    // Entrance animation for the contact form
    gsap.fromTo('.contact-anim', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(e.target)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        e.target.reset()
        // Optional: hide success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        console.error("Error submitting form", data)
        setStatus('error')
      }
    } catch (error) {
      console.error("Form submission error", error)
      setStatus('error')
    }
  }

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--color-bg)' }}>
      <section style={{ width: '100%', maxWidth: '800px', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="contact-anim">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '16px' }}>
            Get in Touch
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            Have questions about Vectrah? Send us a message and we'll get back to you shortly.
          </p>
        </div>

        {status === 'success' && (
          <div className="alert-success contact-anim">
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px', color: 'var(--color-primary)' }}>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="alert-error contact-anim">
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px', color: '#ff4444' }}>Something went wrong</h3>
            <p>We couldn't send your message. Please try again later.</p>
          </div>
        )}

        <form 
          onSubmit={handleSubmit}
          className="contact-form contact-anim"
        >
          <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''} />
          <input type="hidden" name="subject" value="New Contact from Vectrah Website" />
          <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required placeholder="Shyam Sundar" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required placeholder="shyamsundar1@gmail.com" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" required rows="6" placeholder="How can we help you?"></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      <style>{`
        .alert-success, .alert-error {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 32px;
          text-align: center;
          font-family: var(--font-body);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--color-border);
        }
        
        .alert-success {
          background: rgba(0, 184, 232, 0.08);
          border-color: rgba(0, 184, 232, 0.3);
          color: var(--color-text);
        }

        .alert-error {
          background: rgba(255, 68, 68, 0.08);
          border-color: rgba(255, 68, 68, 0.3);
          color: var(--color-text);
        }
        .contact-form {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text);
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 16px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-text);
          transition: border-color 0.3s, box-shadow 0.3s;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-dim);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--color-text-subtle);
        }
        
        .btn-primary {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          background: var(--color-primary);
          border: none;
          padding: 16px 32px;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .btn-primary:hover {
          background: var(--color-accent);
          transform: translateY(-2px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 28px 24px;
          }
          .form-group input,
          .form-group textarea {
            padding: 14px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .contact-form {
            padding: 24px 16px;
          }
        }
      `}</style>
    </main>
  )
}
