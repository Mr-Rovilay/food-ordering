import { useState, FormEvent, Dispatch, SetStateAction } from "react";
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
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useOrderStore } from "@/store/useOrderStore";


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

interface CheckoutSessionRequest {
  cartItems: Array<{
    menuId: string;
    name: string;
    image: string;
    price: string;
    quantity: string;
  }>;
  deliveryDetails: FormData;
  restaurantId: string;
}

export const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();

  const [formData, setFormData] = useState<FormData>({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact?.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState(1);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? "Invalid email address" 
          : undefined;
      case "contact":
        return !/^\d+$/.test(value.trim()) 
          ? "Contact must be a valid number" 
          : value.trim().length < 5 
            ? "Contact number must be at least 5 digits" 
            : undefined;
      case "address":
        return value.trim().length < 5 
          ? "Address must be at least 5 characters" 
          : undefined;
      case "city":
        return value.trim().length < 2 
          ? "City must be at least 2 characters" 
          : undefined;
      case "country":
        return value.trim().length < 2 
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

  const validateStep = (currentStep: number): boolean => {
    const fieldsToValidate = currentStep === 1 
      ? ['name', 'email', 'contact'] 
      : ['address', 'city', 'country'];

    const stepErrors: FormErrors = {};
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
      if (error) {
        stepErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleNextStep = () => {
    const isValid = validateStep(step);
    if (isValid) {
      setStep(2);
    }
  };

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;

    try {
      if (!restaurant?._id) {
        throw new Error("Restaurant ID is missing");
      }

      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: formData,
        restaurantId: restaurant?._id as string,
      };

      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.error("Checkout error:", error);
      // You might want to show an error message to the user here
    }
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
        name={field}
        type={type}
        value={formData[field]}
        onChange={handleChange(field)}
        onBlur={handleBlur(field)}
        disabled={disabled}
        className={cn(
          "transition-colors",
          errors[field] ? "border-red-500 focus-visible:ring-red-500" : ""
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
      <div className="flex items-center w-full px-6">
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

        <form onSubmit={handleCheckout} className="p-6 pt-0">
          <div className="space-y-6">
            {step === 1 ? (
              <Card>
                <CardContent className="p-6 space-y-4">
                  {renderFormField("name", "Full Name", <User className="w-4 h-4" />)}
                  {renderFormField("email", "Email", <Mail className="w-4 h-4" />, "email", true)}
                  {renderFormField("contact", "Contact", <Phone className="w-4 h-4" />, "tel")}
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
                className="flex-1 "
                disabled={loading}
                onClick={step === 1 ? handleNextStep : undefined}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                  </>
                ) : step === 1 ? (
                  "Next Step"
                ) : (
                  "Continue To Payment"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};