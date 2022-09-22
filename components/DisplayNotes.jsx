import { Button, Pagination, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import React, { useMemo, useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { add_to_Redux } from '../REDUX/actionSlice'

import ShowNotes from './ShowNotes'


export default function DisplayNotes({ setvisible }) {

    const store = useSelector(x => x.notes);

    const { totalNotes: allnotes, totalCount } = store;

    const dispatch = useDispatch()

    const [btn, setbtn] = useState([])
    // console.log(btn)

    const fetchdata = useMemo(
        async () => {
            let { data } = await axios.get('/api/db/push')
            let { sendArray, total } = data

            dispatch(add_to_Redux({ sendArray, total }))
        },
        [])

    useEffect(() => {


        async function getTotal() {

            let { data } = await axios.get('/api/db/total')

            data = parseInt(data)
            console.log(parseInt((data / 6) + (data % 6 != 0 ? 1 : 0)))

            setbtn([...Array(parseInt((data / 6) + (data % 6 != 0 ? 1 : 0)))])

        }

        getTotal()

        // console.log(([...Array(parseInt(totalCount / 6) )]))
        // console.log(btn)

    }, [store.totalNotes])

    const changeNotes = async (number) => {


        let { data } = await axios.get('/api/db/' + number)
        let { sendArray, total } = data;
        // console.log(data)


        dispatch(add_to_Redux({ sendArray, total }))


    }







    return (
        <Container sx={{ minHeight: '60vh', backgroundColor: 'primary.dark', my: 2, borderRadius: '5px' }}>

            {/* pagination buttons */}

            <Box className='center' sx={{ py: 3, color: 'white' }}>
                {
                    // console.log(btn)
                    btn.map((x, idx) => {
                        return (
                            <Button onClick={() => changeNotes(idx)} sx={{ mx: 0.5 }} key={idx} color='success' variant='contained'>{idx + 1}</Button>
                        )
                    })
                }
            </Box>

            {/* display notes */}

            <Box sx={{ py: 3, px: 2, display: 'flex', flexWrap: 'wrap', }}>

                {allnotes.length > 0 ? allnotes.map((x, idx) => {
                    return <div key={idx}><ShowNotes setvisible={setvisible} note={x} /></div>
                }) : <Typography variant='h4' textAlign='center' sx={{ color: "common.white" }}>No notes found..</Typography>}

            </Box>

        </Container>
    )
}
