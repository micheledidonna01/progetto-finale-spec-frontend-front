import { Link } from "react-router-dom";


export function ProductCard({ products }) {
    return (
        <div className="container my-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map((p, i) => (
                    <div key={i} className="col">
                        <div className="card h-100 shadow-sm">
                            {p.images?.[0] && (
                                <img src={p.images[0]} className="card-img-top" alt={p.title} />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{p.title}</h5>
                                {p.price != null && (
                                    <p className="card-text fst-italic">
                                        {p.discount
                                            ? <>
                                                <span className="text-decoration-line-through text-secondary me-2">
                                                    €{p.price.toFixed(2)}
                                                </span>
                                                <span className="text-danger">
                                                    €{(p.price * (1 - p.discount / 100)).toFixed(2)}
                                                </span>
                                            </>
                                            : <>€{p.price.toFixed(2)}</>
                                        }
                                    </p>
                                )}
                                <p className="badge bg-info text-dark align-self-start mb-3">
                                    {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                                </p>
                                <Link to={`/products/${encodeURIComponent(p.title)}`} className="mt-auto btn btn-primary w-100">
                                    Dettagli
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
