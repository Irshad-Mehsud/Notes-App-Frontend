import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { loginUser } from "../api/auth";
import Toast from "../components/Toast";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
    }

    return newErrors;
  };

  // ✅ Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  // ✅ Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    setApiError("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const res = await loginUser(formData);

      console.log("Login Response:", res?.data?.user);

      // ⭐ Your backend returns user object directly
      if (res.data && res.data._id) {

        // Save user session
        localStorage.setItem("userId", JSON.stringify(res.data._id));
        localStorage.setItem("token", res.data.token); // Using _id as token for simplicity
        setShowToast(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {
        setApiError("Invalid email or password");
      }

    } catch (err) {
      console.log(err);
      setApiError("Server error. Please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {showToast && (
        <Toast
          message="Login Successful!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <Card className="w-[400px] shadow-2xl rounded-2xl backdrop-blur-lg border border-white/20">

        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <form onSubmit={handleLogin} className="space-y-6">

            {apiError && (
              <p className="text-red-500 text-xs text-center">
                {apiError}
              </p>
            )}

            <div>
              <Input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

          </form>

          <div className="flex justify-between text-sm">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-pink-500 hover:underline">
              Forgot Password?
            </Link>

            <Link to="/signup" className="text-indigo-600 hover:text-pink-500 hover:underline">
              Signup
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}