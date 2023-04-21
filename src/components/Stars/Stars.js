import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import separateThousands from 'utils/separateThousands';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {useTheme} from '@mui/material';
import css from './stars.module.css'

export default function Stars() {
    const currentRepo = useSelector(selectRepo)
    const [starsAmount, setStarsAmount] = useState()

    const { palette } = useTheme()

    useEffect(() => {
        const starsAmount = currentRepo.stars
        if (starsAmount !== null) {
            const decoratedStarsAmount = separateThousands(starsAmount)
            setStarsAmount(decoratedStarsAmount)
        }
    }, [currentRepo])

    return (
        <>
            {<Box className={css.rowFlexBox} >
                <StarRoundedIcon htmlColor={palette.primary.main}></StarRoundedIcon>
                <Typography >{starsAmount} stars</Typography>
            </Box>
            }
        </>
    )
}
