import logo from './jc_geb.png';
import inputCode from './inputCodeImg.png'
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


function InputCode() {

    let bName = false;
    let bEmail = false;
    let bCode = false;

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',

    };



    function CheckName(name) {
        if (name.length == 0) {
            window.alert("Please fill in the 'name' field.");
            bName = false;

        } else {
            bName = true;

        }
    }
    

    function CheckEmail(email) {
        if (email.indexOf('@') == -1){
            bEmail = false;
        } else if ((email.indexOf("gmail.com") != -1) || (email.indexOf("outlook.com") != -1) || (email.indexOf(".com") != -1) || (email.indexOf(".co.za") != -1) || (email.indexOf(".org") != -1)){
            bEmail = true;
        }
    }

    const [Name, setName] = useState(0);
    const [Email, setEmail] = useState(0);
    let name;
    let email;
    let link;
    let id;

    const IndividualDetails = () => {

        CheckEmail(Email);

        if ((Name == "") && (Email == "")) {
            window.alert("'Name' and 'Email' fields empty");
        } else if ((Name == "") && (Email != "")) {
            window.alert("'Name' field empty");
        } else if ((Name != "") && (Email == "")) {
            window.alert("'Email' field empty");
        } else if (bEmail == true){
            // Make backend check for username and password here.
            //---------------------------
            link = window.location.href;
            id = link.split("SignUp/").pop();
            const requestOpt = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'id': id
                }),
            }
            fetch('http://127.0.0.1:8000/survey/is_active', requestOpt)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        localStorage.setItem("name", Name);
                        localStorage.setItem("email", Email);
                        window.location = ("http://localhost:3000/Survey/" + id);
                    } else {
                        alert(result.message);
                    }
                });
            //---------------------------
        } else {
            window.alert("Incorrect email format");
        }
    }


    return (
        <header className="CodeGeneration-header">
            <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
                <img src={logo} alt='logo' />
            </Box>

          
                <Box marginTop={-25} alignContent={"center"} display={"flex"} justifyContent={"center"}>
                    <h1>
                        Welcome to the JC GEB survey
                    </h1>
                </Box>

                <Box marginLeft={-50} display={"flex"} justifyContent={"center"} marginTop={5}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardContent>
                            <Box marginTop={2} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                <h2>
                                    Sign In
                                </h2>
                            </Box>
                            <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                <TextField
                                    onChange={
                                        event => {
                                            const { value } = event.target;
                                            setName(value);
                                        }}
                                 
                                    id={"txtName"} placeholder={"name"} autoFocus={true} required={true}
                                    helperText={"Required *"}>
                                    Insert Code Here
                                </TextField>
                            </Box>

                            <Box marginTop={2} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                <TextField
                                    onChange={
                                        event => {
                                            const { value } = event.target;
                                            setEmail(value);
                                        }}
                                    id={"txtEmail"} placeholder={"email"} required={true} helperText={"Required *"}>
                                    Insert Code Here
                                </TextField>
                            </Box>

                            {/* <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <TextField id={"txtCode"} helperText={"Optional *"} placeholder={"0000#0000"}
                    >Insert Code Here</TextField>
                </Box> */}

                            <Box display={"flex"} alignContent={"center"} justifyContent={"center"} marginTop={2}>
                                <Button id={"btnCheckCode"} onClick={() => IndividualDetails()}>
                                    Start Quiz Now!
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box marginLeft={80} display={"flex"} justifyContent={"center"} marginTop={-50}>
                    <img src={inputCode} alt="admin" height="400" />
                </Box>

                <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={7}>
                    <Card sx={{ maxWidth: 5000 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="span">
                                Please take note of the following things:
                            </Typography>
                            <Typography component="span" color="text.secondary">
                                <List>
                                    <ListItemText primary="- These surveys are anonymous." />


                                    <ListItemText
                                        primary="- We do require a name and email, however this is for our own internal use." />



                                </List>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

            </header>
    );
}

export default InputCode;
