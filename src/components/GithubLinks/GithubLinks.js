import { Box, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import getOwnerAndRepoFromUrl from 'utils/getOwnerAndRepoFromUrl'


export default function GithubLinks() {
    const [repoFullName, setRepoFullName] = useState()
    const { url } = useSelector(selectRepo)

    useEffect(() => {
        if (url) {
            const fullRepoName = getOwnerAndRepoFromUrl(url)
            setRepoFullName(fullRepoName)
        }
    }, [url])

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
