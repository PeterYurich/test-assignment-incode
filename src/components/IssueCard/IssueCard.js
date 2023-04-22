import React from 'react'
import css from './IssueCard.module.css'
import 'commonStyles.css'
import { Card, Divider, Typography, ListItem, Box } from '@mui/material'
import storage from 'utils/storage'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import { timeTillNow } from 'utils/timeTillNow'
import PropTypes from 'prop-types';


export default function IssueCard({ content, boardIndex, issueId,
    boardsState, setBoardsState, heldIssueId, setHeldIssueId,
    startBoardIndex, setStartBoardIndex }) {
    const currentRepo = useSelector(selectRepo)


    const dragStartHandler = (issueId, boardIndex) => {
        setHeldIssueId(issueId)
        setStartBoardIndex(boardIndex)
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

    const writeTime = (data) => {
        const timeDiff = timeTillNow(data)
        if (timeDiff === 0) {
            return 'opened today'
        }
        if (timeDiff === 1) {
            return 'opened yesterday'
        }
        return `opened ${timeDiff} days ago`
    }

    const { title, number, openedAt, author, comments } = content


    return (
        <ListItem key={issueId} sx={{ p: 0 }}
            className={css.issueCard}
            draggable={true}
            onDragStart={() => dragStartHandler(issueId, boardIndex)}
            onDrop={(e) => dropHandler(e, issueId, boardIndex)}
        >
            <Card className={css.cardContent}>
                <Typography className={css.issueTitle} variant='subtitle1'>
                    {title}
                </Typography>
                <Box className='rowFlexBox' variant='string'>
                    <Typography  >#{number}</Typography>
                    <Typography data-testid='time'>
                        {writeTime(openedAt)}
                    </Typography>
                </Box>
                <Box className='rowFlexBox'>
                    <Typography>{author}</Typography>
                    <Divider flexItem orientation="vertical" />
                    <Typography> Comments: {comments} </Typography>
                </Box>
            </Card>
        </ListItem>
    )
}

IssueCard.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        openedAt: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        comments: PropTypes.number.isRequired
    }).isRequired,
    boardIndex: PropTypes.number.isRequired,
    issueId: PropTypes.number.isRequired,
    boardsState: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    })).isRequired,
    setBoardsState: PropTypes.func.isRequired,
    heldIssueId: PropTypes.number,
    setHeldIssueId: PropTypes.func.isRequired,
    startBoardIndex: PropTypes.number,
    setStartBoardIndex: PropTypes.func.isRequired
}