import React, { useContext, useEffect, useState } from "react";
import { Nav, Container, Stack, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


export const SiteNavbar = () => {
    const [userId, setUserId] = useState("");

    const { getUserId } = useContext(UserContext);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const retrievedInfo = await getUserId();
                setUserId(retrievedInfo.decodedId);
            } catch (err) {
                console.log(err);
            }
        };
    
        if (localStorage.getItem("authToken")) {
            fetchUserId();
        }
    }, [localStorage.getItem("authToken")]);

    return (
        <>
            <Navbar bg="success" variant="dark">
                <Container fluid>
                        <Navbar.Brand href="/">Feeds</Navbar.Brand>
                        <Nav className="justify-content-end">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to={"/account/" + userId} className="nav-link">Account</Link>
                        </Nav>
                </Container>
            </Navbar>
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet />
            </Stack>
        </>
    )
}