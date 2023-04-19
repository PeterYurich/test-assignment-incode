import './App.css';
import { Box } from '@mui/material';
import { Dashboard, GithubLinks, Search, Stars } from 'components';


function App() {
  return (
    <Box component='div' className='container'>
      <Search />
      <Box className='rowFlexBox'>
        <GithubLinks />
        <Stars />
      </Box>
      <Dashboard />
    </Box>
  );
}

export default App;
