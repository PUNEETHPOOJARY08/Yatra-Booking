import React, { useState, useRef } from 'react';
import { Lock, User, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedBus from '../components/AnimatedBus';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 3D tilt effect state
  const [style, setStyle] = useState({});
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`,
      transition: 'transform 0.1s',
      boxShadow: `0 10px 40px 0 rgba(79,70,229,0.15), 0 1.5px 10px 0 rgba(236,72,153,0.10)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Registration failed');
        return;
      }
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 relative">
      <AnimatedBus />
      <div
        ref={cardRef}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full relative overflow-hidden transition-transform duration-300"
      >
        {/* Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-30 animate-pulse"></div>
        {/* Logo or Icon */}
        <div className="flex justify-center mb-6">
          <span className="bg-pink-500 rounded-full p-4 shadow-lg animate-bounce">
            <User className="h-8 w-8 text-white" />
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join YatraBook and start your journey!</p>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-pink-300">
              <User className="w-5 h-5 text-pink-400 mr-2" />
              <input
                type="text"
                className="bg-transparent flex-1 outline-none"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-pink-300">
              <Mail className="w-5 h-5 text-pink-400 mr-2" />
              <input
                type="email"
                className="bg-transparent flex-1 outline-none"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-pink-300">
              <span className="w-5 h-5 text-pink-400 mr-2">📱</span>
              <input
                type="tel"
                className="bg-transparent flex-1 outline-none"
                placeholder="Your Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-pink-300">
              <Lock className="w-5 h-5 text-pink-400 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="bg-transparent flex-1 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 text-xs text-pink-500 hover:underline"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-xs">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:underline">Sign In</Link>
        </div>
        <div className="mt-2 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} YatraBook. All rights reserved.
        </div>
      </div>
    </div>
  );
}