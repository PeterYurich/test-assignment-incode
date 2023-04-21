import './App.css';
import { Container, Box } from '@mui/material';
import { Dashboard, GithubLinks, Search, Stars } from 'components';
import { useSelector } from 'react-redux';
import { selectRepo } from 'redux/repo/repoSelectors';
import css from 'app.module.css'


function App() {
  const currentRepo = useSelector(selectRepo)

  return (
    <Container component="main" >
      <Search />
      {currentRepo.id &&
        <Container >
          <Box className={css.rowFlexBox}>
            <GithubLinks />
            <Stars />
          </Box>
          <Dashboard />
        </Container>}
    </Container>
  );
}

export default App;
