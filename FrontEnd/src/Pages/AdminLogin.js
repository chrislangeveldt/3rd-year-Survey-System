import logo from './jc_geb.png';
import admin from './admin.png';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as React from "react";
import { Button, Grid, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';



// let emails = ["bates@mergon.co.za", "nina@convergenc3.com"];
// let password = "hello123";


function AdminLogin() {

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',

    };


    const [username, setusername] = useState(0);
    const [password, setpassword] = useState(0);



    const CheckCredentials = () => {


        if ((username == "") && (password == "")) {
            window.alert("'Name' and 'Password' fields empty");
        } else if (username == "") {
            window.alert("'Username' field empty");
        } else if (password == "") {
            window.alert("'Password' field empty");
        } else {
            const requestOpt = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': username,
                    'password': password
                }),
            }
            fetch('http://127.0.0.1:8000/hiho_admin/login', requestOpt)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        window.location = "http://localhost:3000/CurrentSurveys";
                    } else {
                        alert(result.message);
                    }
                });
        }


    };





    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    return (
        <div className="CodeGeneration">
            <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
                <img src={logo} alt='logo' />
            </Box>
            <header className="CodeGeneration-header">
                <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={-25}>
                    <h1>
                        Welcome JC GEB administrator.
                    </h1>
                </Box>

                <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={-5}>
                    <h3>
                        Please sign in below.
                    </h3>
                </Box>

                <Box marginLeft={-50} display={"flex"} justifyContent={"center"} marginTop={5}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardContent>
                            <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                <TextField id={"txtUsername"} placeholder={"username"} autoFocus={true} required={true}
                                    helperText={"Required *"}
                                    onChange={
                                        event => {
                                            const { value } = event.target;
                                            setusername(value);
                                        }}>


                                </TextField>
                            </Box>

                            <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                <TextField id={"txtPassword"} placeholder={"password"}
                                    onChange={
                                        event => {
                                            const { value } = event.target;
                                            setpassword(value);
                                        }}

                                    required={true} helperText={"Required *"} type={values.showPassword ? 'text' : 'password'}>

                                </TextField>
                            </Box>

                            <Box display={"flex"} alignContent={"center"} justifyContent={"center"} marginTop={10}>
                                <Button id={"btnLogin"} onClick={() => CheckCredentials()}>
                                    Login
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box marginLeft={70} display={"flex"} justifyContent={"center"} marginTop={-50}>
                    <img
                        height="450"
                        src={admin}
                        alt="admin"
                    />

                </Box>
            </header>
        </div>
    );
}

export default AdminLogin;
