import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { Loader2, ShoppingBag, MapPin, User, Phone, Mail, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutConfirmPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
  city?: string;
  country?: string;
}

const DEFAULT_FORM_DATA: FormData = {
  name: "",
  email: "user@example.com",
  contact: "",
  address: "",
  city: "",
  country: "",
};

export default function CheckoutConfirmPage({ open, setOpen }: CheckoutConfirmPageProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState(1);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? "Invalid email address" 
          : undefined;
      case "contact":
        return !/^\d+$/.test(value) 
          ? "Contact must be a valid number" 
          : value.length < 5 
            ? "Contact number must be at least 5 digits" 
            : undefined;
      case "address":
        return value.length < 5 
          ? "Address must be at least 5 characters" 
          : undefined;
      case "city":
        return value.length < 2 
          ? "City must be at least 2 characters" 
          : undefined;
      case "country":
        return value.length < 2 
          ? "Country must be at least 2 characters" 
          : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setLoading(false);
    setOpen(false);
  };

  const renderFormField = (
    field: keyof FormData,
    label: string,
    icon: React.ReactNode,
    type: string = "text",
    disabled: boolean = false
  ) => (
    <div className="space-y-2">
      <label htmlFor={field} className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      <Input
        id={field}
        type={type}
        value={formData[field]}
        onChange={handleChange(field)}
        onBlur={handleBlur(field)}
        disabled={disabled}
        className={cn(
          "transition-colors",
          errors[field] ? 'border-red-500 focus-visible:ring-red-500' : ''
        )}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {touched[field] && errors[field] && (
        <p className="text-sm text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  const renderProgressSteps = () => (
    <div className="flex justify-between mb-8">
      <div className="flex items-center w-full">
        {[1, 2].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center w-full">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
              step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            )}>
              {stepNumber}
            </div>
            {stepNumber < 2 && (
              <div className={cn(
                "flex-1 h-1 mx-2",
                step > stepNumber ? "bg-blue-600" : "bg-gray-200"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6" />
            Checkout Details
          </DialogTitle>
        </DialogHeader>

        {renderProgressSteps()}

        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="space-y-6">
            {step === 1 ? (
              <Card>
                <CardContent className="p-6 space-y-4">
                  {renderFormField("name", "Full Name", <User className="w-4 h-4" />)}
                  {renderFormField("email", "Email", <Mail className="w-4 h-4" />, "email", true)}
                  {renderFormField("contact", "Contact", <Phone className="w-4 h-4" />)}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 space-y-4">
                  {renderFormField("address", "Address", <MapPin className="w-4 h-4" />)}
                  {renderFormField("city", "City", <MapPin className="w-4 h-4" />)}
                  {renderFormField("country", "Country", <Globe className="w-4 h-4" />)}
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 pt-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button 
                type={step === 2 ? "submit" : "button"}
                className="flex-1"
                disabled={loading}
                onClick={() => {
                  if (step === 1) {
                    const isValid = !errors.name && !errors.email && !errors.contact;
                    if (isValid) setStep(2);
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : step === 1 ? (
                  "Next Step"
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}