import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Header() {
    return (
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg navbar-dark container">
                <Link className="navbar-brand fw-bold" to="/">TechShop</Link>
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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products?category=smartphone">Smartphones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products?category=tablet">Tablets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products?category=computer">Computers</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Cerca prodotti..."
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="submit">Cerca</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}
