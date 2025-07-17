import { useState, useEffect} from "react";

function useProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [characteristics, setCharacteristics] = useState([]);

    const [favourites, setFavourites] = useState(() => {
        const storedValue = localStorage.getItem('favourites');
        return storedValue ? JSON.parse(storedValue) : [];
    });

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
        setCharacteristics
    }

}

export default useProducts;