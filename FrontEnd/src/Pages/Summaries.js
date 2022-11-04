import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import logo from "./jc_geb.png"
import CurrentSurveys from './CurrentSurveys';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '@mui/material';



function Summaries() {
    const Navigate = useNavigate();
    const { survey_id } = useParams();

    const [summary, setSummary] = React.useState([]);
    let CompanyName = "Company Name Here";

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    React.useEffect(() => {

        const requestOpt = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://127.0.0.1:8000/hiho_admin/get_summary/' + survey_id, requestOpt)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setSummary(result.summary)
                }
            });


    }, []);



    const Traverse = () => {

        Navigate("/CurrentSurveys/");

    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "Company History",
            },

        },

    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // ChartJS.options.scales['y'].min=100;

    let data = {
        labels,
        datasets: [
            {
                label: 'Leadership',
                data: summary.leadership_score,
                borderColor: 'rgba(75, 192, 255, 0.5)',//blue

                backgroundColor: 'rgba(75, 192, 255, 0.5)',
            },
            {
                label: 'People',
                data: summary.people_score,
                borderColor: 'rgba(0, 255, 0, 0.5)',  //Green

                backgroundColor: 'rgba(0, 255, 0, 0.5)',
            },
            {
                label: 'Money',
                data: summary.money_score,
                borderColor: 'rgba(253, 151, 0, 0.5)',//orange
                backgroundColor: 'rgba(253, 151, 0, 0.5)',
            },
            {
                label: 'Strategy',
                data: summary.strategy_score,
                borderColor: 'rgba(247, 223, 30, 0.5)', //Yellow 247, 30, 223
                backgroundColor: 'rgba(247, 223, 30, 0.5)',
            },
            {
                label: 'Execution',
                data: summary.execution_score,
                borderColor: 'rgba(153, 102, 255, 0.5)',//purple
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
        ],
    };



    return (
        <header>
            <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
                <img src={logo} alt='logo' />
            </Box>
            <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={-25}>

                <h1>
                    {CompanyName}
                </h1>
            </Box>
            <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={5}>

                <Box sx={{ width: 1500 }}>

                    <Line options={options} data={data} />
                </Box>
            </Box>
            <Box alignContent={"center"} display={"flex"} justifyContent={"left"} marginTop={-10} marginBottom={5} marginLeft={10}>
                <Button variant="contained" color='primary' size="large" onClick={() => Traverse()}>
                    Back
                </Button>

            </Box>
        </header>
    );
}

export default Summaries;