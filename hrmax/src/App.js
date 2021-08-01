import { Container, Box } from '@material-ui/core';
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

  const [open, setOpen] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  // TODO --> API call
  const getPrediction = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    console.log('test')

    getPrediction()
    .then(() => setOpen(false))

    return
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
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">Years</InputAdornment>,
                inputProps: { min: 0, max: 120 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'Height'}
              name="age"
              autoFocus
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                inputProps: { min: 0, max: 300 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'Weight'}
              name="age"
              autoFocus
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                inputProps: { min: 0, max: 300 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'HR rest'}
              name="age"
              autoFocus
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">bpm</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'DBP'}
              name="age"
              autoFocus
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">mm Hg</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={'SBP'}
              name="age"
              autoFocus
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">mm Hg</InputAdornment>,
                inputProps: { min: 0, max: 200 } 
              }}
              onChange={(e) => setAge(e.target.value)}
            />
            <Button 
              type='submit' 
              className={classes.submit} 
              variant="contained" 
              color="secondary"
              startIcon={<FavoriteIcon />}
            >
              Predict HRmax
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Backdrop className={classes.backdrop} open={open}>
        <p>Making prediction</p>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;


