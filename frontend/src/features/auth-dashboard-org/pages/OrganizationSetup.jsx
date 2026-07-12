import { useEffect, useState } from 'react';

const STORAGE_KEY = 'assetflow-organization';

function OrganizationSetup() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Unable to load organization data:', err);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError('Organization name is required.');
      setMessage('');
      return;
    }

    if (!formData.address.trim()) {
      setError('Address is required.');
      setMessage('');
      return;
    }

    if (!/^[0-9+\-()\s]{7,15}$/.test(formData.phone.trim())) {
      setError('Please enter a valid phone number.');
      setMessage('');
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setMessage('Organization details saved successfully.');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Organization Setup</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium" htmlFor="name">
              Organization Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter organization name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
              placeholder="Enter full address"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter phone number"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-green-600">{message}</p> : null}

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Save Organization
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrganizationSetup;