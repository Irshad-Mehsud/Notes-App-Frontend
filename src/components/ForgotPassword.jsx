import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { useState } from "react";
import apiService from "../api/apiService";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      await apiService.post("/api/auth/forgot-password", { email });
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError("Failed to send email. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-[400px] shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button onClick={handleSubmit}>
            Send OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}