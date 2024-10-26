import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/useUserStore'

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()
  const { verifyEmail, loading } = useUserStore()


  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value

    if (!/^[a-zA-Z0-9]$/.test(value)) {
      return
    }

    setCode(prevCode => {
      const newCode = [...prevCode]
      newCode[index] = value
      return newCode
    })

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)

    if (!/^[a-zA-Z0-9]+$/.test(pastedData)) {
      toast.error('Please paste only alphanumeric characters')
      return
    }

    const newCode = [...code]
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = pastedData[i]
      }
    }
    setCode(newCode)

    const nextEmptyIndex = newCode.findIndex(char => char === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const verificationCode = code.join("")
    try {
      const result = await verifyEmail(verificationCode)
      if (result) {
        navigate("/");
      } else {
        toast.error('Verification failed. Please check your code and try again.')
      }
    } catch (error) {
      console.error("Verification failed:", error)
      toast.error('An error occurred during verification. Please try again.')
    }
  }

  const handleResendCode = async () => {
    console.log("Resend code clicked")
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)), // Simulating API call
      {
        loading: 'Resending code...',
        success: 'Verification code resent successfully',
        error: 'Failed to resend code. Please try again.',
      }
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-foreground">Verify Your Email</h2>
        <p className="text-center text-muted-foreground">
          We've sent a 6-character code to your email. Enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {code.map((char, index) => (
              <Input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={char}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-xl text-center"
                aria-label={`Verification code digit ${index + 1}`}
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={loading || code.some(char => char === "")}
            className="w-full"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-muted-foreground">
            Didn't receive a code?{' '}
            <Button
              variant="link"
              onClick={handleResendCode}
              className="p-0 font-semibold"
            >
              Resend
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}