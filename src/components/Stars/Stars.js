import { Box, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
import css from "./stars.module.css"
import separateThousands from 'utils/separateThousands';
import StarRoundedIcon from '@mui/icons-material/StarRounded';


export default function Stars() {
    const currentRepo = useSelector(selectRepo)
    const [starsAmount, setStarsAmount] = useState()

    useEffect(() => {
        const starsAmount = currentRepo.stars

        if (starsAmount !== null) {
            const decoratedStarsAmount = separateThousands(starsAmount)
            setStarsAmount(decoratedStarsAmount)
        }

    }, [currentRepo])

    return (
        <>
            {currentRepo.stars &&
                <Box className='rowFlexBox'
                    sx={{ mb: 1 }}
                >
                    <StarRoundedIcon></StarRoundedIcon>
                    <Typography >{starsAmount} stars</Typography>
                </Box>
            }
        </>

    )
}
