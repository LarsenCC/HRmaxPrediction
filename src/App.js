import { Container, Box, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Backdrop, CircularProgress } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';

import { InputAdornment } from '@material-ui/core';

import logo from './logo.png';

import { useMediaQuery } from '@material-ui/core';

import Copyright from './Copyright';

import theme from './Theme';

import axios from 'axios';

import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  submit: {
    marginTop: '1rem',
    backgroundColor: '#F76F72',
    "&:hover": {
      // color: 'white',
      // backgroundColor: '#F40057',
      color: '#F76F72',
      backgroundColor: 'white',
    }
  }
}));

const App = () => {
  const classes = useStyles();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [hrrest, setHrrest] = useState();
  const [dbp, setDbp] = useState();
  const [sbp, setSbp] = useState();
  const [prediction, setPrediction] = useState();

  const [open, setOpen] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    setPrediction(undefined);

    const creds = {
      "age": age,
      "hrrest": hrrest,
      "height": height,
      "sbp": sbp,
      "dbp": dbp,
      "weight": weight
    }

    let valid = true;

    Object.keys(creds).forEach(cred => (
        creds[cred] ? '' : valid = false
      )
    )

    if (!valid) {
      toast.error('Please type in valid numbers!');
      setOpen(false)
      return
    }

    axios.post('http://127.0.0.1:5000/', creds)
    .then(res => {setPrediction(Math.round(res.data.prediction)); setOpen(false)})
    .catch(err => {console.log(err); setOpen(false)})
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img style={{height: `${matches ? 6.5 : 15}rem`}} alt="site logo" src={logo} />
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'Age'}
              name="age"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">Years</InputAdornment>,
                inputProps: { min: 0, max: 120 } 
              }}
              onChange={(e) => setAge(parseFloat(e.target.value))}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'Height'}
              name="Height"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                inputProps: { min: 0, max: 300 } 
              }}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'Weight'}
              name="Weight"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                inputProps: { min: 0, max: 300 } 
              }}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'HR rest'}
              name="HRrest"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">bpm</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setHrrest(parseFloat(e.target.value))}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'DBP'}
              name="DBP"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">mm Hg</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setDbp(parseFloat(e.target.value))}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'SBP'}
              name="SBP"
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="start">mm Hg</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setSbp(parseFloat(e.target.value))}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button 
                  type='submit' 
                  className={classes.submit} 
                  fullWidth
                  variant="contained" 
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                >
                  Predict HRmax
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='h6'>{prediction ? `Your predicted HRmax is ${prediction} bpm.` : ''}</Typography>
              </Grid>
            </Grid>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster toastOptions={
        {
          // Define default options
          duration: 4000,
          style: {
            background: '#605e66',
            textAlign: 'center',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#5da863',
            },
            theme: {
              primary: 'green',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#f07a7a', // B63636
            },
            theme: {
              primary: 'green',
            },
          },
        }}
      />
    </>
  );
}

export default App;


