import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href='https://www.linkedin.com/in/larsencundric/' color="inherit" >
        Larsen Cundrič
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright