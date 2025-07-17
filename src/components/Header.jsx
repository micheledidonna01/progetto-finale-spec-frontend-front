import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from "react";
import CanvasFavourites from "./CanvasFavourites";

export function Header() {

    const [openFavourites, setOpenFavorites] = useState(false);

    return (
        <header className="bg-dark text-white top-0 w-100 position-fixed">
            <nav className="navbar navbar-expand-lg navbar-dark container">
                <Link className="navbar-brand fw-bold px-4" to="/products">TechShop</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-4">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/add">Add Product</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="?category=tablet">Tablets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="?category=computer">Computers</Link>
                        </li> */}
                    </ul>

                    <button className="btn btn-primary mx-4" onClick={() => setOpenFavorites(true)}>Favourites</button>

                    <CanvasFavourites
                        isOpen={openFavourites}
                        onClose={() => setOpenFavorites(false)}

                    />

                    
                </div>
            </nav>
        </header>
    );
}
