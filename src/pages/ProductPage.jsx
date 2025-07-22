import { useState, useEffect, useContext, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ContextProducts } from "../context/ContextProducts";
import { ModifyProductForm } from "../components/ModifyProductForm";
import productsReducer from "../reducers/productsReducer";

export function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [char, setChar] = useState(null);
    const [productCompaire, setProductCompaire] = useState(null);
    const [charCompaire, setCharCompaire] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState('');
    const [modifyForm, setModifyForm] = useState(false);

    const {
        favourites,
        toggleFavourites,
        getProducts,
        products,
        characteristics,
        search,
        // setProducts,
        // setCharacteristics
    } = useContext(ContextProducts);

    const filterCategory = products.filter((p) => p.category === product?.category);

    const [state, dispatch] = useReducer(productsReducer, {
        products,
        characteristics
    });

    const isFavourite = product && product.id
        ? favourites.some((f) => f.id === product.id)
        : false;

    useEffect(() => {
        getPost(id);
    }, [id]);

    useEffect(() => {
        if (product?.category) {
            getProducts(search, product.category);
        }
    }, [product]);

    async function getPost(id) {
        try {
            const [productRes, charRes] = await Promise.all([
                fetch(`http://localhost:3001/products/${id}`),
                fetch(`http://localhost:3001/characteristics/${id}`)
            ]);
            
            if (productRes.status === 404 || charRes.status === 404) {
                navigate("/products/not-found");
                return;
            }
            if (!productRes.ok || !charRes.ok) {
                throw new Error("Errore nel recupero dei dati");
            }

            const productData = await productRes.json();
            const charData = await charRes.json();

            setProduct(productData.product);
            setChar(charData.characteristic);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteProduct(p) {
        try {
            const [res1, res2] = await Promise.all([
                fetch(`http://localhost:3001/products/${p.id}`, { method: 'DELETE' }),
                fetch(`http://localhost:3001/characteristics/${p.id}`, { method: 'DELETE' }),
            ]);

            if (!res1.ok || !res2.ok) {
                throw new Error("Errore nella cancellazione");
            }

            dispatch({ type: 'DELETE_PRODUCT', payload: p.id });

            navigate('/products');
        } catch (e) {
            console.error("Errore nella deleteProduct:", e);
        }
    }

    async function handleSelect(e) {
        const selectedId = e.target.value;
        setSelected(selectedId);

        if (!selectedId) return;

        try {
            const [productRes, charRes] = await Promise.all([
                fetch(`http://localhost:3001/products/${selectedId}`),
                fetch(`http://localhost:3001/characteristics/${selectedId}`),
            ]);

            const productData = await productRes.json();
            const charData = await charRes.json();

            setProductCompaire(productData.product);
            setCharCompaire(charData.characteristic);
        } catch (e) {
            console.error(e);
        }
    }

    if (!product) {
        navigate("/products/not-found");
        return;
    }

    return (
        <div className="bg-light">
            <div className="container d-flex justify-content-center flex-wrap">
                <div className="mb-2 col-12 d-flex justify-content-between">
                    <button className="btn btn-primary go-back px-5" onClick={() => navigate(-1)}>
                        <i className="bi bi-box-arrow-left"></i>
                    </button>
                    <div>
                        <i
                            className={`bi ${isFavourite ? 'bi-star-fill text-warning' : 'bi-star'} pointer fs-3`}
                            onClick={() => toggleFavourites(product)}
                        ></i>
                    </div>
                </div>

                <div className="mt-4 mb-2 col-12">
                    <p className="card-text fs-2 text-center"> {product?.description}</p>
                </div>

                <div className="card h-100 shadow-sm w-75 col-12">
                    {product?.images?.[0] && (
                        <div className="position-relative card-img-top immagine-top">
                            <img
                                src={`http://localhost:3001/img/${product.category}/${product.images[currentIndex]}`}
                                className="immagine-top-card"
                                alt={product.title}
                            />
                            <span
                                className="text-black position-absolute next"
                                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, product.images.length - 1))}
                            >
                                <i className="bi bi-caret-right-square-fill icons fs-2"></i>
                            </span>
                            <span
                                className="text-black position-absolute prev"
                                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            >
                                <i className="bi bi-caret-left-square-fill icons fs-2"></i>
                            </span>
                        </div>
                    )}

                    <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="card-title">{product?.title}</h5>
                                <p className="badge bg-info text-dark mb-3">{product?.category}</p>
                            </div>
                            <button className="btn btn-success px-2" onClick={() => setModifyForm(!modifyForm)}>
                                <i className="bi bi-pencil-square fs-4"></i>
                            </button>
                        </div>

                        <p className="card-text fst-italic">
                            {product?.discount ? (
                                <>
                                    <span className="text-decoration-line-through text-secondary me-2">
                                        €{product.price.toFixed(2)}
                                    </span>
                                    <span className="text-danger">
                                        €{(product.price * (1 - product.discount / 100)).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <>€{product?.price?.toFixed(2)}</>
                            )}
                        </p>

                        {modifyForm ? (
                            <ModifyProductForm
                                product={product}
                                char={char}
                                setProduct={setProduct}
                                getPost={getPost}
                            />
                        ) : (
                            <button className="btn btn-danger" onClick={() => deleteProduct(product)}>
                                Delete product
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <label htmlFor="selectCompare">Select a product to compare</label>
                <select
                    className="form-select"
                    name="selectCompare"
                    value={selected}
                    onChange={handleSelect}
                >
                    <option value="">Select a product</option>
                    {filterCategory.map((p) => {
                        return (
                            <option key={p.id} value={p.id}>
                                {p.title}
                            </option>
                        );
                    })
                    }
                </select>
            </div>

            <div className="container py-5 mt-4">
                {selected === '' ? (
                    char && char.info ? (
                        <>
                            <h3>{char.title}</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Display:</b> {char.info.display}</li>
                                <li className="list-group-item"><b>Processor:</b> {char.info.processor}</li>
                                <li className="list-group-item"><b>RAM:</b> {char.info.ram}</li>
                                <li className="list-group-item"><b>Storage:</b> {char.info.storage}</li>
                                <li className="list-group-item"><b>Battery:</b> {char.info.battery}</li>
                                <li className="list-group-item"><b>Camera:</b> {char.info.camera}</li>
                            </ul>
                        </>
                    ) : (
                        <p>Nessun dettaglio disponibile</p>
                    )
                ) : product?.title === productCompaire?.title ? (
                    <div className="alert alert-danger" role="alert">
                        <strong>Attenzione!</strong> I prodotti selezionati sono uguali. Seleziona un altro prodotto.
                    </div>
                ) : (
                    <div className="d-flex justify-content-between flex-wrap mt-4">
                        {[{ p: product, c: char }, { p: productCompaire, c: charCompaire }].map(({ p, c }, i) => (
                            <div className="col-6" key={i}>
                                <h3>{p?.title}</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><b>Category:</b> {p?.category}</li>
                                    <li className="list-group-item"><b>Display:</b> {c?.info?.display}</li>
                                    <li className="list-group-item"><b>Processor:</b> {c?.info?.processor}</li>
                                    <li className="list-group-item"><b>RAM:</b> {c?.info?.ram}</li>
                                    <li className="list-group-item"><b>Storage:</b> {c?.info?.storage}</li>
                                    <li className="list-group-item"><b>Battery:</b> {c?.info?.battery}</li>
                                    <li className="list-group-item"><b>Camera:</b> {c?.info?.camera}</li>
                                    <li className="list-group-item"><b>Price:</b> {p?.price.toFixed(2)}€</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
