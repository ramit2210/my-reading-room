// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { useContext } from "react";
// import { BookContext } from "../../context/BookContext";

// function Card({ book }) {
//     const { deleteBooks } = useContext(BookContext);

//     return (
//         <div className="flex gap-10">
//             <div className="flex flex-col gap-3">
//                 <img
//                     src={book.details?.cover}
//                     alt="book_picture"
//                     className="h-35 w-35"
//                 />
//                 <p className="text-center font-bold bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
//                     {book.details?.author}
//                 </p>
//             </div>
//             <div className="flex flex-col gap-3 w-[70%]">
//                 <p className="font-bold text-2xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
//                     {book.details.title || book.title}
//                     {book.summary ? (
//                         ""
//                     ) : (
//                         <span className="inline-flex ml-1">
//                             <FaRegEdit className="w-5 h-5 text-lime-600 cursor-pointer" />
//                         </span>
//                     )}
//                 </p>
//                 <p className="italic font-serif">
//                     {book.summary}
//                     {book.summary ? (
//                         <span  className="inline-flex ml-1">
//                             <FaRegEdit className="text-lime-600 cursor-pointer" />
//                         </span>
//                     ) : (
//                         ""
//                     )}
//                 </p>
//             </div>
//             <div className="flex items-center">
//                 <MdDelete
//                     onClick={() => deleteBooks(book.id)}
//                     className="w-6 h-6 text-rose-500 cursor-pointer"
//                 />
//             </div>
//         </div>
//     );
// }

// export default Card;

// import { useState, useContext } from "react";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { BookContext } from "../../context/BookContext";

// function Card({ book }) {
//     const { deleteBooks, updateBooks } = useContext(BookContext);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTitle, setEditedTitle] = useState(
//         book.details.title || book.title
//     );
//     const [editedSummary, setEditedSummary] = useState(book.summary || "");

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSave = (e) => {
//         e.preventDefault();
//         updateBooks(book.id, {
//             ...book,
//             details: {
//                 ...book.details,
//                 title: editedTitle,
//             },
//             summary: editedSummary,
//         });
//         setIsEditing(false);
//     };

//     return (
//         <div className="flex gap-10">
//             <div className="flex flex-col gap-3">
//                 <img
//                     src={book.details?.cover}
//                     alt="book_picture"
//                     className="h-35 w-35"
//                 />
//                 <p className="text-center font-bold bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
//                     {book.details?.author}
//                 </p>
//             </div>
//             <div className="flex flex-col gap-3 w-[70%]">
//                 {isEditing ? (
//                     <form onSubmit={handleSave} className="flex flex-col gap-2">
//                         <input
//                             type="text"
//                             value={editedTitle}
//                             onChange={(e) => setEditedTitle(e.target.value)}
//                             className="border rounded p-1"
//                         />
//                         <textarea
//                             value={editedSummary}
//                             onChange={(e) => setEditedSummary(e.target.value)}
//                             className="border rounded p-1"
//                         />
//                         <button
//                             type="submit"
//                             className="self-start bg-indigo-500 text-white px-3 py-1 rounded"
//                         >
//                             Save
//                         </button>
//                     </form>
//                 ) : (
//                     <>
//                         <p className="font-bold text-2xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
//                             {book.details.title || book.title}
//                             <span className="inline-flex ml-1">
//                                 <FaRegEdit
//                                     className="w-5 h-5 text-lime-600 cursor-pointer"
//                                     onClick={handleEditClick}
//                                 />
//                             </span>
//                         </p>
//                         <p className="italic font-serif">
//                             {book.summary}
//                             {book.summary && (
//                                 <span className="inline-flex ml-1">
//                                     <FaRegEdit
//                                         className="text-lime-600 cursor-pointer"
//                                         onClick={handleEditClick}
//                                     />
//                                 </span>
//                             )}
//                         </p>
//                     </>
//                 )}
//             </div>
//             <div className="flex items-center">
//                 <MdDelete
//                     onClick={() => deleteBooks(book.id)}
//                     className="w-6 h-6 text-rose-500 cursor-pointer"
//                 />
//             </div>
//         </div>
//     );
// }

// export default Card;

// import { useState, useContext } from "react";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { BookContext } from "../../context/BookContext";

// function Card({ book, editingId, setEditingId }) {
//     const { deleteBooks, updateBooks } = useContext(BookContext);
//     const isEditing = book.id === editingId;

//     const [editBook, setEditBook] = useState({
//         title: book.details.title || book.title,
//         summary: book.summary || "",
//     });

//     const { title, summary } = editBook;

//     function handleChange(e) {
//         setEditBook((prevState) => {
//             return {
//                 ...prevState,
//                 [e.target.name]: e.target.value,
//             };
//         });
//     }

//     const handleEditClick = () => {
//         setEditingId(book.id);
//         setEditedTitle(book.details.title || book.title);
//         setEditedSummary(book.summary || "");
//     };

//     const handleSave = (e) => {
//         e.preventDefault();
//         updateBooks(book.id, editBook);
//         // Stay in edit mode after saving
//     };

//     return (
//         <div className="flex gap-10">
//             <div className="flex flex-col gap-3">
//                 <img
//                     src={book.details?.cover}
//                     alt="book_picture"
//                     className="h-35 w-35"
//                 />
//                 <p className="text-center font-bold bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
//                     {book.details?.author}
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 w-[70%]">
//                 {isEditing ? (
//                     <form onSubmit={handleSave} className="flex flex-col gap-2">
//                         <input
//                             type="text"
//                             value={title}
//                             name="title"
//                             onChange={handleChange}
//                             className="border rounded p-1"
//                         />
//                         <textarea
//                             value={summary}
//                             name="summary"
//                             onChange={handleChange}
//                             className="border rounded p-1"
//                         />
//                         <div className="flex gap-2">
//                             <button
//                                 type="submit"
//                                 className="bg-indigo-500 text-white px-3 py-1 rounded"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setEditingId(null)}
//                                 className="bg-gray-300 text-black px-3 py-1 rounded"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 ) : (
//                     <>
//                         <p className="font-bold text-2xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
//                             {book.details.title || book.title}
//                             {!book.summary &&
//                                 (editingId === null ||
//                                     editingId === book.id) && (
//                                     <span className="inline-flex ml-1">
//                                         <FaRegEdit
//                                             className="w-5 h-5 text-lime-600 cursor-pointer"
//                                             onClick={handleEditClick}
//                                         />
//                                     </span>
//                                 )}
//                         </p>
//                         <p className="italic font-serif">
//                             {book.summary}
//                             {book.summary &&
//                                 (editingId === null ||
//                                     editingId === book.id) && (
//                                     <span className="inline-flex ml-1">
//                                         <FaRegEdit
//                                             className="text-lime-600 cursor-pointer"
//                                             onClick={handleEditClick}
//                                         />
//                                     </span>
//                                 )}
//                         </p>
//                     </>
//                 )}
//             </div>

//             <div className="flex items-center">
//                 <MdDelete
//                     onClick={() => deleteBooks(book.id)}
//                     className="w-6 h-6 text-rose-500 cursor-pointer"
//                 />
//             </div>
//         </div>
//     );
// }

// export default Card;

import { useState, useContext, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BookContext } from "../../context/BookContext";

function Card({ book, editingId, setEditingId }) {
    const { deleteBooks, updateBooks } = useContext(BookContext);
    const isEditing = book.id === editingId;

    const [editBook, setEditBook] = useState({
        title: book.details?.title || book.title,
        summary: book.summary || "",
    });

    const { title, summary } = editBook;

    // Reset edit fields when switching books
    useEffect(() => {
        if (isEditing) {
            setEditBook({
                title: book.details?.title || book.title,
                summary: book.summary || "",
            });
        }
    }, [isEditing, book]);

    function handleChange(e) {
        const { name, value } = e.target;
        setEditBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleEditClick = () => {
        setEditingId(book.id);
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateBooks(book.id, editBook);
        setEditingId(null); // Exit edit mode after save
    };

    return (
        <div className="flex gap-10">
            <div className="flex flex-col gap-3">
                <img
                    src={book.details?.cover}
                    alt="book_picture"
                    className="h-35 w-35"
                />
                <p className="text-center font-bold bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
                    {book.details?.author}
                </p>
            </div>

            <div className="flex flex-col gap-3 w-[70%]">
                {isEditing ? (
                    <form onSubmit={handleSave} className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={title}
                            name="title"
                            onChange={handleChange}
                            className="border-2 border-indigo-500 outline-0 rounded p-1"
                        />
                        <textarea
                            value={summary}
                            name="summary"
                            onChange={handleChange}
                            className="border-2 border-indigo-500 outline-0 rounded p-1"
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="bg-gray-300 hover:bg-gray-100 text-black px-3 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="font-bold text-2xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                            {book.details?.title || book.title}
                            {!book.summary &&
                                (editingId === null ||
                                    editingId === book.id) && (
                                    <span className="inline-flex ml-1">
                                        <FaRegEdit
                                            className="w-5 h-5 text-lime-600 cursor-pointer"
                                            onClick={handleEditClick}
                                        />
                                    </span>
                                )}
                        </p>
                        {book.summary && (
                            <p className="italic font-serif">
                                {book.summary}
                                {(editingId === null ||
                                    editingId === book.id) && (
                                    <span className="inline-flex ml-1">
                                        <FaRegEdit
                                            className="text-lime-600 cursor-pointer"
                                            onClick={handleEditClick}
                                        />
                                    </span>
                                )}
                            </p>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center">
                <MdDelete
                    onClick={() => deleteBooks(book.id)}
                    className="w-6 h-6 text-rose-500 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Card;
