'use client';

import Input from "@/components/InputField";
import Button from "@/components/Button";
import SocialLogin from "@/components/SocialAuth";
import { useState } from "react";






export default function LoginPage() {

  const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const [password, setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');



function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {{
  setEmail(e.target.value);
  if (emailError) {
    setEmailError(''); // Clear error if email changes
  }
}
}
function handleEmailError(e: React.ChangeEvent<HTMLInputElement>) {
  const val = e.target.value;
  setEmail(val);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (val === '') {
  setEmailError('Email is required');
}

else if (!emailRegex.test(val)) {
  setEmailError("Invalid email address");
} else {
  setEmailError(""); // or null if you prefer
}

}
function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
  setPassword(e.target.value);
  if (passwordError) {
    setPasswordError(''); // Clear error if password changes
  }
}
function handlePasswordError(e: React.ChangeEvent<HTMLInputElement>) {
  const val = e.target.value;
  setPassword(val);  
  const regex = /^(?=.*[._-]).{9,}$/;
  if (val === '') {
    setPasswordError('Password is required');
  } else if (!regex.test(val)) {
    setPasswordError("Password must be at least 9 characters long and contain at least one special character (., _, -)");
  } else {
    setPasswordError(""); // or null if you prefer
  }

}

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full p-8 rounded-2xl shadow-2xl bg-white/3 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form className="space-y-4">
          <Input value={email} onChange={handleEmailChange}  onBlur={handleEmailError} error={emailError} placeholder="Email" />
          <Input value={password} onChange={handlePasswordChange} onBlur={handlePasswordError} error={passwordError} type="password" placeholder="Password" />
          <Button label="Login" type="submit" disabled={Boolean(emailError || passwordError)} email={email} password={password}/>
        </form>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
