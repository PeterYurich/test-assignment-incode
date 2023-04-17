import './App.css';
// import { Search } from "components"
import { Box } from '@mui/material';
import { Dashboard, GithubLinks, Search } from 'components';


function App() {
  return (
    <Box component='div' className='container'>
      <Search />
      <GithubLinks />
      <Dashboard />
    </Box>
  );
}

export default App;
