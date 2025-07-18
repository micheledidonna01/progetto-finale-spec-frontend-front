import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <>
            <section className="bg-light py-5 text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold">Scopri la tecnologia del futuro</h1>
                    <p className="lead mt-3 mb-4">
                        Smartphone, tablet e PC: tutto ciò che desideri, in un unico posto.
                    </p>
                    <p className="mb-4 text-muted">
                        Esplora le ultime novità, confronta i modelli e trova il dispositivo perfetto per te.
                    </p>

                    <Link to={"/products"} className="btn btn-primary btn-lg">
                        Inizia lo shopping
                    </Link>

                    <div className="mt-5">
                        <h5 className="text-secondary">I nostri punti di forza</h5>
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mt-3 flex-wrap">
                            <li className="text-primary fw-semibold">✅ Prezzi competitivi</li>
                            <li className="text-success fw-semibold">🚀 Spedizione veloce</li>
                            <li className="text-danger fw-semibold">💬 Supporto dedicato</li>
                            <li className="text-warning fw-semibold">🔁 Confronta i prodotti</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="container py-5 text-white">
                <h2 className="mb-4 text-primary">Chi siamo</h2>
                <p className="lead">
                    TechShop è il tuo punto di riferimento per dispositivi tecnologici all'avanguardia.
                    Siamo specializzati nella vendita di smartphone, tablet e computer delle migliori marche.
                </p>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <h4>I nostri valori</h4>
                        <ul>
                            <li>Qualità garantita</li>
                            <li>Prezzi competitivi</li>
                            <li>Assistenza clienti dedicata</li>
                            <li>Spedizione rapida</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4>La nostra missione</h4>
                        <p>
                            Vogliamo offrire la miglior esperienza d'acquisto online per i prodotti tecnologici,
                            combinando convenienza, affidabilità e supporto continuo.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}