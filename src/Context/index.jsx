import { createContext, useState, useEffect } from "react";
import { useData } from "./data";
import { useInsignias } from './insignias';

export const FoodContext = createContext();

export const FoodProvider = ({children}) => {
    const { food } = useData({});
    const { insignias } = useInsignias({});
    
    return(
        <FoodContext.Provider
            value={{
                food,
                insignias,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};