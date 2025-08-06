import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
  const { fullName, email, phoneNumber, password, confirmPassword } = formData;
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    try {
      const newUser = { fullName, email, phoneNumber, password };
      const res = await axios.post('/api/auth/register', newUser);
      setSuccess(res.data.message + ' Redirecting to login...');
      setTimeout(() => { navigate('/login'); }, 2000);
    } catch (err: any) {
      if (err.response && err.response.data.message) { setError(err.response.data.message); } 
      else { setError("Registration failed. Please try again."); }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
      <div className="relative z-20 bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full text-white">
        <div className="text-center mb-6"><h2 className="text-4xl font-bold">Create Your Account</h2></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required /></div>
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required /></div>
          <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Phone Number" name="phoneNumber" value={phoneNumber} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required /></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="password" placeholder="Password" name="password" value={password} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" minLength={8} required /></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-600" required /></div>
          <div className="flex items-center space-x-3 pt-2">
            <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-yellow-600 focus:ring-yellow-600" />
            <label htmlFor="terms" className="text-sm text-gray-300">I agree to the <Link to="/terms" className="text-yellow-500 hover:underline">Terms and Conditions</Link></label>
          </div>
          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center pt-2">{success}</p>}
          <div className="pt-4"><button type="submit" disabled={!agreedToTerms} className="w-full bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">Create Account</button></div>
        </form>
        <div className="text-center text-gray-400 mt-6"><p>Already have an account? <Link to="/login" className="text-yellow-500 hover:underline font-semibold">Sign In</Link></p></div>
      </div>
    </section>
  );
};
export default Register;