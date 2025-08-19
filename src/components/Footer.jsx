import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-dark text-white">
            <div className="container py-4">
                <div className="row text-center text-md-start">
                    <div className="col-md-4 mb-3">
                        <h5>TechShop</h5>
                        <p>
                            Vendiamo solo i migliori dispositivi tecnologici: smartphone, tablet e computer
                            delle migliori marche.
                        </p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Collegamenti utili</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/products" className="text-white text-decoration-none">Prodotti</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none">Contatti</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Contatti</h5>
                        <p>Email: support@techshop.it</p>
                        <p>Telefono: +39 0123 456789</p>

                        <h5 className="mt-4">Seguici</h5>
                        <div className="d-flex gap-3 justify-content-md-start justify-content-center mt-2">
                            <a href="https://facebook.com" className="text-primary fs-4" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" className="viola fs-4" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" className="text-info fs-4" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="https://linkedin.com" className="text-primary fs-4" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://youtube.com" className="text-danger fs-4" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="bg-secondary" />
                <p className="text-center mb-0">© {new Date().getFullYear()} TechShop. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}
