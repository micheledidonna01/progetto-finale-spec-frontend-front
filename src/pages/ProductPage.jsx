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

    const [product, setProduct] = useState(null);
    const [char, setChar] = useState(null);

    const [productCompaire, setProductCompaire] = useState(null);
    const [charCompaire, setCharCompaire] = useState(null);

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const { favourites, toggleFavourites, getProducts, products, search, setCharacteristics, setProducts, characteristics } = useContext(ContextProducts);

    const isFavourite = product && product.id
        ? favourites.some((f) => f.id === product.id)
        : false;

    console.log(product);

    const [selected, setSelected] = useState('');

    async function handleSelect(e) {
        const selected = e.target.value;
        setSelected(selected);

        if(selected !== ''){
            try{
                const promise = await fetch(`http://localhost:3001/products/${selected}`);
                const promise2 = await fetch(`http://localhost:3001/characteristics/${selected}`);

                if (!promise.ok) {
                    throw new Error(promise.status + ' ' + promise.statusText)
                }

                if (!promise2.ok) {
                    throw new Error(promise2.status + ' ' + promise2.statusText)
                }

                let [productRes, charRes] = await Promise.all([promise, promise2]);
                let productData = await productRes.json();
                let charData = await charRes.json();


                setProductCompaire(productData.product);
                setCharCompaire(charData.characteristic);
                console.log(productData.product, charData.characteristic);

                return [productData, charData];
            }catch(e){
                console.error(e)
                return null;
            }
        }


    }


    async function getPost(id) {

        try {
            const promise = await fetch(`http://localhost:3001/products/${id}`);
            const promise2 = await fetch(`http://localhost:3001/characteristics/${id}`);

            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }

            if (!promise2.ok) {
                throw new Error(promise2.status + ' ' + promise2.statusText)
            }

            let [productRes, charRes] = await Promise.all([promise, promise2]);
            let productData = await productRes.json();
            let charData = await charRes.json();


            setProduct(productData.product);
            setChar(charData.characteristic);
            console.log(productData.product, charData.characteristic);
            return [productData, charData];

        } catch (e) {
            console.error(e)
            return null;
        }
    }

    async function deleteProduct(p) {
        try {
            const [res1, res2] = await Promise.all([
                fetch(`http://localhost:3001/products/${p.id}`, {
                    method: 'DELETE'
                }),
                fetch(`http://localhost:3001/characteristics/${p.id}`, {
                    method: 'DELETE'
                })
            ]);

            if (!res1.ok || !res2.ok) {
                throw new Error(`Errore nella cancellazione: ${res1.status}, ${res2.status}`);
            }

            const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
            console.log("Deleted", data1, data2);
            // setProducts(products.filter(p => p.id !== data1.product.id));
            // setCharacteristics(characteristics.filter(c => c.id !== p.id));
            navigate(-1); // opzionale: torna indietro
            return [data1, data2];

        } catch (e) {
            console.error("Errore nella deleteProduct:", e);
            return null;
        }
    }


    useEffect(() => {
        getPost(id);
    }, [id]);

    useEffect(() => {
        if (product?.category) {
            getProducts(search, product.category);
        }
        
    }, [product]);


    return <>
    <div className="bg-light">

    
        <div className="container  d-flex justify-content-center flex-wrap ">

            <div className=" mb-2 col-12 d-flex justify-content-between">
                <div className="btn btn-primary go-back" onClick={() => navigate(-1)}> <i className="bi bi-box-arrow-left"></i> </div>
                <div className="">
                    <i className={` 
                            bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star'}
                         pointer fs-3 `}
                        onClick={() => toggleFavourites(product)}
                    >
                    </i>
                </div>
            </div>
            <div className="mt-4 mb-2">
                <p className="card-text fs-2 text-center"> {product?.description}</p>
            </div>

            <div className="card h-100 shadow-sm w-75">
                {product?.images?.[0] && (
                    <div className="position-relative">
                        <div className="card-img-top immagine-top ">
                            
                            <img src={`http://localhost:3001/img/${product?.category}/${product?.images[currentIndex]}`} className="immagine-top-card" alt={product.title} />
                            <span 
                            className="text-secondary position-absolute next"
                                onClick={() => setCurrentIndex(Math.min(currentIndex + 1, product.images.length - 1))}
                            >
                                next
                            </span>
                            <span 
                            className="text-secondary position-absolute prev" 
                            onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
                            >
                                prev
                            </span>
                        </div>

                    </div>
                )}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="badge bg-info text-dark align-self-start mb-3">{product?.category}</p>
                    {product?.price != null && (
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

                    <button className="btn btn-danger" onClick={() => deleteProduct(product)}>Delete product</button>
                </div>

            </div>


        </div>

        <div className="container">
            <label htmlFor="selectCompare">Select a product with which you want to compare</label>
            <select value={selected} onChange={handleSelect} className="form-select" name="selectCompare">
                <option value="">Select a product</option>
                {products.map((p, i) => <option key={i} value={p.id}>{p.title}</option>)}
            </select>
        </div>
                    {selected === '' ?(

                <div className="container py-5 mt-4" >
            {char  && char.info ? (
                <>
                    <h3>{char.title} </h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <span className="fw-bold">Display:</span> {char.info.display}</li>
                        <li className="list-group-item"> <span className="fw-bold">Processor:</span> {char.info.processor}</li>
                        <li className="list-group-item"> <span className="fw-bold">RAM:</span> {char.info.ram}</li>
                        <li className="list-group-item"> <span className="fw-bold">Storage:</span> {char.info.storage}</li>
                        <li className="list-group-item"> <span className="fw-bold">Battery:</span> {char.info.battery}</li>
                        <li className="list-group-item"> <span className="fw-bold">Camera:</span> {char.info.camera}</li>

                    </ul>
                </>
            ) : (
                <>
                    <p>Non ci sono Dettagli per questo prodotto</p>
                </>
            )}
        </div>

        ) : product?.title === productCompaire?.title ? (
            
            <div className="alert alert-danger container mt-4 " role="alert">
                
                    <strong>Attenzione!</strong>
                    <p>I prodotti che hai scelto sono uguali. <br /> 
                        Seleziona un altro prodotto 
                    </p>

                    </div>
        ) : (
                <div className="d-flex p-5">
                    <div className="container my-1" >
                        {char && char.info ? (
                            <>
                                <h3>{product?.title} </h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> <span className="fw-bold">Category:</span> {product?.category}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Display:</span> {char.info.display}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Processor:</span> {char.info.processor}</li>
                                    <li className="list-group-item"> <span className="fw-bold">RAM:</span> {char.info.ram}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Storage:</span> {char.info.storage}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Battery:</span> {char.info.battery}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Camera:</span> {char.info.camera}</li>

                                </ul>
                            </>
                        ) : (
                            <>
                                <p>Non ci sono Dettagli per questo prodotto</p>

                            </>
                        )}
                    </div>
                    <div className="container mt-1" >
                        {charCompaire && charCompaire.info ? (
                            <>
                                <h3>{productCompaire?.title} </h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> <span className="fw-bold">Category:</span> {productCompaire?.category}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Display:</span> {charCompaire.info.display}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Processor:</span> {charCompaire.info.processor}</li>
                                    <li className="list-group-item"> <span className="fw-bold">RAM:</span> {charCompaire.info.ram}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Storage:</span> {charCompaire.info.storage}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Battery:</span> {charCompaire.info.battery}</li>
                                    <li className="list-group-item"> <span className="fw-bold">Camera:</span> {charCompaire.info.camera}</li>

                                </ul>
                            </>
                        ) : (
                            <>
                                <p>Non ci sono Dettagli per questo prodotto</p>
                            </>
                        )}
                    </div>

                </div>

                    )}

        </div>
    </>
}
