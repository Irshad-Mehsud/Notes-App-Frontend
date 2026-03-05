import AuthWrapper from "../ui/Card";
import CardUI from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

export default function CreateNewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    console.log("Resetting password for email:", email); // Log email before sending to backend
     console.log("New Password:", newPassword); // Log new password (consider security implications in production)
     console.log("Confirm Password:", confirmPassword); // Log confirm password (consider security implications in production)
     console.log("OTP:", otp); // Log OTP before sending to backend
     console.log("OTP Type:", typeof otp); // Log OTP type before sending to backend
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!email) {
      setError("Email is missing. Please restart the reset process.");
      return;
    }
    setIsLoading(true);
    try {
      await apiService.post("https://notes-app-backend-khaki.vercel.app/api/auth/reset-password", {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      navigate("/", { state: { message: "Password reset successful. Please log in." } });
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <CardUI title="Create New Password">
        <Input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          disabled={isLoading}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-xs mt-2 text-center italic">{error}</p>}
        <Button className="w-full mt-4" onClick={handleReset} disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </CardUI>
    </AuthWrapper>
  );
}