"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        otp: showOtp ? otp : undefined,
        redirect: false,
      })

      if (result?.error) {
        if (result.error === "OTP_REQUIRED") {
          setShowOtp(true)
          toast.success("Security code sent to your email")
        } else if (result.error === "ACCOUNT_LOCKED") {
          toast.error("Account locked due to too many failed attempts. Try again in 1 hour.")
        } else if (result.error === "INVALID_OTP") {
          toast.error("Invalid verification code")
        } else if (result.error === "OTP_EXPIRED") {
          toast.error("Verification code expired. Please sign in again.")
          setShowOtp(false)
          setOtp("")
        } else {
          toast.error("Invalid credentials")
        }
      } else {
        toast.success("Login successful!")
        router.push("/admin")
        router.refresh()
      }
    } catch (error) {
      toast.error("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#00712C]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-neutral-900">
            {showOtp ? "Security Verification" : "Secure Access Portal"}
          </CardTitle>
          <CardDescription>
            {showOtp 
              ? "A 6-digit code has been sent to your email" 
              : "Enter authorized credentials to proceed"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!showOtp ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Secure Identifier</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@fashionfabric.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Security Key</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  disabled={isLoading}
                  className="h-12 text-center text-2xl tracking-[10px] font-bold"
                  autoFocus
                />
                <Button 
                  type="button" 
                  variant="link" 
                  className="w-full text-xs text-neutral-500"
                  onClick={() => setShowOtp(false)}
                >
                  Back to credentials
                </Button>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full h-11 text-lg bg-[#00712C] hover:bg-[#00712C]/90 font-semibold"
              disabled={isLoading}
            >
              {isLoading 
                ? "Checking..." 
                : (showOtp ? "Verify Access" : "Initiate Login")
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
