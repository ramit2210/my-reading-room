import "./App.css";
import NavBar from "./components/layouts/NavBar";
import AppRoute from "./components/routes/AppRoute";
import AuthProvider from "./context/AuthContext";
import BookProvider from "./context/BookContext";
import { BrowserRouter } from "react-router-dom";
import SearchProvider from "./context/SearchContext";

function App() {
    return (
        <div className="relative">
            <AuthProvider>
                <BookProvider>
                    <BrowserRouter>
                        <SearchProvider>
                            <NavBar />
                            <AppRoute />
                        </SearchProvider>
                    </BrowserRouter>
                </BookProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
