import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";

function Input() {
    const { searchTerm, updateSearchTerm } = useSearch();

    return (
        <div className="flex-3 flex justify-center items-center">
            <div className="bg-gray-200 p-3 shadow-md rounded-tl-lg rounded-bl-lg">
                <FaSearch />
            </div>
            <input
                type="text"
                placeholder="Find Your Book..."
                value={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
                className="w-100 h-10 pl-3 rounded-tr-lg rounded-br-lg outline-0 bg-white shadow-md"
            />
        </div>
    );
}

export default Input;
