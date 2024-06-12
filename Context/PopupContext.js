import React, { createContext, useEffect, useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <PopupContext.Provider
            value={{
                visible,
                setVisible,
            }}
        >
            {children}
        </PopupContext.Provider>
    );
};
