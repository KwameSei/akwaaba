import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../store/authActions";
import './authStyle.css';

export const SignUp = () => {
    // Creating the dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    console.log(auth);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Creating the helper function
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signUp(user));
        setUser({   // Clearing the form
            username: "",
            email: "",
            password: "",
        }); 
    }
    if (auth && auth.id)
        navigate("/");

    return (
        <div className="main">
            <h3>Sign Up</h3>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-control input" 
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={user.username}
                    onChange={event => setUser({...user, username: event.target.value})} 
                />
                <input className="form-control input" 
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={user.email}
                    onChange={event => setUser({...user, email: event.target.value})}
                />
                <input className="form-control input" 
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={user.password}
                    onChange={event => setUser({...user, password: event.target.value})}
                />
                <div className="button-field">
                    <button className="btn btn-primary btn-block" 
                        type="submit">
                            Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

// export default SignUp;
