import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ user: null, login: () => { }, logout: () => { } });


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // no user initially

  const fetchUserData = async (userData) => {
    if (!userData) return;
    console.log("Fetching user data for:", userData.email);
    const response = await fetch(`http://localhost:5050/record/`);
    if (!response.ok){
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const resJson = await response.json();
    const record = await resJson.find(entry => entry.email == userData.email);

    console.log("Fetched user data:", record);
    if (!record) {
      console.error('User not found');
      setUser(null);
      return;
    }
    if (record.password !== userData.password) {
      console.error('Invalid password');
      setUser(null);
      console.log('Invalid password');
      return;
    }
    return record;
  };

  const login = (userData) => {
    const user = fetchUserData(userData);
    setUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
    return;
  };

  const userValue = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;