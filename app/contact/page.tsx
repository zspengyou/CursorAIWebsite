'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Send } from 'lucide-react'

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
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Company Information Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Company Information</h2>
          <p className="text-gray-600 mb-4">Get in touch with us</p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <p>2286 Chemin St-Francois, Dorval, Quebec, H9P 1K2, Canada</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <p>1-438-367 7289</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <p>info@dechem-canada.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
          <p className="text-gray-600 mb-4">We&apos;ll get back to you as soon as possible</p>
          
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
                placeholder="Your name"
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
                placeholder="Your email"
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
                placeholder="Your message"
                className={cn(
                  "bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white",
                  "transition-colors duration-200",
                  "min-h-[150px]"
                )}
                rows={6}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
            {submitStatus === 'success' && (
              <p className="text-green-600 mt-2">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 mt-2">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}