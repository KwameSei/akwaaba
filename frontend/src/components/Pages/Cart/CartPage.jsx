import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart,
         decreaseQuantity,
         addItemToCart,
         clearCart,
         getTotals,
    } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import './CartStyle.css';

export const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    // Calling helper functions to handle the cart items
    const handleRemoveItem = (item) => {
        dispatch(removeItemFromCart(item));
    };

    const handleItemDecrease = (item) => {
        dispatch(decreaseQuantity(item));
    };

    const handleItemIncrease = (item) => {
        dispatch(addItemToCart(item));
    };

    const handleClearItems = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h2>Tickets You've Requested to Buy</h2>
            { cart.cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p> You currently do not have any ticket to buy</p>
                    <div className="start-shopping">
                        <Link to="/"> 
                            <span> <BsFillArrowLeftCircleFill /> Buy Ticket</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="item-title">Items</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart.cartItems.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="one-item">
                                    <img src={item.featuredImage} alt={item.title} />
                                    <div className="item-info">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <button onClick={() => handleRemoveItem(item)}>Remove</button>
                                    </div>
                                </div>
                                <div className="item-price">₵{item.cost}</div>
                                <div className="item-quantity">
                                    {/* Button to decrease item quantity in cart */}    
                                    <button onClick={() => handleItemDecrease(item)}>
                                        <span className="button-sign">-</span>
                                    </button>
                                        <div className="count">{item.cartQuantity}</div>
                                        {/* Button to add item to cart */}
                                    <button onClick={() => handleItemIncrease(item)}>
                                        <span className="button-sign">+</span>
                                    </button>
                                </div>
                                <div className="item-total">
                                    ₵{item.cost * item.cartQuantity}
                                </div>
                            </div> 
                        ))}
                    </div>
                    <div className="summary">
                        <button className="clear-cart" onClick={() => handleClearItems()}>
                            Clear Items
                        </button>
                        <div className="checkout">
                            <div className="subtotal">
                                <span>SUBTOTAL</span>
                                <span className="amount">₵{cart.cartTotalPrice}</span>
                                {console.log(cart.cartTotalPrice)}
                            </div>
                            <p>Taxes may apply to this</p>
                            <button className="checkout-btn">Buy</button>
                            <div className="start-shopping">
                                <Link to="/"> 
                                    <span> <BsFillArrowLeftCircleFill /> Buy More Tickets </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}