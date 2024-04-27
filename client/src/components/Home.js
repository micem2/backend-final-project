import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";
import { UserContext } from "../contexts/UserContext";
import { Outlet } from "react-router-dom";
import { PostList } from "./PostList";

export const Home = () => {
    const [post, setPost] = useState({
        name: "",
        description: ""
    });

    const { getUsername } = useContext(UserContext);
    const { addPost } = useContext(PostContext);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const retrievedInfo = await getUsername();
                setPost({ name: retrievedInfo.decodedUsername });
            } catch (err) {
                console.log(err);
                window.alert('Failed to retrieve username. Error: ' + err);
            };
        };
    
        if (localStorage.getItem("authToken")) {
            fetchUsername();
        };
    }, [localStorage.getItem("authToken")]);

    function handleChange(event) {
        setPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        addPost(post)
            .catch(err => {
                console.log(err);
                window.alert('Failed to post. Error: ' + err);
            });
        setPost(prevPost => ({
            ...prevPost,
            description: ""
        }));
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>What's on your mind?</Form.Label>
                    <Form.Control as="textarea" type="text" name="description" value={post.description} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="success">Post</Button>
            </Form>
            <PostList />
        </>
    );
};