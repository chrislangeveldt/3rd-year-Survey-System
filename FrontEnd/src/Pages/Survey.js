import React, { useState } from 'react';
import Box from '@mui/material/Box';
//import Slider from '@mui/material/Slider';
import { useNavigate } from "react-router-dom";
import logo from './jc_geb.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';



let arrQuestions = ["Your boss listens to your opinions.",
    "Your boss empathizes with obstacles in your work.",
    "Your boss shows respect to those around themself.",
    "Your boss provides a positive influence on the work place.",
    "Your boss expresses gratitude to a job well done or extra effort made.",
    "Your boss communicates clearly what they expect from you.",
    "Those around you create a comfortable working environment.",
    "You feel comfortable asking a peer for assistance.",
    "You feel safe at work.",
    "You have access to resources to report problems you experience.",
    "You have a good relationship with those that you work with.",
    "You work seamlessly with your peers on projects.",
    "You feel resources are distributed fairly throughout the company.",
    "You feel you are paid a fair salary/wage.",
    "You feel your bonuses are fair.",
    "You feel your work environment is regularly maintained.",
    "Replacing outdated or broken equipment is an easy process.",
    "Your company provides sufficient equipment or stationary for your job.",
    "The strategies your company employs are in line with the business objectives.",
    "The strategies your company employs takes the employees preference into account.",
    "The strategies your company employs take the current work place situation into account.",
    "The strategies your company employs make use of the correct tools and personnel.",
    "The strategies your company employs are well documented.",
    "The strategies your company employs are clearly explained.",
    "Executed tasks reflect attention to detail.",
    "Currently executing tasks are well communicated between team members and departments.",
    "Executed tasks make use of seamless collaboration.",
    "Executing tasks make use of regular problem solving.",
    "Executing tasks are delegated to more capable members when required.",
    "Executed tasks align with the company objectives and help move the company in this direction."];

let i = 0;

let iLeaderShip = 0;
let iPeople = 0;
let iMoney = 0;
let iStrategy = 0;
let iExecution = 0;

let link;
let id;


let border = "hidden";

let bDisabledPrev = true;
let bEnabled = false;




// function valuetext(value) {
//    
//     arrAnswers[i] = value;
//     return value;
// }

const PrettoSlider = styled(Slider)({
    //color: '#52af77',
    color: '#00c2cb',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
        },
        '&:before': {
        display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#00c2cb',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
        transform: 'rotate(45deg)',
        },
    },
});

let value = 30;

function SetSlider() {

    return value;
}



function Survey(props) {
    const { Answers, setAnswers } = props;
    const Navigate = useNavigate();
    const [CurrentQuestion, setQuestion] = useState(0);


    
React.useEffect(() => {
    link = window.location.href;
    id = link.split("Survey/").pop();
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
            if (!result.success) {
               
                window.alert(result.message);
                Navigate("/");
            }
        });
  }, []);



    const submitbtn = () => {
        iLeaderShip = parseInt((Answers[0] + Answers[1] + Answers[2] + Answers[3] + Answers[4] + Answers[5]) / 6);
        iPeople = parseInt((Answers[6] + Answers[7] + Answers[8] + Answers[9] + Answers[10] + Answers[11]) / 6);
        iMoney = parseInt((Answers[12] + Answers[13] + Answers[14] + Answers[15] + Answers[16] + Answers[17]) / 6);
        iStrategy = parseInt((Answers[18] + Answers[19] + Answers[20] + Answers[21] + Answers[22] + Answers[23]) / 6);
        iExecution = parseInt((Answers[24] + Answers[25] + Answers[26] + Answers[27] + Answers[28] + Answers[29]) / 6);
        
        let link = window.location.href;
        let id = link.split("Survey/").pop();
        let lsname = "Anonymous";
        let lsemail = "Anonymous";
        if (id === "Individuals") {
            lsname = localStorage.getItem('name');
            lsemail = localStorage.getItem('email');
        }
        const requestOpt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "survey_id": id,
                "name":lsname,
                "email":lsemail,
                "leadership_score":iLeaderShip,
                "people_score":iPeople,
                "money_score":iMoney,
                "strategy_score":iStrategy,
                "execution_score":iExecution
            }),
        }
        fetch('http://127.0.0.1:8000/survey/submit_response', requestOpt)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    Navigate("/Results")
                } else {
                    alert(result.message);
                }
            });
    };



    return (


        <div className="Survey">
            <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
                <img src={logo} alt='logo' />
            </Box>

            <header className="Survey-header">
            <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={-15}>
                <Card sx={{ maxWidth: 5000 }}>
                    <CardActionArea>
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        Please place the slider between "Weak" and "Strong" based on how much you agree with each
                        statement.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card> 
                </Box>

                <Box
                    id={"bxQuestionNumber"}
                    marginTop={10}
                    display={"flex"}
                    justifyContent={"center"}
                    fontSize={"larger"}
                    fontFamily={"-moz-initial"}
                    border={border}


                >
                    Question {CurrentQuestion + 1} of {arrQuestions.length}

                </Box>

                <Box
                    border={border}

                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={100}
                >
                    <div
                        id={"divQuestion"}
                    >
                        {arrQuestions[CurrentQuestion]}
                    </div>
                </Box>
                <Box
                    border={border}

                    marginTop={0}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={100}
                >
                    <Box
                        border={border}

                        marginRight={2}
                    >Weak</Box>
                    {/* <Box
                        justifyContent={"center"}
                        marginTop={2}
                        width={300}
                        alignItems={"center"}
                        border={border}

                    >
                        <Slider
                            id={"slSlider"}
                            size={"medium"}
                            max={100}
                            min={0}
                            step={1}
                            value={Answers[CurrentQuestion]}
                            onChange={event => {
                                const { value } = event.target;
                                const newAnswers = [...Answers];
                                newAnswers[CurrentQuestion] = value;
                                setAnswers(newAnswers);
                            }}
                            valueLabelDisplay={"auto"}
                            sx={{ mb: 1 }}


                        />
                    </Box> */}
                    
                    <Box
                        justifyContent={"center"}
                        marginTop={2}
                        width={400}
                        alignItems={"center"}
                        border={border}

                    >
                        <Typography gutterBottom></Typography>
                        <PrettoSlider
                            id={"slSlider"}
                            size={"medium"}
                            max={100}
                            min={0}
                            step={1}
                            value = {Answers[CurrentQuestion]}
                            onChange = {event => {
                                const {value} = event.target;
                                const newAnswers = [...Answers];
                                newAnswers[CurrentQuestion] = value;
                                setAnswers(newAnswers);

                            }}
                           // valueLabelDisplay={"auto"}
                            sx={{mb: 1}}
                        /> 
                    </Box>

                    
                    <Box
                        marginLeft={2}
                        border={border}

                    >Strong</Box>
                </Box>


                <Box
                    marginTop={-0.5}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={border}
                >

                    <Box
                        marginRight={30}
                        width={70}
                        border={border}
                        height={25}>


                        <Button
                            id={"btnPrev"}
                            variant="contained"
                            color="info"
                            disabled={CurrentQuestion == 0}
                            onClick={() => setQuestion(CurrentQuestion - 1)}

                        >
                            Previous
                        </Button>
                    </Box>


                    <Box

                        width={70}
                        height={25}
                        border={border}
                    >
                        <Button
                            id={"btnNext"}
                            variant="contained"
                            color="info"
                            disabled={CurrentQuestion == 29}
                            onClick={() => setQuestion(CurrentQuestion + 1)}
                        >
                            Next
                        </Button>
                    </Box>


                </Box>
                <Box
                    marginTop={8}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={border}
                >
                    <Button

                        id={"btnSubmit"}
                        variant="contained"
                        color="error"
                        onClick={submitbtn}
                        disabled={CurrentQuestion != 29}

                    >Submit
                    </Button>
                </Box>
            </header>
            <script src={"Script.js"} />

        </div>

    );
}

export default Survey;
