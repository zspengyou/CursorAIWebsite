'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">DE Chem. Inc.</h2>
        <p>
        With over 6,000 products in stock, DE Chem Inc. is ready to meet all your needs in synthetic intermediates, custom synthesis, processing, and manufacturing. We also offer cost-effective solutions through our contracted medicinal chemistry services.
        </p>
        <br />
        <p> 
        Feel free to contact us for quotes and inquiries; we are here to support your success.
        </p>
        <br />
        <p>2286 Chemin St-Francois</p>
        <p>Dorval, Quebec, H9P 1K2, Canada
        </p>
        <p>
        Tel: 1-438-367 7289
        </p>
        <p>
        Email: info@dechem-canada.com
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn(
              "bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white",
              "transition-colors duration-200"
            )}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn(
              "bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white",
              "transition-colors duration-200"
            )}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message</label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={cn(
              "bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white",
              "transition-colors duration-200",
              "min-h-[150px]" // This sets a minimum height
            )}
            rows={6} // This sets the default number of visible text lines
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {submitStatus === 'success' && (
          <p className="text-green-600 mt-2">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600 mt-2">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  )
}