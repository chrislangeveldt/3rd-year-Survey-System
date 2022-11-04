import * as React from "react";
import logo from "./jc_geb.png"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";

/*modal style*/
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function CurrentSurveys() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [sOpen, setSOpen] = React.useState(false);
  const handleSOpen = () => setSOpen(true);
  // const handleClose = () => setOpen(false);
  const Navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [inRows, setInRows] = React.useState([]);

  React.useEffect(() => {
    const requestOpt = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/hiho_admin/get_companies', requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setRows(result.companies);
        }
      });

  }, []);

  const handleClose = () => {
    setOpen(false);
    let companyName = document.getElementById("txtCompanyName").value;
    const requestOpt = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': companyName,
      }),
    }
    fetch('http://127.0.0.1:8000/hiho_admin/create_company', requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location.reload();
        }
      });
  }

  const addSurvey = (companyName) => {
    // setOpen(false);
    const surveyName = prompt('Enter Survey Name');
    if (surveyName === null) {
      return;
    }
    const requestOpt = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'company_name': companyName,
        'survey_name': surveyName,
      }),
    }
    fetch('http://127.0.0.1:8000/hiho_admin/create_survey', requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Survey created successfully. Link below:\n\n' + result.link);
          window.location.reload();
        }
      });
  }

  const deleteCompany = (companyName) => {
    // setOpen(false);
    if (!window.confirm('Are you sure you want to delete?')) {
      return;
    }
    const requestOpt = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/hiho_admin/delete_company/' + companyName, requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location.reload();
        }
      });
  }

  const deleteIndividual = (id) => {
    // setOpen(false);
    if (!window.confirm('Are you sure you want to delete?')) {
      return;
    }
    const requestOpt = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/hiho_admin/delete_response/' + id, requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location.reload();
        }
      });
  }

  const toggleOpen = (id) => {
    const requestOpt = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/hiho_admin/toggle_survey/' + id, requestOpt)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location.reload();
        }
      });
  }

    function Row(props) {
    const { row, for_com } = props;
    // const { for } = for_com;
    const [open, setOpen] = React.useState(false);
    const [sOpen, setSOpen] = React.useState(false);
    const Navigate = useNavigate();

    if (!row.is_company) {
      console.log(for_com);
      if (for_com) {
        return;
      }
      return (
        <React.Fragment>
          <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.completed_at}</TableCell>
            <TableCell>
              <Button variant="contained" color="success" size="small" id="btnIndResult" onClick={(value) => Navigate("/Results/" + row.id)}>Results</Button>
            </TableCell>
            <TableCell>
              <Button variant="contained" color="error" size="small" id="btnDeleteIndv" onClick={(value) => deleteIndividual(row.id)}>Delete Individual</Button>
            </TableCell>

          </TableRow>
        </React.Fragment>
      );
    }

    if (!for_com) {
      return;
    }
    return (
      <React.Fragment>

        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          {/* <TableCell align="right">{row.NumberOfSurveys}</TableCell> */}
          <TableCell>{row.created_at}</TableCell>
          <TableCell>
            <Button variant="contained" color="success" size="small" id="btnAddSurvey" onClick={(value) => addSurvey(row.name)}>Add Survey</Button>
          </TableCell>
          <TableCell>
            <Button variant="contained" color="error" size="small" id="btnDeleteCompany" onClick={(value) => deleteCompany(row.name)}>Delete Company</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Surveys
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Open</TableCell>
                      <TableCell>Open/Close Survey</TableCell>
                      <TableCell>Number of Responses</TableCell>
                      <TableCell>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.surveys.map((surveyRow) => (
                      <TableRow key={surveyRow.name}
                        // onClick={() => Navigate("/Summaries")}
                        // key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell>
                          <Button color="success" variant="contained" size="small" id="btnViewResults" onClick={(value) => Navigate("/Summaries/" + surveyRow.id)}>Results</Button>
                        </TableCell>
                       
                        <TableCell component="th" scope="row">
                          {surveyRow.name}
                        </TableCell>
                        <TableCell>{surveyRow.created_at}</TableCell>
                        <TableCell>{surveyRow.is_active}</TableCell>
                        <TableCell>
                          <Button color="primary" variant="contained" size="small" id="btnToggle" onClick={() => toggleOpen(surveyRow.id)}>Toggle Open</Button>
                        </TableCell>
                        <TableCell>{surveyRow.amount}</TableCell>
                        <TableCell>{surveyRow.link}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (

    <div>
      <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
        <img src={logo} alt='logo' />
      </Box>

      <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={-20}>
        <h1>
          Current Companies and Individuals
        </h1>
      </Box>

      <Box marginLeft={170} display={"flex"} justifyContent={"center"} marginTop={10} >
        {/* <Button variant="contained" onClick={handleOpen}>Add Company</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Company name
            </Typography>
            <Typography id="Company name" variant="h6" component="h2">
              <TextField id="txtCompanyName" label="Company Name" variant="outlined" />
            </Typography>
            <Button id={"btnAddCompany"} onClick={handleClose}>Add</Button>
          </Box>
        </Modal>
      </Box>
      <Box alignContent={"center"} display={"flex"} justifyContent={"center"} >

        <Box display={"flex"} justifyContent={"center"} width={1500}>

          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontSize: "medium" }}>Company Name</TableCell>
                  <TableCell sx={{ fontSize: "medium" }}>Date Added</TableCell>

                  <Button variant="contained" onClick={handleOpen}>Add Company</Button>
                  {/* <TableCell align="right"></TableCell>
            <TableCell align="right">--</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} for_com={true} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>


      <Box alignContent={"center"} display={"flex"} justifyContent={"center"} marginTop={5} marginBottom={15}>
        <Box sx={{ width: 1500, mt: 5 }}>


          <Paper sx={{ width: '100%', height: 400, overflow: 'hidden' }}>

            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableCell sx={{ fontSize: "large" }} align="center" >
                    Individuals
                  </TableCell>
                  <TableRow>
                    <TableCell sx={{ fontSize: "medium" }} width={500} >Name</TableCell>
                    <TableCell sx={{ fontSize: "medium" }} width={500} >Email Address</TableCell>
                    <TableCell sx={{ fontSize: "medium" }} width={500} >Date of Survey</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.id} row={row} for_com={false} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

      </Box>

    </div>
  );
}
export default CurrentSurveys;