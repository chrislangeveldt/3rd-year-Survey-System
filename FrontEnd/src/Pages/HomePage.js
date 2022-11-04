import {Button, Grid, Icon, TextField} from '@mui/material';
import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import logo from './jc_geb.png';
import background from './background.png'
import greenHex from './hex_green.png'
import orangeHex from './hex_orange.png'
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
    {
      url: './hex_green.png',
      title: 'JC GEB Admin',
      width: '100%',
    },
  ];

  const myStyle={
    backgroundImage: background,
    height:'100vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 250,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    // '&:hover, &.Mui-focusVisible': {
    //   zIndex: 1,
    //   '& .MuiImageBackdrop-root': {
    //     opacity: 0.0,
    //   },
    //   '& .MuiImageMarked-root': {
    //     opacity: 0,
    //   },
    //   '& .MuiTypography-root': {
    //     border: '4px solid currentColor',
    //   },
    // },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));


function HomePage() {

    const Navigate = useNavigate();

    return (
        <div className="CodeGeneration" >

          
             <Box marginTop={-15} display={"flex"} justifyContent={"left"} alignContent={"center"}>
                <img src={logo} alt='logo' />
            </Box>

            <header className="CodeGeneration-header">
                
            <Box marginLeft={45} marginTop={-0} sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                    disableRipple
                    disableTouchRipple
                    id={"btnAdmin"}
                    key={image.title}
                    onClick={() => Navigate("/AdminLogin")}
                    style={{
                        width: image.width,
                    }}
                    >
                    <ImageSrc style={{ backgroundImage: `url(${greenHex})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        >
                        {image.title}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </ImageButton>
                ))}
                </Box>   
                <Box marginLeft={85} marginTop={-55} sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                    disableRipple
                    id={"btnSurvey"}
                    key={image.title}
                    onClick={() => Navigate("/SignUp/Individuals")}
                    style={{
                        width: image.width,
                    }}
                    >
                    <ImageSrc style={{ backgroundImage: `url(${orangeHex})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                        component="div"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        >
                        {"Individual Survey"}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </ImageButton>
                ))}
                </Box> 
                <Box marginTop={-30} marginLeft={0} display={"flex"} justifyContent={"right"} alignContent={"center"} >
                <img src={background} alt='logo' height={850} />
                </Box>  


                {/* <Box marginTop={5} display={"flex"} justifyContent={"center"} alignContent={"center"}>

                    <Box height={400} width={200} border={"solid"} marginTop={5} display={"flex"} marginRight={2}
                         justifyContent={"center"} alignContent={"center"}>
                        <Button
                            id={"btnAdmin"}
                            variant={"outlined"}
                            size={"large"}
                            sx={{color: "Blue", height: 400, width: 200}}
                            onClick={() => Navigate("/AdminLogin")}
                        >
                            JC GEB Admin
                        </Button>
                    </Box>
                    <Box height={400} width={200} border={"solid"} marginTop={5} display={"flex"}
                         justifyContent={"center"} alignContent={"center"}>
                        <Button
                            id={"btnSurvey"}
                            variant={"outlined"}
                            size={"large"}
                            sx={{color: "Blue", height: 400, width: 200}}
                            onClick={() => Navigate("/SignUp/Individuals")}
                        >
                            Individual Survey
                        </Button>
                    </Box>
                </Box> */}
            </header>
        </div>
    );
}

export default HomePage;
