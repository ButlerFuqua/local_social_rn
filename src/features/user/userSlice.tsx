import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userToken: string | null,
    username: string | null,
    email: string | null,
}

const initialState: UserState = {
    userToken: null,
    username: null,
    email: null,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.userToken = action.payload
        },
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload
        },
        setEmail: (state, action: PayloadAction<string | null>) => {
            state.email = action.payload
        },
        clearUserData: (state) => {
            state.userToken = null
            state.username = null
            state.email = null
        },
    },
});

// Action creators are generated for each case reducer function
export const { clearUserData, setToken, setUsername, setEmail } = counterSlice.actions

export default counterSlice.reducer;