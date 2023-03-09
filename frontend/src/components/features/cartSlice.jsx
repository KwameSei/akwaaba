import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`${state.cartItems[itemIndex].title} Ticket's Quantity Increased by 1`, {
                    position: 'top-center',
                });
            } else {
                const tempEvent = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempEvent);
            }
            // Adding cart items to the local storage to persist the cart items
            // even when the user refreshes the page
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        // Remove item from cart
        removeItemFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItems => cartItems.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            // Updating the local storage after removing an item from the cart
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.error(`${action.payload.title} Ticket Removed from Cart`, {
                position: 'top-center',
            });
        },
        // decreasing the quantity of an item in the cart
        decreaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(`${state.cartItems[itemIndex].title} Ticket's Quantity Decreased by 1`, {
                    position: 'top-center',
                });
                // Removing the item from the cart if the quantity is 0
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                );
                state.cartItems = nextCartItems;
                // Updating the local storage after removing an item from the cart
                // localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                toast.error(`${action.payload.title} Ticket Removed from Cart`, {
                    position: 'top-center',
                });
            }
            // Adding cart items to the local storage to persist the cart items
            // even when the user refreshes the page
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        // Clearing the cart
        clearCart(state) {
            state.cartItems = [];
            toast.error(`Space cleared of all tickets!`, {
                position: 'top-center',
            });
            // Updating the local storage after removing an item from the cart
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        // Calculating the total quantity of items in the cart
        getTotals(state, action) {
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem)=>{
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            },
            {
                total: 0,
                quantity: 0,
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalPrice = total;
        },
    },
});

export const { addItemToCart, removeItemFromCart, decreaseQuantity, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
