'use client';

import Input from "@/components/InputField";
import Button from "@/components/Button";
import SocialLogin from "@/components/SocialAuth";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // --- Input handlers ---
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  }

  function handleEmailError(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === '') {
      setEmailError('Email is required');
    } else if (!emailRegex.test(val)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError('');
    }
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    if (usernameError) setUsernameError('');
  }

  function handleUsernameError(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setUsername(val);
    if (val.trim() === '') {
      setUsernameError("Username is required");
    } else if (val.length < 3) {
      setUsernameError("Username must be at least 3 characters");
    } else {
      setUsernameError('');
    }
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  }

  function handlePasswordError(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setPassword(val);
    const regex = /^(?=.*[._-]).{9,}$/;
    if (val === '') {
      setPasswordError('Password is required');
    } else if (!regex.test(val)) {
      setPasswordError("Password must be at least 9 characters and contain at least one special character (., _, -)");
    } else {
      setPasswordError('');
    }
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError('');
  }

  function handleConfirmPasswordError(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setConfirmPassword(val);
    if (val === '') {
      setConfirmPasswordError('Confirm your password');
    } else if (val !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError('');
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Sign Up Card */}
      <div className="relative z-10 max-w-md w-full p-8 rounded-2xl shadow-2xl bg-white/5 backdrop-blur-md overflow-hidden 
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/15 before:to-transparent before:opacity-30">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6 relative z-10">Sign Up</h2>

        <form className="space-y-4 relative z-10">
          <Input value={username} onChange={handleUsernameChange} onBlur={handleUsernameError} error={usernameError} placeholder="Username" />
          <Input value={email} onChange={handleEmailChange} onBlur={handleEmailError} error={emailError} placeholder="Email" />
          <Input value={password} onChange={handlePasswordChange} onBlur={handlePasswordError} error={passwordError} type="password" placeholder="Password" />
          <Input value={confirmPassword} onChange={handleConfirmPasswordChange} onBlur={handleConfirmPasswordError} error={confirmPasswordError} type="password" placeholder="Confirm Password" />

          <Button
            label="Sign Up"
            type="submit"
            disabled={Boolean(usernameError || emailError || passwordError || confirmPasswordError || !(username || email || password || confirmPassword))}
          />
        </form>

        <div className="mt-6 relative z-10">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
