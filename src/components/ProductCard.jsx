
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export function ProductCard({ p, isFavourite, toggleFavourites }) {


    return <>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className=" card h-100 shadow-sm w-75">
                <div className="card-img-top div-image-top">
                    <img src={`http://localhost:3001/img/${p?.category === "tablet" ? "tablet/tablet1.jpg" : p?.category === "computer" ? "computer/pc1.jpg" : "smartphone/phone1.jpg"}`} className="immagine-top-card" alt={p?.title} />
                </div>


                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="badge bg-info text-dark align-self-start mb-3">
                        {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                    </p>
                    <p className="card-text fst-italic">Published on: {dayjs(p.createdAt).format('DD/MM/YYYY')} </p>
                    <Link to={`/products/${p.id}`} p={p} className="mt-auto btn btn-primary w-100">
                        Dettagli
                    </Link>
                    <div className="">
                        <i className={` 
                            bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star'}
                        position-absolute top-0 end-0 pointer fs-3 px-4 py-3 `}
                            onClick={toggleFavourites}
                        >

                        </i>
                        {/* <i class="bi bi-star-fill"></i> */}
                    </div>
                </div>
            </div>



        </div>

    </>
}