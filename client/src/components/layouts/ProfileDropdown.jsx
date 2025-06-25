import { FaUser } from "react-icons/fa";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Required for routing

function ProfileDropdown() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Optional: Close dropdown when clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="flex-1 relative inline-block w-fit mt-3"
            onClick={() => setIsOpen(!isOpen)}
            ref={dropdownRef}
        >
            {/* Trigger */}
            <div className="flex flex-col items-center cursor-pointer select-none">
                <FaUser className="text-l mt-2" />
                <span className="font-semibold text-xs">Profile</span>
                <div
                    className={`h-[4px] w-10 mt-3 rounded transition-all duration-200 ${
                        isOpen ? "bg-indigo-600" : "bg-transparent"
                    }`}
                />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 shadow-lg bg-gray-50 rounded p-4 z-20">
                    {isAuthenticated ? (
                        <>
                            <p className="text-sm text-gray-800 mb-2">
                                Welcome, <strong>{user?.name}</strong>
                            </p>
                            <button
                                onClick={logout}
                                className="block w-full text-center py-2 border rounded text-red-500 font-bold hover:bg-red-50"
                            >
                                LOGOUT
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="font-semibold text-gray-800">
                                Welcome
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                To access account and manage books
                            </p>
                            <Link
                                to="/login"
                                className="block w-full text-center py-2 border rounded text-white bg-indigo-600 font-bold hover:bg-indigo-500 mb-2"
                            >
                                LOGIN
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full text-center py-2 border rounded text-white bg-indigo-600 font-bold hover:bg-indigo-500"
                            >
                                SIGNUP
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
