import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeAddNote } from '../REDUX/actionSlice'

export default function Header() {

    const note = useSelector(x => x.notes)
    const dispatch = useDispatch()
    const handleClick = () => dispatch(changeAddNote(!note.addNote));


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                {/* <Menu /> */}
                            </IconButton>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                TODO LIST
                            </Typography>
                            <Button sx={[{ backgroundColor: 'primary.main', color: 'white', border: '1px solid white' }, { '&:hover': { border: '1px solid white' } }]} onClick={()=>handleClick()} variant='outlined'>ADD NOTE</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    )
}
