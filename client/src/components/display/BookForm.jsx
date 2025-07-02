import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "./../../context/BookContext";

function BookForm() {
    const [book, setBook] = useState({
        title: "",
        summary: "",
    });

    const { title, summary } = book;
    const { addBooks, getBooks } = useContext(BookContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setBook((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await addBooks(book);
        await getBooks();
        setBook({
            title: "",
            summary: "",
        });
        navigate("/dashboard");
    }

    return (
        <div className="flex justify-center items-center flex-col mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Add Your Book
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-gray-100 w-[28%] rounded-2xl shadow-2xl p-7"
            >
                <div>
                    <label className="block mb-1 font-medium">
                        Book Name<span className="text-red-500">*</span>:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        name="title"
                        className="w-full p-2 border-indigo-500 outline-0 border-2 rounded"
                        value={title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Summary:</label>
                    <textarea
                        className="w-full p-2 border-2 outline-0 border-indigo-500 rounded h-30"
                        value={summary}
                        name="summary"
                        placeholder="Write a summary about the book..."
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="text-xl font-bold cursor-pointer text-white p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg w-[70%] mx-auto"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default BookForm;
