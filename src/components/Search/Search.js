import { Box, Button, OutlinedInput } from '@mui/material';
import { useState } from 'react';


export default function Search() {
  const [repoUrl, setRepoUrl] = useState('')

  const handleChange = (e) => {
    setRepoUrl(e.target.value)
  }
  const loadRepoIssues = () => { 
    console.log(repoUrl);
  }

  return (
    <div>
        <Box component="form" noValidate autoComplete="off">
          <OutlinedInput placeholder="Enter repo URL"
          value={repoUrl}
          onChange={handleChange} 
          sx={{mr:1}}
          />
          <Button variant='outlined' onClick={loadRepoIssues}>Load issues</Button>
        </Box>
    </div>
  )
}
