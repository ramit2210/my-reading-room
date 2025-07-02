import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

// Custom hook for using search context
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};

function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState("");

    function updateSearchTerm(term) {
        setSearchTerm(term);
    }

    function clearSearch() {
        setSearchTerm("");
    }

    const value = {
        searchTerm,
        updateSearchTerm,
        clearSearch,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider;
