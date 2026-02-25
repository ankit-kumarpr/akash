import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        closeNavbar();
    };

    // ✅ Close navbar on click
    const closeNavbar = () => {
        const navbar = document.getElementById("navbarNav");
        if (navbar.classList.contains("show")) {
            navbar.classList.remove("show");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">

                <NavLink className="navbar-brand fw-bold" to="/dashboard" onClick={closeNavbar}>
                    Admin Panel
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blogs" onClick={closeNavbar}>
                                Blogs
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/portfolio" onClick={closeNavbar}>
                                Portfolio
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/career-list" onClick={closeNavbar}>
                                Career
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/team-list" onClick={closeNavbar}>
                                Team 
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin-contacts" onClick={closeNavbar}>
                                Contacts
                            </NavLink>
                        </li>

                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                                    Login
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
