
import { useSelector, useDispatch } from 'react-redux'
import { update_TotalNotes, update_Current_Note } from '../REDUX/actionSlice'

import { PushPinOutlined } from '@mui/icons-material'
import { Box, Button, Container, Modal, styled, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'




const MyInput = styled('input')({
    height: '7vh',
    width: '100%',
    border: "1.5px solid grey",
    outline: 'none',
    '&:hover': {
        border: '1.5px solid black'
    },
    '&:focus': {
        border: '1.5px solid #4ba598'
    },
    borderRadius: '5px',
    margin: '5px 0',
    padding: '0 5px',
    fontSize: '15px'
})


export default function EditNote({ visible, setvisible }) {


    const store = useSelector(x => x.notes)

    let dispatch = useDispatch()


    const [title, settitle] = useState('')
    const [body, setbody] = useState('')
    const [pinned, setpinned] = useState(false)


    useEffect(() => {

        settitle(store.currentNote.title)
        setbody(store.currentNote.body)
        setpinned(store.currentNote.pinned)

    }, [store.currentNote])


    // console.log(store)





    const handleClick = async () => {

        let date = new Date().getTime()

        // console.log(title, body, pinned)

        let { data } = await axios.put('/api/db/push', {
            _id: store.currentNote._id, title, body, pinned, updatedAt: date
        })

        // console.log(data)

        dispatch(update_TotalNotes({ _id: store.currentNote._id, title, body, pinned, updatedAt: date }))
        settitle('')
        setbody('')
        setpinned(false)

    }



    const setbackground = () => {
        if (pinned) return 'gray'
        return 'white'

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px'
    };







    return (
        <div>
            <Modal
                open={visible}
                onClose={() => setvisible(!visible)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign={'center'} sx={{ py: 1 }} color='primary.dark' id="modal-modal-title" variant="h6" component="h2">
                        Edit Note
                    </Typography>
                    <Container sx={{ display: 'flex', justifyContent: 'center', py: 2, flexDirection: 'column' }}>

                        <Box className='center' sx={{ width: '100%', flexDirection: 'column' }}>

                            <MyInput value={title} onChange={(e) => settitle(e.target.value)} />
                            <MyInput value={body} onChange={(e) => setbody(e.target.value)} />

                        </Box>


                        <Box onClick={() => setpinned(!pinned)} sx={[{ cursor: 'pointer', my: 1, width: '15%', py: 1, borderRadius: '50%', backgroundColor: setbackground() }, { '&:hover': { backgroundColor: "gray" } }]} className='center'>
                            <PushPinOutlined />
                        </Box>


                        <Button onClick={() => handleClick()} variant='outlined'  >Save</Button>
                    </Container>
                </Box>
            </Modal>
        </div>
    )
}
