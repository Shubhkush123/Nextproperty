import React, { useState } from 'react';
import { post } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2 .896 2 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2c0-1.104.896-2 2-2zm6 2v2a6 6 0 11-12 0v-2a6 6 0 1112 0z" /></svg>
);

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await post('/auth/login', form);
      setSuccess('Login successful!');
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user)); // Save user object
      setTimeout(() => {
        navigate('/add-property');
      }, 1200);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-2 relative overflow-hidden">
      {/* SVG Background Pattern */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-30" style={{ pointerEvents: 'none' }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#c7d2fe" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-orange-500 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow">
            Sign In
          </h2>
          <div className="text-center text-gray-500 mb-6 text-base font-medium">Login to your account to add properties</div>
          <div className="border-b border-gray-200 mb-8"></div>
          {success && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center font-semibold">{success}</div>}
          {error && <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center font-semibold">{error}</div>}
          {location.state?.registered && (
            <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center font-semibold">
              Registration successful! Please login.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"> <MailIcon /> </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"> <LockIcon /> </span>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-3 pl-10 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021 2.021A9.956 9.956 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.657.403 3.22 1.125 4.575M9.879 9.879A3 3 0 0115 12m0 0a3 3 0 01-5.121-2.121" /></svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-lg mt-2 duration-200"
            >
              Login
            </button>
          </form>
          {success && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/add-property')}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
              >
                Add Property
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 