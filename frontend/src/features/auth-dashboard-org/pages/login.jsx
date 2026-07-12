import { useState } from 'react';
import { loginUser } from '../services/authService';

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = loginUser(formData);

    if (!result.success) {
      setError(result.message);
      setMessage('');
      return;
    }

    setMessage(result.message);
    setError('');

    setFormData({
      email: '',
      password: '',
    });

    // Go to Dashboard after successful login
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
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
            <label htmlFor="password" className="block mb-2">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {error && (
            <p className="mb-4 text-red-600 text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="mb-4 text-green-600 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?

          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 ml-2"
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;