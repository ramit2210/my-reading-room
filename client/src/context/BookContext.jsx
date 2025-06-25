import { useReducer, createContext } from "react";
import api from "../utils/api";

const initialState = {
    books: [],
    filteredBooks: null,
    loading: true,
    error: null,
};

export const BookContext = createContext(initialState);

function bookReducer(state, action) {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                books: action.payload,
                filteredBooks: null,
                loading: false,
            };

        case "GET_FILTERED_BOOKS":
            return {
                ...state,
                loading: false,
                filteredBooks: action.payload,
            };

        case "ADD_BOOK":
            return {
                ...state,
                books: [...state.books, action.payload],
                loading: false,
            };

        case "UPDATE_BOOK":
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                ),
                filteredBooks: state.filteredBooks
                    ? state.filteredBooks.map((book) =>
                          book.id === action.payload.id ? action.payload : book
                      )
                    : false,
                loading: false,
            };

        case "DELETE_BOOK":
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
                filteredBooks: state.filteredBooks
                    ? state.filteredBooks.filter(
                          (book) => book.id !== action.payload
                      )
                    : null,
                loading: false,
            };

        case "CLEAR_FILTER":
            return {
                ...state,
                filteredBooks: null,
            };

        case "BOOK_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

export function BookProvider({ children }) {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    async function getBooks() {
        try {
            const books = await api.get("/books");
            dispatch({ type: "GET_BOOKS", payload: books.data });
        } catch (error) {
            dispatch({
                type: "BOOK_ERROR",
                payload:
                    error.response?.data?.message || "Failed to fetch books",
            });
        }
    }

    async function addBooks(bookData) {
        try {
            const newBook = await api.post("/books", bookData);
            dispatch({ type: "ADD_BOOK", payload: newBook.data });
        } catch (error) {
            dispatch({
                type: "BOOK_ERROR",
                payload:
                    error.response?.data?.message || "Failed to add book data",
            });
        }
    }

    async function filterBooks(filterType) {
        let queryParam = "";

        if (filterType === "asc" || filterType === "desc") {
            queryParam = `?sortingOrder=${filterType}`;
        } else if (filterType === "newest" || filterType === "oldest") {
            queryParam = `?dateOrder=${filterType}`;
        }

        const url = `/books/filter${queryParam ? queryParam : ""}`;
        try {
            const filteredBookDetails = await api.get(url);
            dispatch({
                type: "GET_FILTERED_BOOKS",
                payload: filteredBookDetails.data,
            });
        } catch (error) {
            dispatch({
                type: "BOOK_ERROR",
                payload:
                    error.response?.data?.message || "Failed to filter books",
            });
        }
    }

    async function updateBooks(updatedData) {
        try {
            const updatedBookDetails = await api.put(
                `/books/${bookId}`,
                updatedData
            );
            dispatch({
                type: "UPDATE_BOOK",
                payload: updatedBookDetails.data,
            });
        } catch (error) {
            dispatch({
                type: "BOOK_ERROR",
                payload:
                    error.response?.data?.message || "Failed to update books",
            });
        }
    }

    async function deleteBooks(bookId) {
        try {
            await api.delete(`/books/${bookId}`);
            dispatch({
                type: "DELETE_BOOK",
                payload: bookId,
            });
        } catch (error) {
            dispatch({
                type: "BOOK_ERROR",
                payload:
                    error.response?.data?.message || "Failed to delete book",
            });
        }
    }

    function clearFilter() {
        dispatch({ type: "CLEAR_FILTER" });
    }

    function clearError() {
        dispatch({ type: "CLEAR_ERROR" });
    }

    const contextValue = {
        books: state.books,
        filteredBooks: state.filteredBooks,
        loading: state.loading,
        error: state.error,
        getBooks,
        addBooks,
        filterBooks,
        updateBooks,
        deleteBooks,
        clearFilter,
        clearError,
    };
    return (
        <BookContext.Provider value={{ contextValue }}>
            {children}
        </BookContext.Provider>
    );
}
