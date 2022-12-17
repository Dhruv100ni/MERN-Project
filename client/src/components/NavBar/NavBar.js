import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState} from "react";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGNIN } from "../../constants/actionTypes";
const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); // [current state, function to update the state
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(user);
    const navigate = useNavigate();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        // navigate to home page
        navigate('/');
        setUser(null);
    };

    const signIn = () => {
        dispatch({ type: 'SIGNIN' });
        setUser(null);
        // navigate to auth page
        navigate('/auth');
    };

    useEffect(() => {
        const token = user?.token;
        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={() => logout()}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary" onClick={() => signIn()}>Sign In</Button>
            )
            }
        </Toolbar>
        </AppBar>
    )
}

export default NavBar;