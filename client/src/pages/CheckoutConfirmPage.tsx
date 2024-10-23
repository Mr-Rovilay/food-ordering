import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";


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
    
    // Validate and set error if field has been touched
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

    // Touch all fields to show errors
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setLoading(false);
    setOpen(false);
  };

  const renderFormField = (
    field: keyof FormData,
    label: string,
    type: string = "text",
    disabled: boolean = false
  ) => (
    <div className="grid items-center grid-cols-4 gap-4">
      <label htmlFor={field} className="text-sm font-medium text-right text-gray-700">
        {label}
      </label>
      <div className="col-span-3 space-y-1">
        <Input
          id={field}
          type={type}
          value={formData[field]}
          onChange={handleChange(field)}
          onBlur={handleBlur(field)}
          disabled={disabled}
          className={`${errors[field] ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {touched[field] && errors[field] && (
          <p className="text-sm text-red-500">{errors[field]}</p>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
          <DialogDescription>
            Double-check your delivery details and ensure everything is in order.
            When you are ready, hit confirm button to finalize your order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4 space-y-6">
          {renderFormField("name", "Full Name")}
          {renderFormField("email", "Email", "email", true)}
          {renderFormField("contact", "Contact")}
          {renderFormField("address", "Address")}
          {renderFormField("city", "City")}
          {renderFormField("country", "Country")}


          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Continue To Payment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}