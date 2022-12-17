import React, {useState, useEffect} from "react";
import { Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./input";
import Icon from "./icon";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const handleChange = () => {
        
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false); 
    };
    const googleSuccess = async (res) => {
        console.log(res);
        // setProfile(res.profileObj);
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history('/'); // navigate to home page
        }
        catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later");
    };
    // const clientId = "901678272636-p2i1ea4vai8esjsa4bdvola9tukfdsou.apps.googleusercontent.com"
    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         });
    //     };
    //     gapi.load('client:auth2', initClient);
    // });
    // const dispatch = useDispatch();

                
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type="password" />
                        {isSignup && (
                            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        )}
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    {/* <GoogleLogin 
                        clientId="901678272636-p2i1ea4vai8esjsa4bdvola9tukfdsou.apps.googleusercontent.com"
                        
                        render={(renderProps) => (
                            <Button className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained">
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}

                    /> */}
                    <GoogleLogin style={window.innerWidth > 960 ? {width: "100%"} : {width: "100%"}}
                        clientId="901678272636-p2i1ea4vai8esjsa4bdvola9tukfdsou.apps.googleusercontent.com"
                        // buttonText="Sign in with Google"
                        // onSuccess={googleSuccess}
                        // onFailure={googleFailure}
                        // cookiePolicy={'single_host_origin'}
                        // isSignedIn={true}
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                        

                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? `Already have an account? Sign In` : `Don't have an account? Sign Up`}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
