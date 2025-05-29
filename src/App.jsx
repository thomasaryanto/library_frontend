import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet"
import Home from "./pages/Home.jsx";
import AuthorsPage from "./pages/Author";
import BooksPage from "./pages/Book";
import MembersPage from "./pages/Member";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Helmet>
                    <title>SRIN Library - Thomas Ariyanto</title>
                </Helmet>
            </div>
            <div className="p-4 max-w-6xl mx-auto">
                <nav className="mb-6 flex gap-4">
                    <Link to="/" className="text-blue-600">Home</Link>
                    <Link to="/authors" className="text-blue-600">Authors</Link>
                    <Link to="/books" className="text-blue-600">Books</Link>
                    <Link to="/members" className="text-blue-600">Members</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/authors" element={<AuthorsPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/members" element={<MembersPage />} />
                </Routes>
            </div>
        </Router>
    );
}