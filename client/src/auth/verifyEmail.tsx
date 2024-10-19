import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Handle individual digit input change
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Only allow numeric input

    setCode(prevCode => {
      const newCode = [...prevCode];
      newCode[index] = element.value;
      return newCode;
    });

    // Automatically move to the next input field if not the last one
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) {
      toast.error('Please paste only numeric digits');
      return;
    }

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = pastedData[i];
      }
    }
    setCode(newCode);

    // Focus on the next empty input or the last input if all are filled
    const nextEmptyIndex = newCode.findIndex(digit => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length === 6) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Email verified successfully');
        navigate('/success'); // Navigate to success page or dashboard
      } catch (error) {
        toast.error('Verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please enter a valid 6-digit code');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
        <h2 className="mb-6 text-2xl font-bold text-center">Verify Your Email</h2>
        <p className="mb-4 text-center text-gray-600">
          We've sent a 6-digit code to your email. Enter it below to verify.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex mb-6 space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-xl text-center transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-bold text-white transition rounded bg-green hover:bg-hoverGreen focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Didn't receive a code?{' '}
            <button
              type="button"
              onClick={() => toast('Resending code...', { icon: '📨' })}
              className="font-semibold text-secondary hover:text-secondary-dark"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
