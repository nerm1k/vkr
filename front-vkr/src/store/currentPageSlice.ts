import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentPage = number;

const initialCurrentPage: CurrentPage = 1;

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: initialCurrentPage,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<CurrentPage>) => state = action.payload
    }
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;