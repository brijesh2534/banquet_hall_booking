import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); // Get login function and auth state

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const [error, setError] = useState('');

  // This part is still useful: if a user who is already logged in tries to
  // visit the /login page, it will redirect them to the homepage.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      // 1. Call the login function from our context to update the global state
      login(res.data.token);
      
      // 2. Immediately navigate to the homepage after successful login
      navigate('/');

    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
      <div className="relative z-20 bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full text-white">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to book your next event</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div><button type="submit" className="w-full bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">Sign In</button></div>
        </form>
        <div className="text-center text-gray-400 mt-6">
          <p>Don't have an account? <Link to="/register" className="text-yellow-500 hover:underline font-semibold">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};
export default Login;