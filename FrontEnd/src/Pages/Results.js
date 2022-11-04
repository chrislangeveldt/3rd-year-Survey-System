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




function Results(props) {

  const { Answers } = props;

  let iLeaderShip = parseInt((Answers[0] + Answers[1] + Answers[2] + Answers[3] + Answers[4] + Answers[5]) / 6);
  let iPeople = parseInt((Answers[6] + Answers[7] + Answers[8] + Answers[9] + Answers[10] + Answers[11]) / 6);
  let iMoney = parseInt((Answers[12] + Answers[13] + Answers[14] + Answers[15] + Answers[16] + Answers[17]) / 6);
  let iStrategy = parseInt((Answers[18] + Answers[19] + Answers[20] + Answers[21] + Answers[22] + Answers[23]) / 6);
  let iExecution = parseInt((Answers[24] + Answers[25] + Answers[26] + Answers[27] + Answers[28] + Answers[29]) / 6);


  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Leadership ' + iLeaderShip, 'People ' + iPeople, 'Money ' + iMoney, 'Strategy ' + iStrategy, 'Execution ' + iExecution],



    datasets: [
      {
        label: '# of Votes',

        data: [iLeaderShip, iPeople, iMoney, iStrategy, iExecution],
        backgroundColor: [
          'rgba(75, 192, 255, 0.5)',//blue
          'rgba(0, 255, 0, 0.5)',  //Green
          'rgba(253, 151, 0, 0.5)',//orange
          'rgba(247, 223, 30, 0.5)', //Yellow 247, 30, 223
          'rgba(153, 102, 255, 0.5)',//purple
        ],
        borderWidth: 0,

      },
    ],
  };

  ChartJS.overrides["polarArea"].plugins.legend.position = 'right';
  ChartJS.overrides["polarArea"].plugins.legend.labels.padding = 50;
  ChartJS.overrides["polarArea"].plugins.tooltip.enabled = false;


  const pdfGenerate = () => {

    const doc = new jsPDF();

    //doc.addChart(ChartJS);


    doc.text("Your results:", 10, 10);

    const canvas = document.getElementById("PolarChart");

    canvas.fillStyle = "green";

    const canvasImage = canvas.toDataURL('image/png', 0.5);

    doc.addImage(logo, 'PNG', 15, 10, 50, 50);
    doc.addImage(canvasImage, 'PNG', 15, 15, 185, 185);

    doc.save("OrganizationalHealthResults.pdf");

  }


  return (

    <header className="CodeGeneration-header">
      <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
        <img src={logo} alt='logo' />
      </Box>
      <Box marginTop={-30} display={"flex"}
        justifyContent={"center"} alignContent={"center"}>
        <h1>
          Your Results:
        </h1>
      </Box>
      <Box display={"flex"} marginLeft={22}
        justifyContent={"center"} alignContent={"center"}>

        <Box width={800} display={"flex"}
          justifyContent={"center"} alignContent={"center"}>

          <PolarArea data={data} id={"PolarChart"} />
        </Box>
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

export default Results;