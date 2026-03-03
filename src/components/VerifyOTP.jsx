import AuthWrapper from "../ui/Card";
import { useState } from "react";
import apiService from "../api/apiService";
import Card from "../ui/Card";
import OTPInput from "../ui/OTPInput";
import { Button } from "../ui/Button";
// import { useNavigate } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";
// ... other imports

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve the email passed from the 'Forgot Password' screen via React Router state
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if email is missing
  if (!email) {
    setTimeout(() => {
      navigate("/forgot-password", { replace: true, state: { error: "Email is required for OTP verification." } });
    }, 100);
    return (
      <AuthWrapper>
        <Card title="Verify OTP">
          <p className="text-red-500 text-center">Email is missing. Redirecting...</p>
        </Card>
      </AuthWrapper>
    );
  }

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Show OTP and email in console before sending to backend
    console.log("Verifying OTP:", { email, otp });
     console.log("OTP Type:", typeof otp); // Log OTP type

    try {
      await apiService.post("/auth/verify-otp", { email, otp });
      // Move to password reset, passing email forward
      navigate("/create-new-password", { state: { email, otp } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Card title="Verify OTP">
        <p className="text-gray-500 text-sm mb-4 text-center">
          Code sent to: <span className="font-semibold text-gray-700">{email}</span>
        </p>
        
        <OTPInput value={otp} onChange={setOtp} disabled={isLoading} />
        
        {error && <p className="text-red-500 text-xs mt-2 text-center italic">{error}</p>}
        
        <Button onClick={handleVerify} className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? "Checking..." : "Verify"}
        </Button>

        <div className="mt-4 text-center">
          <button className="text-blue-500 text-xs hover:underline disabled:text-gray-400">
            Resend Code
          </button>
        </div>
      </Card>
    </AuthWrapper>
  );
}