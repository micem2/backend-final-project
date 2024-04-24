
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const Login = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    let { loginUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        
        loginUser(username, password).then(() => {
            navigate('/');
        }).catch(err => {
            console.log(err);
            window.alert('Login failed. Error: ' + err);
        });
    };

    return (
        <Form className="align-self-start" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit">Register</Button>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </Form>
    )
};
