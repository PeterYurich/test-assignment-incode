import './App.css';
import { Box, Container } from '@mui/material';
import { Dashboard, GithubLinks, Search, Stars } from 'components';
import { useSelector } from 'react-redux';
import { selectRepo } from 'redux/repo/repoSelectors';


function App() {
  const currentRepo = useSelector(selectRepo)

  return (
    <Container component="main" >
      <Search />
      {currentRepo.id && <Box className='rowFlexBox'>
        <GithubLinks />
        <Stars />
      </Box>}
      <Dashboard />
    </Container>
  );
}

export default App;
