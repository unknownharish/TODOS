import { DeleteSweepOutlined, DriveFileRenameOutlineOutlined, PushPinOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { update_Current_Note, remove } from '../REDUX/actionSlice'


export default function ShowNotes({ setvisible, note }) {

    const dispatch = useDispatch()
    const handleClick = () => {

        setvisible(true)
        dispatch(update_Current_Note({ status: true, 'note': note }));
    }

    const removeNote = async () => {

        try {
            let { data } = await axios.delete('/api/db/remove', {
                data: { _id: note._id }
            })
            // console.log(data)

        } catch (error) {
            console.error(error)
        }

        dispatch(remove({ ...note }))

    }



    return (
        <Card sx={{ minWidth: {md:340,sm:'70vw'}, maxWidth: {md:345,sm:'70vw'}, m: 1, height: '36vh' }}>
            <Box sx={{ height: '3vh' }}>

                {note.pinned && <PushPinOutlined />}
            </Box>
            <CardContent>

                <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: 'red', mx: 1 }} aria-label="recipe">
                        {note.title.slice(0, 1)}
                    </Avatar>
                    {note.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '10vh', py: 2 }}>
                    {note.body.length > 140 ? note.body.slice(0, 140) + '...' : note.body}
                </Typography>
            </CardContent>
            <CardActions sx={{ dispay: 'flex', justifyContent: 'space-around', my: 1 }}>
                <Button size="small" variant='contained' title='Edit this note' onClick={() => handleClick()} >
                    <DriveFileRenameOutlineOutlined />
                </Button>
                <Button size="small" variant='contained' title='Delete' onClick={() => removeNote()}>
                    <DeleteSweepOutlined />
                </Button>
            </CardActions>
        </Card>
    )
}
