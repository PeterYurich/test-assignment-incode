import React, { useEffect, useState } from 'react'
import css from "./dashboard.module.css"
import { Paper, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import storage from 'utils/storage'

export default function Dashboard() {
    const [issues, setIssues] = useState()
    const [boardsState, setBoardsState] = useState(storage.load('boardsState') || null)
    const currentRepo = useSelector(selectRepo)
    const [issuesPlacement, setIssuesPlacement] = useState(
        boardsState?.find(repo => repo.repoId = currentRepo.id) || null
    )
    const [toDoToRender, setToDoToRender] = useState()

    useEffect(() => {
        setIssues(currentRepo.issues)
    }, [currentRepo])


    if (issues && !issuesPlacement) {
        const initialPlacement = {
            repoId: currentRepo.id,
            issuesPlacement: {
                toDo: issues.map(issue => issue.id),
            }
        }

        setIssuesPlacement(initialPlacement.issuesPlacement)

        if (boardsState) {
            storage.save([initialPlacement, ...boardsState])
        } else {
            storage.save([initialPlacement])
        }
    }

    useEffect(() => {
        if (issues && issuesPlacement) {
            const toDoToRender = issues?.map(issue => {
                if (issuesPlacement.toDo.find(issueId => issueId === issue.id)) {
                    return issue
                }
        })
            setToDoToRender(toDoToRender)
        }
    }, [issuesPlacement, issues])
    
    
    return (
        <Box>
            <Paper className={css.mainBoard} elevation={3} >
                <Paper className={css.taskBoard}>
                    <Typography variant='h5'
                        className={css.boardTitle}>To Do
                    </Typography>
                    {toDoToRender && toDoToRender?.length > 0 &&
                        toDoToRender.map(issue => (
                            <Paper className={css.issueCard} key={issue.id}>
                                <Typography >{issue.title}</Typography>
                            </Paper>
                        ))}
                </Paper>
                <Paper className={css.taskBoard}>
                    <Typography variant='h5'
                        className={css.boardTitle}>In Process
                    </Typography>
                </Paper>
                <Paper className={css.taskBoard}>
                    <Typography variant='h5'
                        className={css.boardTitle}>Done
                    </Typography>
                </Paper>
            </Paper>
        </Box>
    )
}
