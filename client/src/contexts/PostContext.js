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

    return (
        <PostContext.Provider value={{
            post,
            getPost,
            addPost,
            editPost,
            deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    );
};