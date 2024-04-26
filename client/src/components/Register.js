import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const Register = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ gender, setGender ] = useState("");

    let { registerUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        
        registerUser(username, password, country, gender).then(() => {
            window.alert('Thank you for registering. Please log in to use the account.');
            navigate('/login');
        }).catch(err => {
            console.log(err);
            window.alert('Registeration failed. Error: ' + err);
        });
    };

    return (
        <Form className="align-self-start" onSubmit={handleSubmit}>
            <h3>Registeration</h3>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" name="country" value={country} onChange={e => setCountry(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" name="gender" value={gender} onChange={e => setGender(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="success">Register</Button>
        </Form>
    )
};
