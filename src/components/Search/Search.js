import { Box, Button, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRepo } from 'redux/repos/reposOperations';


export default function Search() {
  const [enteredUrl, setEnteredUrl] = useState('')
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setEnteredUrl(e.target.value)
  }


  const loadRepoIssues = () => {
    // const regexp = /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i
    const regexp = /^(http|https|ftp):\/\/(github.com+)/i

    if (!regexp.test(enteredUrl.toLocaleLowerCase())) {
      alert('Check if your link to repo is correct please')
      return
    }

    const arr = enteredUrl.split("/")
    const [repoOwner, repoName] = [arr[3].toLocaleLowerCase(), arr[4].toLocaleLowerCase()]
    console.log(`${repoOwner}/${repoName}`);

    dispatch(fetchRepo([repoOwner, repoName]))

  }

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <OutlinedInput placeholder="Enter repo URL"
          value={enteredUrl}
          onChange={handleChange}
          sx={{ mr: 1, width: "100%" }}
        />
        <Button variant='outlined' onClick={loadRepoIssues}>Load issues</Button>
      </Box>
    </div>
  )
}
