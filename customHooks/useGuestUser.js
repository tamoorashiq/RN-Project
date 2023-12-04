import React, { createContext, useContext, useState } from "react";

const GuestUserContext = createContext();

export const GuestUserProvider = ({ children }) => {
  const [isGuestUser, setIsGuestUser] = useState(false);

  const setGuestUser = (value) => {
    setIsGuestUser(value);
  };

  return (
    <GuestUserContext.Provider value={{ isGuestUser, setGuestUser }}>
      {children}
    </GuestUserContext.Provider>
  );
};

export const useGuestUser = () => useContext(GuestUserContext);
