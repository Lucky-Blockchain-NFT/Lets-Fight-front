import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssetType, LoginStatusType, PackTemplateType, UserDataType, WalletEnum } from "../types";

export interface UserState {
    isLoggedIn: boolean,
    userData: UserDataType,
    packs: Array<AssetType>,
    fighters: Array<AssetType>,
    arsenal: Array<AssetType>,
    packTemplateList: Array<PackTemplateType>,
    dropsData: Array<any>,
    userLoginStatus: LoginStatusType | null,
}

const initialState: UserState = {
    isLoggedIn: false,
    userData: {
        loginType: WalletEnum.wax,
        accountName: '',
        anchorSession: {},
        waxSession: {},
        nickname: "",
        balance: '',
        email: ""
    },
    packs: [],
    fighters: [],
    arsenal: [],
    packTemplateList: [],
    dropsData: [],
    userLoginStatus: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state: UserState, action: PayloadAction<UserDataType>) => {
            state.userData = action.payload
            state.isLoggedIn = true
        },
        setPacks: (state: UserState, action: PayloadAction<any>) => {
            state.packs = action.payload
        },
        setArsenal: (state: UserState, action: PayloadAction<any>) => {
            state.arsenal = action.payload
        },
        setFighters: (state: UserState, action: PayloadAction<any>) => {
            state.fighters = action.payload
        },
        setIsLoggedIn: (state: UserState, action: PayloadAction<any>) => {
            state.isLoggedIn = action.payload
        },
        setPackTemplateList: (state: UserState, action: PayloadAction<any>) => {
            state.packTemplateList = action.payload
        },
        setDropsData: (state: UserState, action: PayloadAction<any>) => {
            state.dropsData = action.payload
        },
        setUserLoginStatusData: (state: UserState, action: PayloadAction<any>) => {
            state.userLoginStatus = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setUserData,
    setPacks,
    setArsenal,
    setFighters,
    setIsLoggedIn,
    setPackTemplateList,
    setDropsData,
    setUserLoginStatusData
} = userSlice.actions

export default userSlice.reducer