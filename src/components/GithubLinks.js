import { Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'

export default function GithubLinks() {
    const currentRepo = useSelector(selectRepo)
    const [repoOwner, setRepoOwner] = useState(null)
    const [repoName, setRepoName] = useState(null)

    useEffect(() => {
        const fullRepoName = currentRepo.fullName

        if (fullRepoName !== null) {
            const arr = fullRepoName.split("/")
            const [repoOwner, repoName] = [arr[0], arr[1]]
            setRepoOwner(repoOwner)
            setRepoName(repoName)
        }

    }, [currentRepo])

    return (
        <>
            {currentRepo.fullName &&
                <div>
                    <Link href={`https://github.com/${repoOwner}`}>{`${repoOwner}`}</Link>
                    <span>{' > '}</span>
                    <Link href={`https://github.com/${repoOwner}/${repoName}`}>{`${repoName}`}</Link>
                </div>
            }
        </>

    )
}
