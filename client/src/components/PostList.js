import React from "react";
import { PostContext } from "../contexts/PostContext";
import { Card } from "react-bootstrap";

export const PostList = () => {
    return (
        <PostContext.Consumer>
            {
                ({ post }) => {
                    return <div>
                        {post.toReversed().map((p) => {
                            return (
                                <div key={p.id}>
                                    <Card className="align-self-start">
                                        <Card.Body>
                                            <Card.Title>{p.name}</Card.Title>
                                            <Card.Text>{p.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                }
            }
        </PostContext.Consumer>
    )
}