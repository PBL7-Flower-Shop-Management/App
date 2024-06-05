import React, { createContext, useContext, useState } from "react";
import Cart from "../Pages/Components/Cart";
import { PopupContext } from "./PopupContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { setVisible } = useContext(PopupContext);
    const [cartVisible, setCartVisible] = useState(false);

    return (
        <CartContext.Provider
            value={{
                cartVisible,
                setCartVisible,
            }}
        >
            <Cart
                visible={cartVisible}
                closeModal={() => setCartVisible(false)}
                onNavigateToLogin={() => {
                    setCartVisible(false);
                    setVisible(true);
                }}
            />
            {children}
        </CartContext.Provider>
    );
};
