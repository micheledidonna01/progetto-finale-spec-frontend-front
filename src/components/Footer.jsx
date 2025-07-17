export function Footer() {
    return (
        <footer className="bg-dark text-white ">
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
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/products" className="text-white text-decoration-none">Prodotti</a></li>
                            <li><a href="/contatti" className="text-white text-decoration-none">Contatti</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Contatti</h5>
                        <p>Email: support@techshop.it</p>
                        <p>Telefono: +39 0123 456789</p>
                    </div>
                </div>
                <hr className="bg-secondary" />
                <p className="text-center mb-0">© {new Date().getFullYear()} TechShop. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}
