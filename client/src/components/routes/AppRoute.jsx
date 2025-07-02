import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import DashboardT from "../display/DashboardT";
// import NotFound from "../errors/NotFound";
import PrivateRoute from "./PrivateRoute";
import BookForm from "../display/BookForm";

function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardT />
                    </PrivateRoute>
                }
            />
            <Route
                path="/form"
                element={
                    <PrivateRoute>
                        <BookForm />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* <Route path="/form" element={<BookForm />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}

export default AppRoute;
