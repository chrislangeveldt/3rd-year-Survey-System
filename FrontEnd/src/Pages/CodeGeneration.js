import logo from './logo.svg';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from "react";

function CodeGeneration() {
    
    let companyCode = "0000";
    let execCode = "0000";
    let nonExecCode = "0000";
    
    return (
        <div className="CodeGeneration">
            <header className="CodeGeneration-header">
            <Box alignContent={"center"} display={"flex"} justifyContent={"center"}>
                    <h1>
                        Create New Survey
                    </h1>
                </Box>
                <div>
                <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <TextField id={"txtName"} placeholder={"company name"} autoFocus={true} required={true}
                               helperText={"Required *"}>
                    </TextField>
                </Box>

                <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <TextField id={"txtEmail"} placeholder={"email"} required={true} helperText={"Required *"}>
                        Insert Code Here
                    </TextField>
                </Box>

                <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <TextField id={"txtCode"} helperText={"Required *"} placeholder={"contact number"}
                    >Insert Code Here</TextField>
                </Box>
                <Box marginTop={5} alignContent={"center"} display={"flex"} justifyContent={"center"}>
                <Button variant="contained">Create</Button>
                </Box>
                <Box marginTop={5} alignContent={"center"} display={"flex"} justifyContent={"center"}>
                    <Box border={'solid'} height={50} width={70}  marginTop={5} marginRight={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <Box marginTop={0.8} fontSize={30}>
                    {companyCode}
                    </Box>
                    </Box>
                    <Box border={'solid'} height={50} width={70}  marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <Box marginTop={0.8} fontSize={30}>
                    {execCode}
                    </Box>
                    </Box>
                    <Box border={'solid'} height={50} width={70}  marginTop={5} marginLeft={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    <Box marginTop={0.8} fontSize={30}>
                    {nonExecCode}
                    </Box>
                    </Box>
                </Box>
                </div>
            </header>
        </div>
    );
}

export default CodeGeneration;
