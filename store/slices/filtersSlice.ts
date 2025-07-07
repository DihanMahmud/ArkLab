import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types/agent';

const initialState: FilterState = {
  search: '',
  statuses: [],
  categories: [],
  pricingModel: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStatuses: (state, action: PayloadAction<string[]>) => {
      state.statuses = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setPricingModel: (state, action: PayloadAction<string>) => {
      state.pricingModel = action.payload;
    },
    clearFilters: (state) => {
      state.search = '';
      state.statuses = [];
      state.categories = [];
      state.pricingModel = '';
    },
  },
});

export const { setSearch, setStatuses, setCategories, setPricingModel, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;