import './App.css';
import { Box } from '@mui/material';
import { Dashboard, GithubLinks, Search, Stars } from 'components';
import { useSelector } from 'react-redux';
import { selectRepo } from 'redux/repo/repoSelectors';


function App() {
  const currentRepo = useSelector(selectRepo)

  return (
    <Box component='div' className='container'>
      <Search />
      {currentRepo.id && <Box className='rowFlexBox'>
        <GithubLinks />
        <Stars />
      </Box>}
      <Dashboard />
    </Box>
  );
}

export default App;
