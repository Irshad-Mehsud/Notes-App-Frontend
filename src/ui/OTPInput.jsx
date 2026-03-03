import { useRef, useState } from "react";

export default function OTPInput({ value, onChange, disabled }) {
  // We use an internal array to manage the 6 boxes
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return; // Only allow numbers

    const newOtp = [...otpArray];
    // Take the last char entered (prevents double digits)
    newOtp[index] = val.substring(val.length - 1);
    setOtpArray(newOtp);

    // CRITICAL: Join the array and send the full 6-digit string to parent
    const combinedOtp = newOtp.join("");
    onChange(combinedOtp);

    // Auto-focus next input
    if (val && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus back on backspace
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otpArray.map((digit, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          disabled={disabled}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-12 text-center text-xl font-bold border rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-gray-100"
        />
      ))}
    </div>
  );
}