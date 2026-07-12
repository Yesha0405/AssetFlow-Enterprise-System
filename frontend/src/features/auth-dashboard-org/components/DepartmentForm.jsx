import { useState } from "react";

function DepartmentForm({ onSubmit = () => {} }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) return;

    onSubmit({
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    });

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="department-name" className="block mb-1 font-medium">
          Department Name
        </label>
        <input
          id="department-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Finance"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="department-description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="department-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Department details"
          className="w-full border px-3 py-2 rounded-lg"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Save Department
      </button>
    </form>
  );
}

export default DepartmentForm;