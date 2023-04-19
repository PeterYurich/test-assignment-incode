import React, { useEffect, useState } from 'react'
import css from "./dashboard.module.css"
import { Paper, Typography, Box, Divider, List, ListItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import storage from 'utils/storage'

export default function Dashboard() {
    const [heldIssueId, setHeldIssueId] = useState()
    const [startBoardIndex, setStartBoardIndex] = useState()

    const currentRepo = useSelector(selectRepo)
    const savedBoardState = storage.load(`${currentRepo.id}`)
    const [boardsState, setBoardsState] = useState(savedBoardState || [
        { id: 1, title: 'To Do', items: [] },
        { id: 2, title: 'In Progress', items: [1664953332] },
        { id: 3, title: 'Done', items: [] }
    ])

    useEffect(() => {
        if (!savedBoardState) {
            const allIssuesIds = currentRepo?.issues.map(issue => issue.id)
            const newBoardsState = [...boardsState]
            newBoardsState[0].items = allIssuesIds
            setBoardsState(newBoardsState)
            return
        }
        setBoardsState(savedBoardState)

    }, [currentRepo])

    const dragStartHandler = (e, issueId, boardIndex) => {
        setHeldIssueId(issueId)
        setStartBoardIndex(boardIndex)
    }

    const dragLeaveHandler = (e) => {
        // e.target.style.background = 'white'

    }

    const dragEndHandler = (e) => {
        e.preventDefault()
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.tagName === 'DIV') {
            // e.target.style.backgroundColor = 'lightgray'
            // e.target.style.boxShadow = '0 2px 3px gray'
        }
    }

    const dropHandler = (e, finishIssueId, finishBoardIndex) => {
        e.preventDefault()

        const newBoardsState = [...boardsState]

        const heldIssueIndex = boardsState[startBoardIndex].items.indexOf(heldIssueId)
        const finishIssueIndex = boardsState[finishBoardIndex].items.indexOf(finishIssueId)

        if (heldIssueId === finishIssueId) { return }

        newBoardsState[startBoardIndex].items.splice(heldIssueIndex, 1)
        newBoardsState[finishBoardIndex].items.splice(finishIssueIndex, 0, heldIssueId)
        setBoardsState(newBoardsState)
    }

    const dropCardHandler = (e, finishBoardIndex) => {
        e.preventDefault()

        if (boardsState[finishBoardIndex].items.includes(heldIssueId)) { return }
        // if (heldIssueId === )

        const newBoardsState = [...boardsState]

        newBoardsState[finishBoardIndex].items.push(heldIssueId)

        const heldIssueIndex = boardsState[startBoardIndex].items.indexOf(heldIssueId)
        newBoardsState[startBoardIndex].items.splice(heldIssueIndex, 1)

        setBoardsState(newBoardsState)

    }

    return (
        <Box>
            <List className={css.boardWrapper}>
                {boardsState.map((board, boardIndex) => (
                    <ListItem className={css.board} key={board.id}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, boardIndex)}
                    >
                        <Typography variant='h5' className={css.boardTitle}>
                            {board.title}
                        </Typography>
                        <Paper className={css.boardPaper}>
                            <List>
                                {board.items.length > 0 && board.items.map((issueId, index, arr) => {
                                    const cardContent = currentRepo.issues.find(issue => issue.id === issueId)
                                    if (!cardContent) {
                                        arr.splice(index, 1)
                                        return
                                    }
                                    return (
                                        <ListItem key={issueId} sx={{ p: 0 }}
                                            draggable={true}
                                            onDragStart={(e) => dragStartHandler(e, issueId, boardIndex)}
                                            onDragLeave={(e) => dragLeaveHandler(e)}
                                            onDragEnd={(e) => dragEndHandler(e)}
                                            onDragOver={(e) => dragOverHandler(e)}
                                            onDrop={(e) => dropHandler(e, issueId, boardIndex)}
                                        >
                                            <Paper className={css.issueCard} >
                                                <Typography className={css.issueTitle}>
                                                    {cardContent?.title}
                                                </Typography>
                                                <Box className={css.rowFlexBox}>
                                                    <Typography>#{cardContent.number}</Typography>
                                                    <Typography>{cardContent.openedAt}</Typography>
                                                </Box>
                                                <Box className={css.rowFlexBox}>
                                                    <Typography>{cardContent.author}</Typography>
                                                    <Divider flexItem orientation="vertical" />
                                                    <Typography> Comments: {cardContent.comments} </Typography>
                                                </Box>
                                            </Paper>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
