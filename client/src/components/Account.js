import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AccountPostList } from "./AccountPostList";

export const Account = () => {
    let params = useParams();
    const [user, setUser] = useState({
        id: params.Id,
        username: "",
        country: "",
        gender: ""
    });

    let navigate = useNavigate();
    let { getUser, editUser } = useContext(UserContext);

    let { id, username, country, gender } = user

    useEffect(() => {
        if (id === undefined) return
        async function fetch() {
            await getUser(id).then((user) => setUser(user))
        }
        fetch();
    });

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    };

    function handleSubmit(event) {
        event.preventDefault();

        editUser(user).then(() => {
            window.alert('Profile has been updated');
            console.log(user);
        })
            .catch(err => {
                console.log(err);
                window.alert('Failed update profile. Error: ' + err);
            });
    };

    function logoutUser() {
        navigate('/login');
        localStorage.removeItem("authToken");
        window.location.reload();
    };
    
    return (
        <>
            <h2>Profile for {username}</h2>
            <Form className="align-self-start" onSubmit={handleSubmit}>
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
            <Form className="align-self-start" onSubmit={logoutUser}>
                <Button variant="danger" type="submit">Logout</Button>
            </Form>
            <AccountPostList name={user.username} />
        </>
    );
};