import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ContextProducts } from "../context/ContextProducts";
export function ProductPage() {

    const { id } = useParams();

    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const { favourites, toggleFavourites } = useContext(ContextProducts);

    const isFavourite = favourites.some((f) => f.id === product.id);
    console.log(product);

    async function getPost(id) {

        try {
            const promise = await fetch(`http://localhost:3001/products/${id}`);

            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            let result = await promise.json();


            console.log(result);


            setProduct(result.product);
            return result;

        } catch (e) {
            console.error(e)
            return {};
        }
    }

    useEffect(() => {
        getPost(id);
    }, [id]);


    return <>
        
        <div className="container my-4 d-flex justify-content-center flex-wrap">

            <div className="my-3 col-12 d-flex justify-content-between">
                <div className="btn btn-primary go-back" onClick={() => navigate(-1)}> <i className="bi bi-box-arrow-left"></i> </div>
                <div className="">
                    <i className={` 
                            bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star'}
                         pointer fs-3 `}
                        onClick={() =>toggleFavourites(product)}
                    >
                    </i>
                </div>
            </div>
            <div className="mt-4 mb-2">
                <p className="card-text fs-2 text-center"> {product.description}</p>
            </div>

            <div className="card h-100 shadow-sm w-75">
                {product.images?.[0] && (
                    <div className="position-relative">
                        <div className="card-img-top ">
                            <img src={product.images[currentIndex]} className="card-img-top" alt={product.title} />
                            <span className="text-secondary position-absolute next" onClick={() => { setCurrentIndex(currentIndex + 1) }}> next </span>
                            <span className="text-secondary position-absolute prev" onClick={() => { setCurrentIndex(currentIndex - 1)}}> prev</span>
                        </div>

                    </div>
                )}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="badge bg-info text-dark align-self-start mb-3">Smartphone</p>
                    {product.price != null && (
                        <p className="card-text fst-italic">
                            {product.discount
                                ? <>
                                    <span className="text-decoration-line-through text-secondary me-2">
                                        €{product.price.toFixed(2)}
                                    </span>
                                    <span className="text-danger">
                                        €{(product.price * (1 - product.discount / 100)).toFixed(2)}
                                    </span>
                                </>
                                : <>€{product.price.toFixed(2)}</>
                            }
                        </p>
                    )}
                    <p className="badge bg-info text-dark align-self-start mb-3">
                        {/* {product.category.charAt(0).toUpperCase() + product.category.slice(1)} */}
                    </p>
                </div>

            </div>

        </div>
    
    </>
}
