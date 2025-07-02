import { useContext, useEffect, useState } from "react";
import { BookContext } from "../../context/BookContext";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import InitialPage from "./InitialPage";

function DashboardT() {
    const { books, getBooks, loading } = useContext(BookContext);
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center  mb-5 relative w-full">
            {!books || books.length === 0 ? (
                <InitialPage />
            ) : (
                <ul className="flex flex-col w-[60%] mb-5 gap-10">
                    {books.map((book) => (
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

            <button
                onClick={() => navigate("/form")}
                className="fixed flex justify-center items-center cursor-pointer right-12 bottom-6 text-white text-3xl bg-indigo-600 h-13 w-13 rounded-full shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-indigo-500"
            >
                <IoMdAdd />
            </button>
        </div>
    );
}

export default DashboardT;
