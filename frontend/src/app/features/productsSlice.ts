import { createSlice } from '@reduxjs/toolkit';
import { ApolloError } from '@apollo/client';
import { ProductEntity } from '../../gql/graphql';

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

type ProductsState = {
  loading: boolean;
  error: ApolloError | undefined;
  products: ProductEntity[];
  categoryId: string;
  pagination: Pagination;
};

const initialState: ProductsState = {
  loading: true,
  error: undefined,
  products: [],
  categoryId: '1',
  pagination: {
    page: 0,
    pageSize: 0,
    total: 0,
    pageCount: 0,
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsQuery: (state, action) => {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.products = action.payload.products;
      state.categoryId = action.payload.categoryId;
      state.pagination = action.payload.pagination;
    },
  },
});

export const { setProductsQuery } = productsSlice.actions;
export default productsSlice.reducer;
