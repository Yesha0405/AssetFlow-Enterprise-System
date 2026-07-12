import { useState } from 'react';
import { registerUser } from '../services/authService';

function Signup({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = registerUser(formData);

    if (!result.success) {
      setError(result.message);
      setMessage('');
      return;
    }

    setMessage(result.message);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
          {message ? <p className="mb-4 text-sm text-green-600">{message}</p> : null}

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Sign up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <button type="button" onClick={onSwitchToLogin} className="text-blue-600 ml-2">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;