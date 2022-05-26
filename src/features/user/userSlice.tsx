import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userToken: string | null,
    username: string | null,
    email: string | null,
    userId: string | null,
}

const initialState: UserState = {
    userToken: null,
    username: null,
    email: null,
    userId: null,
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
        setUserId: (state, action: PayloadAction<string | null>) => {
            state.userId = action.payload
        },
        clearUserData: (state) => {
            state.userToken = null
            state.username = null
            state.email = null
        },
    },
});

// Action creators are generated for each case reducer function
export const { clearUserData, setToken, setUsername, setEmail, setUserId} = counterSlice.actions

export default counterSlice.reducer;