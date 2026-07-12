function Categories() {
  const categories = [
    {
      id: 1,
      name: "Laptops",
      description: "Company laptops and notebooks",
      assets: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Furniture",
      description: "Office furniture",
      assets: 20,
      status: "Active",
    },
    {
      id: 3,
      name: "Printers",
      description: "Office printers",
      assets: 8,
      status: "Inactive",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Asset Categories</h1>
          <p className="text-gray-500">
            Manage categories of organization assets.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Assets</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr key={category.id} className="border-t">

                <td className="p-4">{category.name}</td>

                <td className="p-4">{category.description}</td>

                <td className="p-4">{category.assets}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      category.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>

                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Categories;