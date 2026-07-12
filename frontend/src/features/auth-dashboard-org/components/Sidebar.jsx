import { Link } from "react-router-dom";

const DepartmentPage = () => {
  return (
    <div>
      <h1>Department Page</h1>
      <Link
        to="/departments"
        className="block px-4 py-2 rounded hover:bg-gray-100"
      >
        Departments
      </Link>
    </div>
  );
};

export default DepartmentPage;