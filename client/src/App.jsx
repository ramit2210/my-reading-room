import "./App.css";
import NavBar from "./components/layouts/NavBar";
import AppRoute from "./components/routes/AppRoute";
import AuthProvider from "./context/AuthContext";
import BookProvider from "./context/BookContext";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="relative">
            <AuthProvider>
                <BookProvider>
                    <BrowserRouter>
                        <NavBar />
                        <AppRoute />
                    </BrowserRouter>
                </BookProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
