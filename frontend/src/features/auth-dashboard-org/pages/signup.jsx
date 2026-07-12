function Signup() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>


        <div className="mb-4">

          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-2 rounded-lg"
          />

        </div>


        <div className="mb-4">

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded-lg"
          />

        </div>


        <div className="mb-4">

          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full border p-2 rounded-lg"
          />

        </div>


        <button
          className="w-full bg-blue-600 text-white p-2 rounded-lg"
        >
          Signup
        </button>


        <p className="text-center mt-4">
          Already have an account?

          <span className="text-blue-600 ml-2">
            Login
          </span>

        </p>


      </div>

    </div>
  );
}


export default Signup;