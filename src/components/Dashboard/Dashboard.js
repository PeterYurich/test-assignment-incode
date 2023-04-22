import React, { useEffect, useState } from 'react'
import css from "./dashboard.module.css"
import { Typography, Box, List, ListItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import storage from 'utils/storage'
import { IssueCard } from 'components'


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

    const dragOverHandler = (e) => {
        e.preventDefault()
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
                        <Box className={css.boardPaper}>

                            <List>
                                {board.items.length > 0 && board.items.map((issueId, index, arr) => {
                                    const cardContent = currentRepo.issues.find(issue => issue.id === issueId)
                                    if (!cardContent) {
                                        arr.splice(index, 1)
                                        return <></>
                                    }
                                    return (
                                        <IssueCard key={issueId}
                                            content={cardContent}
                                            boardIndex={boardIndex}
                                            issueId={issueId}
                                            boardsState={boardsState}
                                            setBoardsState={setBoardsState}
                                            heldIssueId={heldIssueId}
                                            setHeldIssueId={setHeldIssueId}
                                            startBoardIndex={startBoardIndex}
                                            setStartBoardIndex={setStartBoardIndex}
                                        />
                                    )
                                })}
                            </List>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box >
    )
}
