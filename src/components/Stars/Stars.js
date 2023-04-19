import { Box, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRepo } from 'redux/repo/repoSelectors'
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
            {<Box className='rowFlexBox' >
                <StarRoundedIcon></StarRoundedIcon>
                <Typography >{starsAmount} stars</Typography>
            </Box>
            }
        </>

    )
}
