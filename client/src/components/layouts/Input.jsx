import { FaSearch } from "react-icons/fa";

function Input() {
    return (
        <div className="flex-3 flex justify-center items-center">
            <div className="bg-gray-200 p-3 shadow-md rounded-tl-lg rounded-bl-lg">
                <FaSearch />
            </div>
            <input
                type="text"
                placeholder="Find Your Book...  "
                className="w-100 h-10 pl-3 rounded-tr-lg rounded-br-lg outline-0 bg-white shadow-md"
            />
        </div>
    );
}

export default Input;
