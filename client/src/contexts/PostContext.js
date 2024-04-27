import React, { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [post, setPost] = useState([]);
    const baseUrl = "http://localhost:3000/api/post";

    useEffect(() => {
        async function fetchData() {
            await getAllPost();
        }
        fetchData();
    }, []);

    function getAllPost() {
        return axios.get(baseUrl).then(response => setPost(response.data));
    };

    function getPost(id) {
        return axios.get(baseUrl + '/' + id).then(response =>
            new Promise((resolve) => resolve(response.data))
        );
    };

    function addPost(post) {
        let headers = {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        };

        return axios.post(baseUrl, post, { headers: headers })
        .then(response => {
            getAllPost();
            return new Promise(resolve => resolve(response.data));
        });
    };

    function editPost(post) {
        let headers = {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        };

        console.log(post);

        return axios.put(baseUrl + "/" + post._id, post, { headers: headers })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            });
    };

    function deletePost(post) {
        let headers = {
            Authorization: "Bearer " + localStorage.getItem('authToken')
        };

        return axios.delete(baseUrl + "/" + post._id, { headers: headers }).then(response =>
            new Promise((resolve) => resolve(response.data))
        );
    };

    // I know using post for this is not ideal. I plan to fix this later.
    function getFilteredPost(name) {
        console.log(name)
        let myHeaders = {
            name: name
        };

        return axios.post(baseUrl + '/filter', myHeaders)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    }

    return (
        <PostContext.Provider value={{
            post,
            getPost,
            addPost,
            editPost,
            deletePost,
            getFilteredPost
        }}>
            {props.children}
        </PostContext.Provider>
    );
};