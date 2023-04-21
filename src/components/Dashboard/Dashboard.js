import React, { useEffect, useState } from 'react'
import css from "./dashboard.module.css"
import { Typography, Box, Divider, List, ListItem, Card } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import storage from 'utils/storage'
import { timeTillNow } from 'utils/timeTillNow'


export default function Dashboard() {
    const [heldIssueId, setHeldIssueId] = useState()
    const [startBoardIndex, setStartBoardIndex] = useState()

    const currentRepo = useSelector(selectRepo)
    const [boardsState, setBoardsState] = useState()

    useEffect(() => {
        const savedBoardState = storage.load(`${currentRepo.id}` || null)

        if (!savedBoardState) {
            const allIssuesIds = currentRepo?.issues.map(issue => {
                return issue.id
            })
            const newBoardsState = [
                { id: 1, title: 'To Do', items: [] },
                { id: 2, title: 'In Progress', items: [] },
                { id: 3, title: 'Done', items: [] }
            ]
            const toDoBoard = newBoardsState[0]
            toDoBoard.items = allIssuesIds
            setBoardsState(newBoardsState)
            return
        }


        const newBoardsState = [...savedBoardState]
        const [toDoBoard, inProgressBoard, DoneBoard] = newBoardsState
        const newIssues = currentRepo?.issues.filter(issue =>
            !DoneBoard.items.includes(issue.id) &&
            !inProgressBoard.items.includes(issue.id) &&
            !toDoBoard.items.includes(issue.id)
        )
        const newIssuesIds = newIssues.map(issue => issue.id)
        toDoBoard.items = [...newIssuesIds, ...toDoBoard.items]
        setBoardsState(newBoardsState)

    }, [currentRepo])

    const writeTime = (data) => {
        const timeDiff = timeTillNow(data)
        if (timeDiff === 0) {
            return 'opened today'
        }
        if (timeDiff === 1) {
            return 'opened yesterday'
        }
        return `opened ${timeDiff} ago`
    }

    const dragStartHandler = (e, issueId, boardIndex) => {
        setHeldIssueId(issueId)
        setStartBoardIndex(boardIndex)
    }

    const dragEndHandler = (e) => {
        e.preventDefault()
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
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
        storage.save(`${currentRepo.id}`, newBoardsState)
    }

    const dropCardHandler = (e, finishBoardIndex) => {
        e.preventDefault()

        if (boardsState[finishBoardIndex].items.includes(heldIssueId)) { return }

        const newBoardsState = [...boardsState]

        newBoardsState[finishBoardIndex].items.push(heldIssueId)

        const heldIssueIndex = boardsState[startBoardIndex].items.indexOf(heldIssueId)
        newBoardsState[startBoardIndex].items.splice(heldIssueIndex, 1)

        setBoardsState(newBoardsState)
        storage.save(`${currentRepo.id}`, newBoardsState)
    }

    const boardGap = (boardsState?.length - 1) * 20;


    return (
        <Box>
            <List className={css.boardWrapper}>
                {boardsState && boardsState.map((board, boardIndex) => (
                    <ListItem
                        style={{ width: `calc((100% - ${boardGap}px) / ${boardsState.length})` }}
                        className={css.board}
                        key={board.id}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, boardIndex)}
                    >
                        <Typography variant='h5' className={css.boardTitle}>
                            {board.title}
                        </Typography>
                        <div className={css.boardPaper}>
                            <List>
                                {board.items.length > 0 && board.items.map((issueId, index, arr) => {
                                    const cardContent = currentRepo.issues.find(issue => issue.id === issueId)
                                    if (!cardContent) {
                                        arr.splice(index, 1)
                                        return <></>
                                    }
                                    return (
                                        <ListItem key={issueId} sx={{ p: 0 }}
                                            className={css.issueCard}
                                            draggable={true}
                                            onDragStart={(e) => dragStartHandler(e, issueId, boardIndex)}
                                            onDragEnd={(e) => dragEndHandler(e)}
                                            onDragOver={(e) => dragOverHandler(e)}
                                            onDrop={(e) => dropHandler(e, issueId, boardIndex)}
                                        >
                                            <Card className={css.cardContent}>
                                                <Typography className={css.issueTitle} variant='subtitle1'>
                                                    {cardContent?.title}
                                                </Typography>
                                                <Box className={css.rowFlexBox} variant='string'>
                                                    <Typography  >#{cardContent.number}</Typography>
                                                    <Typography>
                                                        {writeTime(css.openedAt)}
                                                    </Typography>
                                                </Box>
                                                <Box className={css.rowFlexBox}>
                                                    <Typography>{cardContent.author}</Typography>
                                                    <Divider flexItem orientation="vertical" />
                                                    <Typography> Comments: {cardContent.comments} </Typography>
                                                </Box>
                                            </Card>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Box >
    )
}
