import { useCallback, useContext, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";
import { ContextProducts }from "../context/ContextProducts";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductCard from "../components/ProductCard";
import React from "react";


//funzione di debounce che permette il ritardo della callback function che viene passata 
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}


function Products() {

    // uso del context da cui prendo ciò che mi serve per il componente
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

    // funzione per ordinare i prodotti
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

    // funzione useCallback che se l'argomento cambia ritorna una nuova funzione con il nuovo argomento
    const debounceSearch = useCallback(debounce((value) => {
        setSearch(value)
    }, 500), []);

    // al montaggio del componente chiamo la funzione per ottenere i prodotti
    useEffect(() => {
        getProducts(search, category);
    
    }, [search, category])

    // variabile di riferimento per lo scroll
    const scroll = useRef(null);

    // funzione di scroll
    const handleScroll = () => {
        
        scroll.current.scrollIntoView({ behavior: 'smooth'});
    }

    return <>
        <div className="">
            <img src="../../public/sfondo.png" alt="copertina" className="copertina"/>
        </div>
        <div className="container">
            <section className="bg-light py-5 text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold">Scopri la tecnologia del futuro</h1>
                    <p className="lead mt-3 mb-4">
                        Smartphone, tablet e PC: tutto ciò che desideri, in un unico posto.
                    </p>
                    <p className="mb-4 text-muted">
                        Esplora le ultime novità, confronta i modelli e trova il dispositivo perfetto per te.
                    </p>

                    <button onClick={() => handleScroll()} className="btn btn-primary btn-lg">
                        Inizia lo shopping
                    </button>

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
                <h1 className="pt-5 fsx-3 text-center text-white">Products</h1>
            <div className="d-flex justify-content-center w-100 gap-2 flex-wrap">
                <div className="col-12 col-md-4 col-lg-3">
                    <select value={category} className="form-select" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="tablet">Tablet</option>
                        <option value="computer">Computer</option>
                        <option value="smartphone">Smartphone</option>
                    </select>
                </div>
                <div className="col-12 col-md-4 col-lg-3">
                    <input type="text"
                        placeholder="Search a Device"
                        
                        defaultValue={search}
                        onChange={(e) => debounceSearch(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="col-12 col-md-4 col-lg-3">
                    <select value={ordered} className="form-select" onChange={handleSelect} ref={scroll}>
                        <option value="">Ordina per...</option>
                        <option value="titleAz">Title a-z/A-Z</option>
                        <option value="titleZa">Title z-a/Z-A</option>
                        <option value="categoryAz">Category a-z/A-Z</option>
                        <option value="categoryZa">Category z-a/Z-A</option>
                    </select>
                </div>
            </div>

            {products.length === 0 ? <h1 className="text-white py-5 text-center">Nessun Dispositivo Trovato</h1> : 
                <div className=" mt-2 py-2"  >
                    <div className="row">
                        {products.map((p, i) => ( <ProductCard key={i} p={p} isFavourite={favourites.some(f => f.id === p.id)} toggleFavourites={() =>toggleFavourites(p)}/>))}
                    </div>
                </div>
            }
        </div>
    </>

}

// Aggiungo il memo per ottimizzare il rendimento del componente Products
export default React.memo(Products); 