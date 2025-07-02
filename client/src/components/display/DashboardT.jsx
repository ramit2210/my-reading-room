import { useContext, useEffect, useState } from "react";
import { BookContext } from "../../context/BookContext";
import { useSearch } from "../../context/SearchContext";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import InitialPage from "./InitialPage";

function DashboardT() {
    const { books, getBooks, loading } = useContext(BookContext);
    const { searchTerm, clearSearch } = useSearch();
    const [editingId, setEditingId] = useState(null);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);

    // Filter books based on search term
    useEffect(() => {
        if (!books) {
            setFilteredBooks([]);
            return;
        }

        if (!searchTerm || searchTerm.trim() === "") {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter((book) => {
                const searchLower = searchTerm.toLowerCase();

                // Search only in book title
                return book.title?.toLowerCase().includes(searchLower);
            });
            setFilteredBooks(filtered);
        }
    }, [books, searchTerm]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-20 mb-5 relative w-full">
            {!books || books.length === 0 ? (
                <InitialPage />
            ) : (
                <>
                    {/* Show search results info */}
                    {searchTerm && (
                        <div className="w-[60%] mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-center">
                                <p className="text-blue-800 text-sm">
                                    {filteredBooks.length === 0
                                        ? `No books found for "${searchTerm}"`
                                        : `Found ${filteredBooks.length} book${
                                              filteredBooks.length !== 1
                                                  ? "s"
                                                  : ""
                                          } for "${searchTerm}"`}
                                </p>
                                <button
                                    onClick={clearSearch}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        </div>
                    )}

                    {filteredBooks.length === 0 && searchTerm ? (
                        <div className="w-[60%] text-center py-20">
                            <p className="text-gray-500 text-lg">
                                No books match your search criteria.
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                Try adjusting your search terms.
                            </p>
                            <button
                                onClick={clearSearch}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Show all books
                            </button>
                        </div>
                    ) : (
                        <ul className="flex flex-col w-[60%] mb-5 gap-10">
                            {filteredBooks.map((book) => (
                                <li
                                    key={book.id}
                                    className="bg-gray-200 py-5 px-5 shadow-xl rounded-2xl"
                                >
                                    <Card
                                        book={book}
                                        editingId={editingId}
                                        setEditingId={setEditingId}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            <button
                onClick={() => navigate("/form")}
                className="fixed flex justify-center items-center cursor-pointer right-14 bottom-10 text-white text-3xl bg-indigo-600 h-13 w-13 rounded-full shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-indigo-500"
            >
                <IoMdAdd />
            </button>
        </div>
    );
}

export default DashboardT;
