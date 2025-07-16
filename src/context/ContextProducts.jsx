import { createContext } from "react";
import useProducts from "../customHooks/useProducts";

export const ContextProducts = createContext();

export function ContextProductsProvider({children}) {


    const {products, 
        setProducts, 
        search, 
        setSearch, 
        category, 
        setCategory,
        getProducts,
        favourites,
        setFavourites,
        toggleFavourites,
    } = useProducts();

    return (
        <ContextProducts.Provider value={{products, setProducts, search, setSearch, category, setCategory, getProducts, favourites, setFavourites, toggleFavourites}}>
            {children}
        </ContextProducts.Provider>
    )
}

