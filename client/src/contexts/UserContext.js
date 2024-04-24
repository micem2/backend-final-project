import axios from "axios";
import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const apiBaseUrl = "http://localhost:3000/api/users";

    function registerUser(username, password) {
        let credentials = { username, password };

        return axios.post(apiBaseUrl, credentials)
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        });
    };

    function loginUser(username, password) {
        let credentials = { username, password };

        return axios.post(apiBaseUrl + '/login', credentials)
        .then(response => {
            localStorage.setItem('authToken', response.data.token)
            return new Promise(resolve => resolve(response.data));
        });
    };

    return (
        <UserContext.Provider value={{ registerUser, loginUser }}>
            { props.children }
        </UserContext.Provider>
    )
};