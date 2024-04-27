import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export const EditPost = () => {
    let params = useParams();
    let [existingPost, setExistingPost] = useState({
        id: params.Id,
        name: "",
        description: ""
    })

    let { editPost, getPost, deletePost } = useContext(PostContext)
    let navigate = useNavigate();
    let { id, name, description } = existingPost;

    useEffect(() => {
        if (id === undefined) return
        async function fetch() {
            await getPost(id).then((post) => setExistingPost(post))
        }
        fetch();
    })

    function handleChange(event) {
        setExistingPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editPost(existingPost).then(() => {
            window.alert('Your post has been successfully saved');
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('Failed to edit post. Error: ' + error);
        });
    };

    function handleDelete() {
        navigate('/');
        deletePost(existingPost).then(() => {
            window.alert('Your post has been deleted');
        }).catch(error => {
            console.log(error);
            window.alert('Failed to delete post. Error: ' + error);
        });
    };

    return (
        <>
            <h2>Edit Post</h2>
            <Form className="align-self-start" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" type="text" name="description" value={description} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="success">Save</Button>
            </Form>
            <Form className="align-self-start" onSubmit={handleDelete}>
                <Button variant="danger" type="submit">Delete Post</Button>
            </Form>
        </>
    )
}