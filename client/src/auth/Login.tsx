import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginInputState, userLoginSchema } from '@/schema/userSchema'
import { useUserStore } from '@/store/useUserStore'

export default function Login() {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginInputState>>({})
  const [showPassword, setShowPassword] = useState(false)
  const { loading, login } = useUserStore()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof LoginInputState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const result = userLoginSchema.safeParse(input)
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])))
      // Show first error message in toast
      const firstError = Object.values(fieldErrors)[0]?.[0]
      if (firstError) {
        toast.error(firstError)
      }
      return
    }

    try {
      await login(input)
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Login failed. Please check your credentials and try again.")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-background sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-foreground">
            Login to your Account
          </h2>
          <p className="mt-2 text-sm text-center text-muted-foreground">
            Or{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
              Create an Account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
          <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"      
                placeholder="Email address"
                value={input.email}
                    onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={input.password}
                  onChange={handleChange}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground top-6"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}