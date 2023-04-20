import { Box, Button, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepo, fetchIssues } from 'redux/repo/repoOperations';
import storage from 'utils/storage';
import css from "./search.module.css"
import { selectRepo } from 'redux/repo/repoSelectors';
import { Loader } from 'components/Loader/Loader';


export default function Search() {
  const [enteredUrl, setEnteredUrl] = useState(storage.load('enteredUrl') || "")
  const { isLoading } = useSelector(selectRepo)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setEnteredUrl(e.target.value)
  }

  const loadRepoIssues = () => {
    const regexp = /^(http|https|ftp):\/\/(github.com+)/i

    if (!regexp.test(enteredUrl.toLocaleLowerCase())) {
      alert('Check if your repo link is correct please!')
      return
    }

    storage.save('enteredUrl', enteredUrl)

    const arr = enteredUrl.split("/")
    const [repoOwner, repoName] = [arr[3]?.toLocaleLowerCase(), arr[4]?.toLocaleLowerCase()]

    dispatch(fetchRepo({ repoOwner, repoName }))
    dispatch(fetchIssues({ repoOwner, repoName }))
  }

  return (
    <div>
      <Box className={css.box}>
        <OutlinedInput placeholder="Enter repo URL"
          value={enteredUrl}
          onChange={handleChange}
          className={css.inputField}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              loadRepoIssues(e);
            }
          }}
        />
        {isLoading ? <Loader /> :
          <Button variant='outlined' className={css.button}
            onClick={loadRepoIssues}>Load issues </Button>
        }
      </Box>
    </div>
  )
}
