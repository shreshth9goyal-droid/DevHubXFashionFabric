"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AnimateIn } from "@/components/animate-in"
import { CheckCircle2, Loader2, Shield, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface Catalogue {
  id: string
  title: string
  subtitle?: string | null
  coverImage: string
  category: string
}

export default function CatalogueDownloadPage() {
  const params = useParams()
  const router = useRouter()
  const catalogueId = params.catalogueId as string

  const [catalogue, setCatalogue] = useState<Catalogue | null>(null)
  const [isLoadingCatalogue, setIsLoadingCatalogue] = useState(true)
  
  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  
  // OTP state
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [isLoadingOtp, setIsLoadingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    fetchCatalogue()
  }, [catalogueId])

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpTimer])

  const fetchCatalogue = async () => {
    try {
      setIsLoadingCatalogue(true)
      const response = await fetch(`/api/catalogue/${catalogueId}`)
      
      if (!response.ok) {
        throw new Error("Catalogue not found")
      }

      const data = await response.json()
      setCatalogue(data)
    } catch (error) {
      console.error("Error fetching catalogue:", error)
      router.push("/catalogue")
    } finally {
      setIsLoadingCatalogue(false)
    }
  }

  const handleSendOtp = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setOtpError("Please enter a valid email address")
      return
    }

    setIsLoadingOtp(true)
    setOtpError("")

    try {
      const response = await fetch("/api/catalogue/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setOtpTimer(60) // 60 second cooldown
        toast.success("OTP sent to your email address!")
      } else {
        setOtpError(data.error || "Failed to send OTP")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      setOtpError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoadingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError("")

    try {
      const response = await fetch("/api/catalogue/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      })

      const data = await response.json()

      if (response.ok) {
        setOtpVerified(true)
        toast.success("Email verified successfully!")
        console.log("OTP Verified successfully. Waiting for final submission...");
        
        // Auto-scroll to the download button
        setTimeout(() => {
          const submitBtn = document.getElementById('submit-download-btn');
          if (submitBtn) {
            submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            submitBtn.classList.add('animate-bounce-short');
            setTimeout(() => submitBtn.classList.remove('animate-bounce-short'), 3000);
          }
        }, 500);
      } else {
        setOtpError(data.error || "Invalid OTP")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setOtpError("Failed to verify OTP. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("handleSubmit triggered", { firstName, lastName, email, phoneNumber, otpVerified });
    
    if (!otpVerified) {
      setFormError("Please verify your email address to continue")
      return
    }

    // Validation
    if (!firstName || !lastName || !email || !phoneNumber || !country || !state) {
      setFormError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setFormError("")

    try {
      const response = await fetch("/api/catalogue/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogueId,
          firstName,
          lastName,
          email,
          phoneNumber,
          companyName,
          country,
          state,
          otpVerified: true
        })
      })

      console.log("Submission response status:", response.status);
      const data = await response.json()
      console.log("Submission response data:", data);

      if (response.ok) {
        // Redirect to the specific catalogue viewer
        router.push(`/catalogue/${catalogueId}`)
      } else {
        setFormError(data.error || "Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingCatalogue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#00712C] mx-auto mb-4" />
          <p className="text-neutral-600">Loading catalogue...</p>
        </div>
      </div>
    )
  }

  if (!catalogue) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <AnimateIn>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Download Catalogue</h1>
            <p className="text-neutral-600">Fill in your details to access the catalogue</p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Catalogue Preview */}
          <AnimateIn delay={0.1}>
            <Card className="p-6">
              <div className="relative w-full aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={catalogue.coverImage}
                  alt={catalogue.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block bg-[#00712C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {catalogue.category}
              </div>
              <h2 className="text-xl font-bold mb-2">{catalogue.title}</h2>
              {catalogue.subtitle && (
                <p className="text-neutral-600 text-sm">{catalogue.subtitle}</p>
              )}
            </Card>
          </AnimateIn>

          {/* Download Form */}
          <AnimateIn delay={0.2}>
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="John"
                    className="mt-1"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Doe"
                    className="mt-1"
                  />
                </div>

                {/* Email with OTP Verification */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="john.doe@example.com"
                      disabled={otpVerified}
                      className="flex-1"
                    />
                    {!otpVerified && (
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isLoadingOtp || otpTimer > 0}
                        variant="outline"
                        className="whitespace-nowrap"
                      >
                        {isLoadingOtp ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : otpTimer > 0 ? (
                          `${otpTimer}s`
                        ) : otpSent ? (
                          "Resend OTP"
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    )}
                    {otpVerified && (
                      <div className="flex items-center px-3 bg-green-50 rounded-md">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    We'll send a verification code to your email
                  </p>
                  
                  {otpVerified && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-xl animate-in fade-in zoom-in duration-500 shadow-md">
                       <p className="text-base text-green-800 font-bold flex items-center gap-2">
                         <CheckCircle2 className="h-6 w-6 text-green-600" />
                         EMAIL VERIFIED!
                       </p>
                       <p className="text-sm text-green-700 mt-1">
                         Great! Now please scroll down and click <b>"Download Catalogue"</b> to finish.
                       </p>
                    </div>
                  )}
                </div>

                {/* OTP Input */}
                {otpSent && !otpVerified && (
                  <div>
                    <Label htmlFor="otp">Enter OTP *</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="flex-1 text-center text-lg tracking-widest"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingOtp || otp.length !== 6}
                        className="bg-[#00712C] hover:bg-[#00712C]"
                      >
                        {isVerifyingOtp ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Check your email for the 6-digit verification code
                    </p>
                  </div>
                )}

                {/* OTP Error */}
                {otpError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="+1 234 567 8900"
                    className="mt-1"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your Company"
                    className="mt-1"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="United States"
                    className="mt-1"
                  />
                </div>
{/* State */}
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="California"
                    className="mt-1"
                  />
                </div>

                {/* 
                {/* Verification Message */}
                {!otpVerified && (
                  <div className="flex items-start gap-2 text-sm text-[#00712C] bg-[#00712C]50 p-3 rounded-md">
                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Email Verification Required</p>
                      <p className="text-black">Please verify your email address to download catalogues.</p>
                    </div>
                  </div>
                )}

                {/* Form Error */}
                {formError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  id="submit-download-btn"
                  type="submit"
                  disabled={!otpVerified || isSubmitting}
                  className="w-full bg-[#00712C] hover:bg-[#00712C] text-white py-6 text-lg font-semibold transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : otpVerified ? (
                    "Download Catalogue"
                  ) : (
                    "Verify Email to Continue"
                  )}
                </Button>

                <p className="text-xs text-black text-center">
                  * Required fields. Your information will be kept confidential.
                </p>
              </form>
            </Card>
          </AnimateIn>
        </div>
      </div>
    </div>
  )
}
