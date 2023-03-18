import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/authActions";
import './authStyle.css';
// import { Typography, Button, Form, Input } from "@mui/material";
// import { makeStyles } from "@emotion/styled";

export const SignIn = () => {
    // Creating the dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // Creating the helper function
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signIn(credentials));
        setCredentials({   // Clearing the form
            email: "",
            password: "",
        }); 
    };

    if (auth && auth.id) {
        navigate("/");
    }
    
    return (
        <div className="main">
            <h3>Sign In</h3>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-control input" 
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={credentials.email}
                    onChange={event => setCredentials({...credentials, email: event.target.value})}
                    // onChange={event => setUser_id(event.target.value)} 
                />
                <input className="form-control input" 
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={credentials.password}
                    onChange={event => setCredentials({...credentials, password: event.target.value})}
                    // onChange={event => setTitle(event.target.value)} 
                />
                <div className="button-field">
                    <button className="btn btn-primary btn-block" 
                        type="submit">
                            Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

// export default SignIn