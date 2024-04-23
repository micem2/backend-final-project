import React from "react";
import { Nav, Container, Stack, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";


export const SiteNavbar = () => {
    return (
        <>
            <Navbar bg="success" variant="dark">
                <Container fluid>
                        <Navbar.Brand href="/">Feeds</Navbar.Brand>
                        <Nav className="justify-content-end">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/settings" className="nav-link">Account</Link>
                        </Nav>
                </Container>
            </Navbar>
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet />
            </Stack>
        </>
    )
}