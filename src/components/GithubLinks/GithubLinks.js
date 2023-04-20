import { Box, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getOwnerAndRepoFromUrl from 'utils/getOwnerAndRepoFromUrl'
import storage from 'utils/storage'


export default function GithubLinks() {
    const [enteredUrl, setEnteredUrl] = useState(storage.load('enteredUrl') || null)

    const [repoFullName, setRepoFullName] = useState()

    useEffect(() => {

        if (enteredUrl) {
            const fullRepoName = getOwnerAndRepoFromUrl(enteredUrl)
            console.log('fullRepoName: ', fullRepoName);
            setRepoFullName(fullRepoName)
        }

    }, [enteredUrl])

    return (
        <>
            {repoFullName && <Box>
                <Link variant="body1"
                    href={`https://github.com/${repoFullName.repoOwner}`} >
                    {`${repoFullName.repoOwner}`}
                </Link>
                <span>{' > '}</span>
                <Link variant="body1"
                    href={`https://github.com/${repoFullName.repoOwner}/${repoFullName.repoName}`} >
                    {`${repoFullName.repoName}`}
                </Link>
            </Box>
            }
        </>

    )
}
