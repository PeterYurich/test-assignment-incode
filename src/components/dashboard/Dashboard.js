import React, { useEffect, useState } from 'react'
import css from "./dashboard.module.css"
import { Paper, Typography, Box, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import storage from 'utils/storage'

export default function Dashboard() {
    const currentRepo = useSelector(selectRepo)
    const [allRepoBoards] = useState(storage.load('allRepoBoards') || [])
    const [boardsState, setBoardsState] = useState([
        { id: 1, title: 'To Do', items: [] },
        { id: 2, title: 'In Progress', items: [1667358069] },
        { id: 3, title: 'Done', items: [1673582916] }
    ])

    const [toDoCards, setToDoCards] = useState([])
    const [inProgressCards, setInProgressCards] = useState([])
    const [doneCards, setDoneCards] = useState([])

    const [heldCard, setHeldCard] = useState()

    useEffect(() => {
        const toDoItems = currentRepo.issues.map((issue, index) => issue.id)

        const newBoardsState = [...boardsState]
        // const toDoIndex = newBoardsState.indexOf(board => board.title === "To Do")
        newBoardsState[0].items = toDoItems

        setBoardsState(newBoardsState)

        const currentRepoBoards = {
            repoId: currentRepo.id,
            boardsState
        }
        console.log('currentRepoBoards: ', currentRepoBoards);
        storage.save('allRepoBoards', [currentRepoBoards, ...allRepoBoards])

    }, [currentRepo, allRepoBoards])

    useEffect(() => {
        if (currentRepo && boardsState[0].items.length > 0) {
            // const toDoContent = new Set(boardsState[0].items.map(issue => issue.id));
            const toDoCards = currentRepo.issues.filter(issue => boardsState[0].items.includes(issue.id));
            setToDoCards(toDoCards)
        }
        if (currentRepo && boardsState[1].items.length > 0) {
            // const inProgressContent = new Set(boardsState[1].items.map(issue => issue.id));
            const inProgressCards = currentRepo.issues.filter(issue => boardsState[1].items.includes(issue.id));
            setInProgressCards(inProgressCards)
        }
        if (currentRepo && boardsState[2].items.length > 0) {
            // const doneContent = new Set(boardsState[2].items.map(issue => issue.id));
            const doneCards = currentRepo.issues.filter(issue => boardsState[2].items.includes(issue.id));
            setDoneCards(doneCards)
        }


    }, [currentRepo, boardsState])


    const dragStartHandler = (e, issue) => {
        setHeldCard(issue)
    }
    const dragLeaveHandler = (e) => {
        e.target.style.background = 'white'

    }

    const dragEndHandler = (e) => {
        e.preventDefault()
    }

    const dragOverHandler = (e, issue) => {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    const dropHandler = (e, issue) => {
        e.preventDefault()
    }

    return (
        <Box>
            <Paper className={css.mainBoard} elevation={3} >
                {boardsState.map(board => (
                    <Paper className={css.taskBoard} key={board.id} >
                        <Typography variant='h5'
                            className={css.boardTitle}>{board.title}
                        </Typography>
                        {
                            currentRepo.issues.map(issue => (
                                board.items.includes(issue.id) &&
                                <Paper className={css.issueCard} key={issue.id}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, issue)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, issue)}
                                >
                                    <Typography className={css.issueTitle}>
                                        {issue.title}
                                    </Typography>
                                    <Box className={css.rowFlexBox}>
                                        <Typography>#{issue.number}</Typography>
                                        <Typography>{issue.openedAt}</Typography>
                                    </Box>
                                    <Box className={css.rowFlexBox}>
                                        <Typography>{issue.author}</Typography>
                                        <Divider flexItem orientation="vertical" />
                                        <Typography> Comments: {issue.comments} </Typography>
                                    </Box>
                                </Paper>
                            ))
                        }
                    </Paper>
                ))}
                {/* <div>
                    <Paper className={css.taskBoard}>
                        <Typography variant='h5'
                            className={css.boardTitle}>To Do
                        </Typography>
                        {toDoCards && toDoCards.length > 0 &&
                            toDoCards.map(issue => (
                                <div className={css.issueCardWrapper} key={issue.id}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, issue)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, issue)}
                                >
                                    <Paper className={css.issueCard}>
                                        <Typography className={css.issueTitle}>
                                            {issue.title}
                                        </Typography>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>#{issue.number}</Typography>
                                            <Typography>{issue.openedAt}</Typography>
                                        </Box>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>{issue.author}</Typography>
                                            <Divider flexItem orientation="vertical" />
                                            <Typography> Comments: {issue.comments} </Typography>
                                        </Box>
                                    </Paper>
                                </div>
                            ))}
                    </Paper>
                    <Paper className={css.taskBoard}>
                        <Typography variant='h5'
                            className={css.boardTitle}>In Progress
                        </Typography>
                        {inProgressCards && inProgressCards.length > 0 &&
                            inProgressCards.map(issue => (
                                <div className={css.issueCardWrapper} key={issue.id}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, issue)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, issue)}
                                >
                                    <Paper className={css.issueCard}>
                                        <Typography className={css.issueTitle}>
                                            {issue.title}
                                        </Typography>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>#{issue.number}</Typography>
                                            <Typography>{issue.openedAt}</Typography>
                                        </Box>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>{issue.author}</Typography>
                                            <Divider flexItem orientation="vertical" />
                                            <Typography> Comments: {issue.comments} </Typography>
                                        </Box>
                                    </Paper>
                                </div>
                            ))}

                    </Paper>
                    <Paper className={css.taskBoard}>
                        <Typography variant='h5'
                            className={css.boardTitle}>Done
                        </Typography>
                        {doneCards && doneCards.length > 0 &&
                            doneCards.map(issue => (
                                <div className={css.issueCardWrapper} key={issue.id}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, issue)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, issue)}
                                >
                                    <Paper className={css.issueCard}>
                                        <Typography className={css.issueTitle}>
                                            {issue.title}
                                        </Typography>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>#{issue.number}</Typography>
                                            <Typography>{issue.openedAt}</Typography>
                                        </Box>
                                        <Box className={css.rowFlexBox}>
                                            <Typography>{issue.author}</Typography>
                                            <Divider flexItem orientation="vertical" />
                                            <Typography> Comments: {issue.comments} </Typography>
                                        </Box>
                                    </Paper>
                                </div>
                            ))}

                    </Paper>
                </div> */}
            </Paper>
        </Box>
    )
}
