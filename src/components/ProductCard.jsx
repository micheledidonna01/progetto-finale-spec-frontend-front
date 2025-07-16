
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export function ProductCard({ p, isFavourite, toggleFavourites }){


    return <>
        <div className="col">
            <div className="card h-100 shadow-sm position-relative">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="badge bg-info text-dark align-self-start mb-3">
                        {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                    </p>
                    <p className="card-text fst-italic">Published on: {dayjs(p.createdAt).format('DD/MM/YYYY')} </p>
                    <Link to={`/${p.id}`} p={p} className="mt-auto btn btn-primary w-100">
                        Dettagli
                    </Link>
                    <div className="">
                        <i className={` 
                            bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star' }
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