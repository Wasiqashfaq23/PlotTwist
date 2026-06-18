import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const Login = () => {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && user) {
    return <Navigate to="/home" replace />;
  }

  const inputClass =
    'w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:border-gold transition-colors';

  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="bg-cream rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <p className="text-gold-deep uppercase text-xs tracking-widest2 mb-3">
            Welcome Back
          </p>
          <h1 className="font-display text-3xl text-ink mb-8">
            Log in to PlotTwist
          </h1>

          {error && (
            <p className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              autoComplete="email"
              className={inputClass}
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
              className={inputClass}
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-ink text-cream py-3 rounded-full text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors disabled:opacity-50 mt-2"
            >
              {submitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-ink/60 text-sm mt-6 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-gold-deep underline">
              Register
            </Link>
          </p>

          <Link
            to="/browse"
            className="block text-ink/40 text-xs mt-6 text-center underline hover:text-ink/70 transition-colors"
          >
            Browse properties without an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
