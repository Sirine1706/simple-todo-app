import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const LoadingScreen = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
