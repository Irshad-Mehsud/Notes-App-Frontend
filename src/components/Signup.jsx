import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "./Toast";
import { registerUser } from "../api/auth";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be 6+ characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // ✅ Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    setApiError("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      setLoading(true);

      const { confirmPassword, ...userData } = formData;

      const res = await registerUser(userData);

      console.log("Signup Response:", res.data);

      // ⭐ Backend may return user OR success flag
      if (res.data?._id || res.data?.success) {

        setShowToast(true);

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {
        setApiError(res.data?.message || "Signup failed");
      }

    } catch (err) {
      console.log(err);
      setApiError("Server error. Please try again");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {showToast && (
        <Toast
          message="Signup successful!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <Card className="w-[400px] shadow-2xl rounded-2xl backdrop-blur-lg border border-white/20">

        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <form onSubmit={handleSignup} className="space-y-6">

            {apiError && (
              <p className="text-red-500 text-xs text-center">{apiError}</p>
            )}

            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Signup"}
            </Button>

          </form>

          <div className="text-center text-sm">
            <Link
              to="/"
              className="text-indigo-600 hover:text-pink-500 hover:underline"
            >
              Already have account? Login
            </Link>
          </div>

        </CardContent>

      </Card>
    </div>
  );
}