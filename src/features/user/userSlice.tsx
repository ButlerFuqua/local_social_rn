import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userToken: string | null,
}

const initialState: UserState = {
    userToken: null,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.userToken = action.payload
        },
        clearToken: (state) => {
            state.userToken = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { clearToken, setToken } = counterSlice.actions

export default counterSlice.reducer