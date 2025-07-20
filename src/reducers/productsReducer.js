export default function productsReducer(state, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload.product],
                characteristics: [...state.characteristics, action.payload.characteristic],
            };

        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload),
                characteristics: state.characteristics.filter(c => c.id !== action.payload),
            };


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
