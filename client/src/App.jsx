import "./App.css";
import NavBar from "./components/layouts/NavBar";
import AppRoute from "./components/routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
            <BookProvider>
                <BrowserRouter>
                    <NavBar />
                    <AppRoute />
                </BrowserRouter>
            </BookProvider>
        </AuthProvider>
    );
}

export default App;
