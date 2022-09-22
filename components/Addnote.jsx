import { PushPinOutlined, SettingsApplicationsOutlined } from '@mui/icons-material'
import { Button, Container, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addNote, changeAddNote } from '../REDUX/actionSlice'

function Addnote() {

    const note = useSelector(x => x.notes)
    const dispatch = useDispatch()

    const [title, settitle] = useState('')
    const [body, setbody] = useState('')
    const [pinned, setpinned] = useState(false)

    // console.log(pinned)

    const handleClose = () => dispatch(changeAddNote(!note.addNote));

    const handleClick = async () => {




        if (title.length > 3 && body.length > 5) {


            try {

                let date = new Date().getTime()
                // console.log(date)
                let response = await axios.post('/api/db/push', {

                    title,
                    body,
                    pinned,
                    updatedAt: date
                })

                console.log(response)

            } catch (error) {

                console.log(error)
            }


            dispatch(addNote({ title, body, pinned }))


            setTimeout(() => {

                settitle('')
                setbody('')
                setpinned(false)
            }, 500);
        }


    }



    const getBackground = () => {
        if (pinned) return 'gray'
        // else return 'white'
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
        <>
            <div>
                <Modal
                    open={note.addNote}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography textAlign={'center'} sx={{ py: 1 }} color='primary.dark' id="modal-modal-title" variant="h6" component="h2">
                            Add Note
                        </Typography>
                        <Container sx={{ display: 'flex', justifyContent: 'center', py: 2, flexDirection: 'column' }}>

                            <TextField
                                id="outlined-password-input"
                                label="Title"
                                type="text"
                                autoComplete="current-password"
                                sx={{ my: 1 }}
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Your note"
                                multiline
                                rows={4}
                                defaultValue=""
                                value={body}
                                onChange={(e) => setbody(e.target.value)}
                            />

                            <Box sx={[{ cursor: 'pointer', my: 1, width: '15%', py: 1, borderRadius: '50%', backgroundColor: getBackground() }, { '&:hover': { backgroundColor: "gray" } }]} onClick={() => setpinned(!pinned)} className='center'>
                                <PushPinOutlined />
                            </Box>


                            <Button variant='outlined' onClick={() => handleClick()}>Save</Button>
                        </Container>
                    </Box>
                </Modal>
            </div>
        </>
    )
}


export default React.memo(Addnote)