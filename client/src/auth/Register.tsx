import { useState, ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/store/useUserStore"
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"

export default function Register() {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "", 
    contact: "", 
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Trim whitespace for all fields except passwords
    const trimmedValue = name === 'password' || name === 'confirmPassword' ? value : value.trim();
    setInput(prev => ({ ...prev, [name]: trimmedValue }));
    // Clear error when user starts typing
    if (errors[name as keyof SignupInputState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  const registerSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Form validation check
      const result = userSignupSchema.safeParse(input);
      if (!result.success) {
        const fieldErrors = result.error.formErrors.fieldErrors;
        setErrors(fieldErrors as Partial<SignupInputState>);
        
        // Show first error message in toast
        const firstError = Object.values(fieldErrors)[0]?.[0];
        if (firstError) {
          toast.error(firstError);
        }
        return;
      }

      // Prepare signup data (excluding confirmPassword)
      const signupData = {
        fullname: input.fullname.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
        contact: input.contact.trim()
      };

      // Attempt signup
      const response = await signup(signupData);
      
      if (response?.success) {
        // Clear form
        setInput({
          fullname: "",
          email: "",
          password: "",
          contact: "",
          confirmPassword: ""
        });
        setErrors({});
        
        // Show success message and navigate
        toast.success("Registration successful! Please verify your email.");
        navigate("/verify-email");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);

      // Handle specific error cases
      if (errorMessage.toLowerCase().includes('email already exists')) {
        setInput(prev => ({ ...prev, email: '' }));
        setErrors(prev => ({ 
          ...prev, 
          email: 'This email is already registered. Please use a different email or login.' 
        }));
      } else if (errorMessage.toLowerCase().includes('contact already exists')) {
        setInput(prev => ({ ...prev, contact: '' }));
        setErrors(prev => ({ 
          ...prev, 
          contact: 'This contact number is already registered.' 
        }));
      }
    }
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(prev => !prev);
    } else {
      setShowConfirmPassword(prev => !prev);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-background sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-foreground">
            Create a New Account
          </h2>
          <p className="mt-2 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Login here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={registerSubmitHandler} noValidate>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full Name"
                value={input.fullname}
                onChange={changeEventHandler}
                className={errors.fullname ? "border-destructive" : ""}
                aria-invalid={!!errors.fullname}
                aria-describedby={errors.fullname ? "fullname-error" : undefined}
              />
              {errors.fullname && (
                <p id="fullname-error" className="mt-1 text-xs text-destructive">
                  {errors.fullname}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={input.email}
                onChange={changeEventHandler}
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

            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                name="contact"
                type="tel"
                maxLength={10}
                placeholder="Contact (10 digits)"
                value={input.contact}
                onChange={changeEventHandler}
                className={errors.contact ? "border-destructive" : ""}
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "contact-error" : undefined}
              />
              {errors.contact && (
                <p id="contact-error" className="mt-1 text-xs text-destructive">
                  {errors.contact}
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={input.password}
                  onChange={changeEventHandler}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute -translate-y-1/2 right-2 top-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => togglePasswordVisibility('password')}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  value={input.confirmPassword}
                  onChange={changeEventHandler}
                  className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute -translate-y-1/2 right-2 top-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="mt-1 text-xs text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  )
}