import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";

export const AccountPostList = (props) => {
    const [post, setPost] = useState([])
    
    const { getFilteredPost } = useContext(PostContext)

    useEffect(() => {
        const fetchFilteredPosts = async () => {
            try {
                const retrievedInfo = await getFilteredPost(props.name);
                setPost(retrievedInfo);
            } catch (err) {
                console.log(err);
                window.alert('Failed to retrieve posts. Error: ' + err);
            }
        }
        fetchFilteredPosts();
    }, [props.name]);

    return (
        <>
        <h4>Your messages</h4>
        {post.map((post) => (
            <div key={post.id}>
                <Card className="align-self-start w-75">
                    <Card.Body>
                        <Card.Title>{post.name}</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        ))}
        </>
    )
}