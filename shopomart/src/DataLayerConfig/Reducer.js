export const initialState = {
    basket: [],
    user: null
};

// Reducer
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = ( state, action ) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [ ...state.basket, action.item]     /* basket changed */
            };
        
        case 'REMOVE_FROM_BASKET':
            let index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            if( index >= 0 ){
                newBasket.splice(index, 1);
            } else {
                console.warn("Cannot remove product. Not in cart");
            }

            return {
                ...state,
                basket: newBasket     /* basket changed */
            };
        
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            };
        
        default:
            return state;
    }
};

export default reducer;

