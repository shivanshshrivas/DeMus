import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";

function AuthPage() {
    const [isLogin, setIsLogin] = React.useState(true);

    const toggleAuth = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {isLogin ? "Login" : "Sign Up"}
            </Typography>
            {isLogin ? <Login /> : <Signup />}
            <Button onClick={toggleAuth}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </Button>
        </Container>
    );
}

export default AuthPage;