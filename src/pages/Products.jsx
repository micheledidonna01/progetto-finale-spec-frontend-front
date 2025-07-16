import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";
import { ContextProducts }from "../context/ContextProducts";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ProductCard } from "../components/ProductCard";
export function Products() {

    const {products, 
        setProducts, 
        search, 
        setSearch, 
        category, 
        setCategory, 
        getProducts,
        favourites,
        // setFavourites,
        toggleFavourites
    } = useContext(ContextProducts);
    const [ordered, setOrdered] = useState('');


    console.log(favourites);
    function handleSelect(e) {
        const selected = e.target.value; // <-- usa direttamente il valore dell'evento
        setOrdered(selected); // aggiorna comunque lo stato, per tenere traccia

        const copyProducts = [...products];

        if (selected === 'titleAz') {
            copyProducts.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        }

        if (selected === 'titleZa') {
            copyProducts.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        }

        if (selected === 'categoryAz') {
            copyProducts.sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()));
        }
        if (selected === 'categoryZa') {
            copyProducts.sort((a, b) => b.category.toLowerCase().localeCompare(a.category.toLowerCase()));
        }

        if (selected === '') {
            getProducts(search, category);
            return
        }

        setProducts(copyProducts); // aggiorna i prodotti ordinati
    }

    useEffect(() => {
        getProducts(search, category);
    }, [search, category])

    return <>

        <div className="container">
                <h1>Products</h1>
            <div className="d-flex justify-content-center w-100 gap-2">
                <div>
                    <select value={category} className="form-select" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="tablet">Tablet</option>
                        <option value="computer">Computer</option>
                        <option value="smartphone">Smartphone</option>
                    </select>
                </div>
                <div>
                    <input type="text"
                        placeholder="Search a Device"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div>
                    <select value={ordered} className="form-select" onChange={handleSelect}>
                        <option value="">Ordina per...</option>
                        <option value="titleAz">Title a-z/A-Z</option>
                        <option value="titleZa">Title z-a/Z-A</option>
                        <option value="categoryAz">Category a-z/A-Z</option>
                        <option value="categoryZa">Category z-a/Z-A</option>
                    </select>
                </div>
            </div>

            {products.length === 0 ? <h1>Nessun Dispositivo Trovato</h1> : 
                <div className="container my-2">
                    <div className="row row-cols-1 row-cols-lg-2 g-4">
                        {products.map((p, i) => ( <ProductCard key={i} p={p} isFavourite={favourites.some(f => f.id === p.id)} toggleFavourites={() =>toggleFavourites(p)}/>))}
                    </div>
                </div>
            }
        </div>
    </>

}