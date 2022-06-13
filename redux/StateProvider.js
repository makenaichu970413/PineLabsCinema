import React, { createContext, useContext, useReducer } from "react";

// Progress the Data Layer
export const StateContext = createContext();

// Wrap our app component and provide Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
