//funzione reducer
export default function productsReducer(state, action) {
    //verifico il tipo di azione
    switch (action.type) {
        
        //aggiunta di un prodotto
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload.product],
                characteristics: [...state.characteristics, action.payload.characteristic],
            };

        //eliminazione di un prodotto
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload),
                characteristics: state.characteristics.filter(c => c.id !== action.payload),
            };

        //modifica di un prodotto
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === action.payload.id ? action.payload.product : p
                ),
                characteristics: state.characteristics.map(c =>
                    c.id === action.payload.id ? action.payload.characteristic : c
                ),
            };

        default:
            return state;
    }
}
