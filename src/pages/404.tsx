import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <Typography variant="subtitle2" sx={{marginTop: '20px'}}>
        Not found. Return to{' '}
        <Link to="/">
          <Button>Homepage</Button>
        </Link>
      </Typography>
    </div>
  );
};

export default NotFoundPage;
