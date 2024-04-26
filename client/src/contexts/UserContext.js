import axios from "axios";
import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const apiBaseUrl = "http://localhost:3000/api/users";

    function registerUser(username, password, country, gender) {
        let credentials = { username, password, country, gender };

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

    function getUser(id) {
        return axios.get(apiBaseUrl + '/' + id).then(response =>
            new Promise((resolve) => resolve(response.data))
        );
    };

    function editUser(user) {
        let myHeaders = {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        };

        return axios.put(apiBaseUrl + '/' + user._id, user, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    };

    function getUsername() {
        let myHeaders = {
            token: localStorage.getItem('authToken')
        };

        return axios.post(apiBaseUrl + '/finduser', myHeaders)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    };

    function getUserId() {
        let myHeaders = {
            token: localStorage.getItem('authToken')
        };

        return axios.post(apiBaseUrl + '/findid', myHeaders)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    };


    return (
        <UserContext.Provider value={{
            registerUser,
            loginUser,
            getUser,
            editUser,
            getUsername,
            getUserId
        }}>
            {props.children}
        </UserContext.Provider>
    );
};