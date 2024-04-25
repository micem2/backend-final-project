import React from "react";
import { PostContext } from "../contexts/PostContext";

export const PostList = () => {
    return (
        <PostContext.Consumer>
            {
                ({ post }) => {
                    return <div>
                        {post.map((p) => {
                            return (
                                <div key={p.id}>
                                    <h3>{p.name}</h3>
                                    <p>{p.description}</p>
                                </div>
                            )
                        })}
                    </div>
                }
            }
        </PostContext.Consumer>
    )
}