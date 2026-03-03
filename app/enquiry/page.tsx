"use client"

import { useState } from "react"
import { MapPin, Mail, Phone, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimateIn } from "@/components/animate-in"
import Image from "next/image"
import { toast } from "sonner"

// SuccessModal component
function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <CheckCircle2 className="text-green-600 mb-4" size={56} />
        <h3 className="text-2xl font-semibold mb-2 text-center">Enquiry Submitted!</h3>
        <p className="text-neutral-600 text-center mb-4">Thank you for your enquiry. We will get back to you shortly.</p>
        <button
          className="mt-2 px-6 py-2 bg-[#00712C] hover:bg-[#00712C] text-white rounded-lg font-medium transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({ event: 'enquiry_form_submitted' });
        }
        setShowSuccessModal(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
        toast.success("Enquiry Submitted", {
          description: "Thank you for your enquiry. We will get back to you shortly.",
        })
      } else {
        toast.error(result.error || "There was an error submitting your enquiry. Please try again.")
      }
    } catch (error) {
      toast.error("There was an error submitting your enquiry. Please try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/bg-imges-hero-sections/image-06.jpg"
            alt="Contact Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Contact Us</h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg text-white/90">
                Get in touch with us for all your uniform requirements
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimateIn direction="left">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                        Email
                      </label>
                      <Input
                        id="email"  
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#00712C] hover:bg-[#1b5e20] text-white w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </AnimateIn>
              <AnimateIn direction="right">
                <div>
                  <h2 className="text-3xl font-bold text-[#00712C] mb-6">Contact Information</h2>
                  <p className="text-black mb-8">
                    Feel free to reach out to us directly using the contact information below.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#00712C] mt-1 mr-3 flex-shrink-0" />
                      <p className="text-black">
                        Shop No. 8, Block - II, Dukle Heaven, Near Old Yamaha Showroom, Santa Inez, Panaji, Taleigao, Goa
                        403001
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#00712C] mr-3 flex-shrink-0" />
                      <p className="text-black">+91 9867275524</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#00712C] mr-3 flex-shrink-0" />
                      <p className="text-black">fashionfabric@rocketmail.com</p>
                    </div>
                  </div>
                  <div className="h-[400px] bg-neutral-200 rounded-lg overflow-hidden  mt-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.3302675743397!2d73.82595091482943!3d15.493999589246702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc0c8818cdc8b%3A0x94ccf697e9a90b3c!2sDukle%20Heaven%2C%20Santa%20Inez%2C%20Panaji%2C%20Goa%20403001!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 bg-neutral-50">
          <div className="container px-4 md:px-6 text-center">
            <AnimateIn>
              <h2 className="text-3xl font-bold mb-6 text-[#00712C]">Business Hours</h2>
              <div className="max-w-[500px] mx-auto bg-white p-8 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <p className="font-medium">Monday - Saturday:</p>
                  <p>10:00 AM - 8:00 PM</p>
                  
                </div>
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-black">
                    For urgent Enquiries outside business hours, please email us and we will respond as soon as
                    possible.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
    </div>
  )
}
