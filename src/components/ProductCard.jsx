
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import React from "react";
function ProductCard({ p, isFavourite, toggleFavourites }) {


    return <>
        <div className="col-12 d-flex justify-content-center">

            <div className="card mb-3 shadow-sm w-100">
                <div className="row g-0">
                    <div className="col-md-4 div-image-top">
                        <img
                            src={`http://localhost:3001/img/${p?.category === "tablet" ? "tablet/tablet1.jpg" : p?.category === "computer" ? "computer/pc1.jpg" : "smartphone/phone1.jpg"}`}
                            className="img-fluid h-100 object-fit-cover rounded-start immagine-top-card"
                            alt={p?.title}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-8 position-relative">
                        <div className="card-body d-flex flex-column h-100">
                            <h5 className="card-title">{p.title}</h5>
                            <p className="badge bg-info text-dark align-self-start mb-3">
                                {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                            </p>
                            <p className="card-text fst-italic">Published on: {dayjs(p.createdAt).format('DD/MM/YYYY')}</p>
                            <Link to={`/products/${p.id}`} className="mt-auto btn btn-primary w-100">
                                Dettagli
                            </Link>
                            <i
                                className={`bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star'} position-absolute top-0 end-0 pointer fs-3 px-4 py-3`}
                                onClick={toggleFavourites}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>




        </div>

    </>
}

// Aggiungo il memo per evitare il re-render del componente se le props non cambiano
export default React.memo(ProductCard); 