
import { configureStore } from '@reduxjs/toolkit'
import reducer from './actionSlice'


export const store = configureStore({

    reducer: {
        notes: reducer
    }
})
