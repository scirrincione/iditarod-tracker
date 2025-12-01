import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ user: null, login: () => { }, logout: () => { }, updateUser: () => { } });


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // no user initially

  const fetchUserData = async (userData) => {
    if (!userData) return;
    console.log("Fetching user data for:", userData.email);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}record/`);
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

  const login = async (userData) => {
    const user = await fetchUserData(userData);
    setUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
    return;
  };

  const updateUser = async (updatedUser) => {
    try {
      let response;
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`${import.meta.env.VITE_SERVER_URL}record/${user?._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
      

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        return null;
      }
      else {
        setUser(updatedUser)
        return updatedUser;
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    }
  }

  const userValue = {
    user,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;