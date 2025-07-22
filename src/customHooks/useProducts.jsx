import { useState, useEffect, useReducer} from "react";
import productsReducer from "../reducers/productsReducer";

function useProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [characteristics, setCharacteristics] = useState([]);

    const [favourites, setFavourites] = useState(() => {
        const storedValue = localStorage.getItem('favourites');
        return storedValue ? JSON.parse(storedValue) : [];
       
    });

    const [state, dispatch] = useReducer(productsReducer, []);
    // const [state2, dispatch2] = useReducer(productsReducer, []);

    function toggleFavourites(p) {

        if (favourites.some(f => f.id === p.id)) {
            setFavourites(favourites.filter(f => f.id !== p.id));
            return
        }
        setFavourites([...favourites, p]);
        console.log(favourites);
    }


        useEffect(() => {
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }, [favourites])

    const getProducts = async (search, category) => {
        try {
            const promise = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTS}?search=${search}&category=${category}`);

            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            let data = await promise.json();

            setProducts(data);
            console.log(products);
            console.log(data);
            return data;

        } catch (e) {
            console.error(e)
            return null;
        }
    }


    const getCharacteristics = async () =>{
        try{
            const promise = await fetch('http://localhost:3001/characteristics');
            if(!promise.ok){
                throw new Error(promise.status + promise.statusText)
            }

            const result = await promise.json();
            console.log(result);
            setCharacteristics(result);
            return result
        }catch(e){
            console.error(e)
            return null;
        }
    }

    const deleteProduct = async (p) => {
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
            if(!data1.success || !data2.success){
                throw new Error(`Errore nella cancellazione: ${data1.message}, ${data2.message}`);
            }

            dispatch({ type: 'DELETE_PRODUCT', payload: p.id });
            dispatch({ type: 'DELETE_CHAR', payload: p.id });
            // setProducts(products.filter(p => p.id !== data1.product.id));
            // setCharacteristics(characteristics.filter(c => c.id !== p.id));
            
            return [data1, data2];

        } catch (e) {
            console.error("Errore nella deleteProduct:", e);
            return null;
        }
    }

    const modifyProduct = async (finalProduct, finalChar) => {
        try {
            const promise = await fetch(`http://localhost:3001/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalProduct)
            });

            const promise2 = await fetch(`http://localhost:3001/characteristics/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalChar)
            });

            if (!promise.ok) throw new Error(`Prodotto: ${promise.status} ${promise.statusText}`);
            if (!promise2.ok) throw new Error(`Caratteristiche: ${promise2.status} ${promise2.statusText}`);

            const [productRes, charRes] = await Promise.all([promise, promise2]);
            const productData = await productRes.json();
            const charData = await charRes.json();

            // setProducts(prev => prev.map(p => p.id === productData.product.id ? productData.product : p));
            // setCharacteristics(prev => prev.map(c => c.id === charData.characteristic.id ? charData.characteristic : c));

            dispatch({ type: 'UPDATE_PRODUCT', payload: productData.product });
            dispatch({ type: 'UPDATE_CHAR', payload: charData.characteristic });
            return [productData, charData];

        } catch (e) {
            console.error(e);
        }
    }


    return {
        products,
        setProducts,
        search,
        setSearch,
        category,
        setCategory,
        getProducts,
        favourites,
        setFavourites,
        toggleFavourites,
        characteristics,
        getCharacteristics,
        setCharacteristics,
        deleteProduct,
        modifyProduct
    }

}

export default useProducts;