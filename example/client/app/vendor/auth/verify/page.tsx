import { OTPVerificationForm } from "@/components/auth/otp-verification-form"

export default function VendorOTPVerificationPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <OTPVerificationForm />
      </div>
    </div>
  )
}

