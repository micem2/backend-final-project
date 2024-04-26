import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const Account = () => {
    let params = useParams();
    const [user, setUser] = useState({
        id: params.Id,
        username: "",
        country: "",
        gender: ""
    });

    let { getUser } = useContext(UserContext);
    let navigate = useNavigate();
    let { id, username, country, gender } = user

    useEffect(() => {
        if (id === undefined) return
        async function fetch() {
            await getUser(id).then((user) => setUser(user))
        }
        fetch();
    })

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    };

    return (
        <>
        <h2>Account Profile for {username}</h2>
        <Form className="align-self-start">
            <Form.Group className="mb-3" >
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" name="country" value={country} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" name="gender" value={gender} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="success">Save</Button>
        </Form>
        </>
    );
};