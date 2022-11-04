import React from 'react';
import logo from "./jc_geb.png"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Scale,
  Ticks,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import { maxHeight } from '@mui/system';
import jsPDF from "jspdf";
import { Button, Grid, Icon, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";




function IndividualsResult() {
  const [result, setResult] = React.useState([]);
  const Navigate = useNavigate();


  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  React.useEffect(() => {


    let link = window.location.href;
    let id = link.split("Results/").pop();
    const requestOpt = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/hiho_admin/get_response/' + id, requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setResult(result.response)
        }
      });

  }, []);

  const data = {
    labels: ['Leadership ' + result.leadership_score, 'People ' + result.people_score, 'Money ' + result.money_score, 'Strategy ' + result.strategy_score, 'Execution ' + result.execution_score],



    datasets: [
      {
        label: '# of Votes',

        data: [result.leadership_score, result.people_score, result.money_score, result.strategy_score, result.execution_score],
        backgroundColor: [
          'rgba(75, 192, 255, 0.5)',//blue
          'rgba(0, 255, 0, 0.5)',  //Green
          'rgba(253, 151, 0, 0.5)',//orange
          'rgba(247, 223, 30, 0.5)', //Yellow 247, 30, 223
          'rgba(153, 102, 255, 0.5)',//purple
        ], borderColor: [
          'rgba(75, 192, 255, 0.5)',//blue
          'rgba(0, 255, 0, 0.5)',  //Green
          'rgba(253, 151, 0, 0.5)',//orange
          'rgba(247, 223, 30, 0.5)', //Yellow 247, 30, 223
          'rgba(153, 102, 255, 0.5)',],

        borderWidth: 0,

      },
    ],
  };

  ChartJS.overrides["polarArea"].plugins.legend.position = 'right';
  ChartJS.overrides["polarArea"].plugins.legend.labels.padding = 50;
  ChartJS.overrides["polarArea"].plugins.tooltip.enabled = false;

  //ChartJS.overrides["polarArea"].options.scales["r"].ticks= 100;



  const pdfGenerate = () => {

    const doc = new jsPDF();

    //doc.addChart(ChartJS);


    doc.text("Your results:", 10, 10);

    const canvas = document.getElementById("PolarChart");



    const canvasImage = canvas.toDataURL('image/png', 0.5);

    doc.addImage(logo, 'PNG', 15, 10, 50, 50);
    doc.addImage(canvasImage, 'PNG', 15, 15, 185, 185);

    doc.save("OrganizationalHealthResults.pdf");

  }
  const Traverse = () => {

    Navigate("/CurrentSurveys/");

  };


  return (

    <header className="CodeGeneration-header">
      <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
        <img src={logo} alt='logo' />
      </Box>
      <Box marginTop={-30} display={"flex"}
        justifyContent={"center"} alignContent={"center"}>
        <h1>
          Results:
        </h1>
      </Box>
      <Box display={"flex"} marginLeft={22}
        justifyContent={"center"} alignContent={"center"}>

        <Box width={800} display={"flex"} marginTop={-5}
          justifyContent={"center"} alignContent={"center"}>

          <PolarArea data={data} id={"PolarChart"} />
        </Box>
      </Box>

      <Box alignContent={"center"} display={"flex"} justifyContent={"left"} marginLeft={25}>
        <Button variant="contained" color='primary' size="medium" onClick={() => Traverse()}>
          Back
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"} marginTop={-5}>



        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={pdfGenerate}
        >
          Download Results
        </Button>


      </Box>

    </header>
  );
}

export default IndividualsResult;