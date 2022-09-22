import { createSlice } from "@reduxjs/toolkit"


const initial = {

    totalNotes: [
        {
            id: 1,
            title: 'Title1',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veniam a vel omnis unde, labore minus. Aspernatur quibusdam qui cupiditate cumque officia, quidem reiciendis atque saepe fugiat enim perspiciatis incidunt reprehenderit obcaecati rem mollitia facere. Nobis recusandae nostrum accusamus expedita at explicabo reiciendis nesciunt ex architecto esse eligendi tempore quam doloremque ut itaque velit maxime harum animi, hic assumenda quas tempora ipsa. Aperiam, dignissimos repellat adipisci quo tempora animi qui iusto excepturi dolorem voluptatem in odit, voluptas unde at dolore! Delectus alias et libero ipsum debitis rem excepturi vero officiis, ut quaerat, sequi non odit! Quis sint ut voluptates accusamus dolor, facere suscipit iure molestias eius, dicta non! Perferendis sed illo facere tenetur, vero provident maxime sequi asperiores praesentium, accusamus, possimus voluptatibus deleniti iure voluptas dolore et beatae corrupti magnam aliquam ipsam odio? Nihil explicabo consequatur perferendis similique assumenda doloribus ducimus repellendus harum minima fugiat quos id doloremque, quam nemo?',
            pinned: false
        },
        {
            id: 2,
            title: 'Title2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, exercitationem! Nihil amet vel vero quam deleniti ea aliquam minima ad?',
            pinned: true
        },

    ],

    totalCount: 0,

    currentNote: { id: 0, title: '', body: '' },    //edit button
    addNote: false,
    is_editible: false
}



const actionSlice = createSlice({
    name: 'notes',
    initialState: initial,


    reducers: {

        add_to_Redux: (state, action) => {
            // console.log(action.payload)
            state.totalNotes = [...action.payload.sendArray]
            state.totalCount = parseInt(action.payload.total)
        },

        addNote: (state, action) => {

            let pinned = state.totalNotes.filter(x => x.pinned == true)
            let normal = state.totalNotes.filter(x => x.pinned == false)

            state.totalNotes = [...pinned, action.payload, ...normal].slice(0, 6)

        },

        update_TotalNotes: (state, action) => {

            // console.log(action.payload)

            let updatedArray = state.totalNotes.filter(x => {
                if (x._id == action.payload._id) {
                    x.title = action.payload.title,
                        x.body = action.payload.body,
                        x.pinned = action.payload.pinned,
                        x.updatedAt = action.payload.updatedAt
                }
                return x
            })

            let pinned = updatedArray.filter(x => x.pinned == true)
            let normal = updatedArray.filter(x => x.pinned == false)

            state.totalNotes = [...pinned, ...normal].slice(0, 6)


        },

        changeCurrentNote: (state, action) => {

            // console.log(action)

            let updatedNote = action.payload
            state.totalNotes = state.totalNotes.map(x => {
                if (x.id == updatedNote.id) {
                    return updatedNote
                }
                else {
                    return x
                }
            })

        },

        update_Current_Note: (state, action) => {

            state.currentNote = action.payload.note

        },

        changeAddNote: (state, action) => {

            state.addNote = action.payload
        },


        remove: (state, action) => {

            state.totalNotes = state.totalNotes.filter(x => x._id != action.payload._id)
        },

        reset: (state, action) => {
            state = initial;
        }


    }
})


export const { add_to_Redux, addNote, update_TotalNotes, changeCurrentNote, update_Current_Note, changeAddNote, remove, reset } = actionSlice.actions
export default actionSlice.reducer