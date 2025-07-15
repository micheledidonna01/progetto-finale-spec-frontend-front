import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";


export function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [ordered, setOrdered] = useState('');

    
    async function fetchProducts(){

        try {
            const promise = await fetch(`http://localhost:3001/products?search=${search}&category=${category}`);

            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            const data = await promise.json();
            console.log(data);

            const filterData = [...data];

            console.log(filterData);
            setProducts(filterData);
            return filterData;

        } catch (e) {
            console.error(e)
            return null;
        }

    }

    
    function handleSelect(e) {
        const selected = e.target.value; // <-- usa direttamente il valore dell'evento
        setOrdered(selected); // aggiorna comunque lo stato, per tenere traccia

        const copyProducts = [...products];

        if (selected === 'titleAz') {
            copyProducts.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (selected === 'titleZa') {
            copyProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        if (selected === '') {
            fetchProducts();
            return
        }

        // Aggiungi qui altri ordinamenti se riattivi prezzo/discount

        setProducts(copyProducts); // aggiorna i prodotti ordinati
    }


        // if(ordered === 'priceAsc'){
        //     const sorted = [...products].sort((a, b) => a.price - b.price);
        //     setProducts(sorted);
        // }
        // if(ordered === 'priceDesc'){
        //     const sorted = [...products].sort((a, b) => b.price - a.price);
        //     setProducts(sorted);
        // }
        // if(ordered === 'discountAsc'){
        //     const sorted = [...products].sort((a, b) => a.discount - b.discount);
        //     setProducts(sorted);
        // }
        // if(ordered === 'discountDesc'){
        //     const sorted = [...products].sort((a, b) => b.discount - a.discount);
        //     setProducts(sorted);
        // }




    useEffect(() => {
        fetchProducts()
    }, [search, category])

    return <>
        <div className="container">
            <div className="d-flex justify-content-between">
                <h1>Products</h1>
                <div>
                    <input type="text"
                        placeholder="Search a Device"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                    />
                    <select value={category} className="form-select" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="tablet">Tablet</option>
                        <option value="computer">Computer</option>
                        <option value="smartphone">Smartphone</option>
                    </select>
                    <select value={ordered} className="form-select" onChange={handleSelect}>
                        <option value="">Ordina per...</option>
                        <option value="titleAz">Title a-z/A-Z</option>
                        <option value="titleZa">Title z-a/Z-A</option>
                    </select>
                </div>
            </div>

            {products.length === 0 ? <h1>Nessun Dispositivo Trovato</h1> : 
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
                                                            €
                                                            {p.price.toFixed(2)}
                                                            prezzo
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
                                        <Link to={`/products/${p.id}`} className="mt-auto btn btn-primary w-100">
                                            Dettagli
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    </>

}