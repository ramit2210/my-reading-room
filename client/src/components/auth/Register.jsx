import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;
    const { register, isAuthenticated, error, clearError } =
        useContext(AuthContext);

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     register(name, email, password);
    // }

    return (
        <div className="flex items-center flex-col gap-6">
            <h1 className="mt-8 text-2xl font-bold">Sign Up</h1>
            <form className="flex flex-col gap-5 bg-gray-100 w-[28%] rounded-2xl shadow-2xl">
                {error && <p>{error}</p>}
                <div className="flex items-center flex-col pt-8 w-[100%]">
                    <label className="font-bold mr-[53%]">Username:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your username"
                        value={name}
                        required
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex items-center flex-col w-[100%]">
                    <label className="font-bold mr-[60%]">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="yourname@example.com"
                        value={email}
                        required
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex items-center flex-col  w-[100%]">
                    <label className="font-bold mr-[53%]">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex items-center flex-col  w-[100%]">
                    <label className="font-bold mr-[38%]">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="text-xl font-bold cursor-pointer text-white  p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg w-[70%]"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="text-center pb-8">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;
