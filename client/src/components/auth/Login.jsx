import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const { login, isAuthenticated, error, clearError } =
        useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        return () => clearError();
    }, [isAuthenticated, navigate]);

    function handleChange(e) {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(email, password);
    }

    return (
        <div className="flex items-center flex-col gap-6">
            <h1 className="mt-8 text-2xl font-bold">Sign In</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 bg-gray-100 w-[28%] rounded-2xl shadow-2xl"
            >
                {error && <p>{error}</p>}
                <div className="flex items-center flex-col pt-10 w-[100%]">
                    <label className="font-bold mr-[60%]">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="yourname@example.com"
                        value={email}
                        onChange={handleChange}
                        required
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex items-center flex-col  w-[100%]">
                    <label className="font-bold mr-[54%]">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={handleChange}
                        className="bg-white w-[70%] h-10 pl-3 rounded-lg border-2 border-indigo-500 outline-0"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="text-xl font-bold cursor-pointer text-white  p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg w-[70%]"
                    >
                        Sign In
                    </button>
                </div>
                <div className="text-center pb-10">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
