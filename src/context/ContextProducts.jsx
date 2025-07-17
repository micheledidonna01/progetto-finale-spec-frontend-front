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
        characteristics,
        setCharacteristics,
        getCharacteristics
    } = useProducts();

    return (
        <ContextProducts.Provider value={{products, 
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
                                        setCharacteristics,
                                        getCharacteristics
                                        }}>
            {children}
        </ContextProducts.Provider>
    )
}

