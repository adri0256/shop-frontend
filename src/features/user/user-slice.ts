import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserGroup {
    uuid: string;
    gid: number;
    name: string;
    description: string;
}

interface UserState {
    uuid: string;
    email: string;
    dName: string;
    profilePic: string;
    groups: UserGroup[];
    isLoggedIn: boolean;
    rememberMe: boolean;
    jwt: string;
}

const initialState: UserState = {
    uuid: '',
    email: '',
    dName: '',
    profilePic: '',
    groups: [],
    isLoggedIn: false,
    rememberMe: false,
    jwt: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state: UserState, action: PayloadAction<UserState>) {
            const { uuid, email, dName, profilePic, groups, rememberMe, jwt } = action.payload;
            state.uuid = uuid;
            state.email = email;
            state.dName = dName;
            state.profilePic = profilePic;
            state.groups = groups;
            state.isLoggedIn = true;
            state.rememberMe = rememberMe;
            state.jwt = jwt;
        },
        logout(state: UserState) {
            state.uuid = '';
            state.email = '';
            state.dName = '';
            state.profilePic = '';
            state.groups = [];
            state.isLoggedIn = false;
            state.rememberMe = false;
            state.jwt = '';
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;