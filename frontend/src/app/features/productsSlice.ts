import { gql, useQuery } from '@apollo/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  desc: string;
  img: string;
  thumbs: string[];
  price: number;
  isLiked: boolean;
};

export const getProducts = createAsyncThunk('products/getProducts', async (name, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:1337/graphql', {
      query: GET_PRODUCTS,
      variables: {},
    });
    //const response = await axios('http://localhost:1337/graphql');
    console.log('response: ', response); // data
    //const { loading, error, data } = useQuery(GET_PRODUCTS);
    /* await fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log(name); */
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    //const res = await axios(url);
    //return res.response;
    /* const apolloClient = initializeApollo();
    const request = await apolloClient.mutate({
      mutation: PRE_RENDER_LIST,
      variables: {},
    });
    const data = await request; */
    //console.log('data: ', data);
  } catch (err) {
    return thunkAPI.rejectWithValue('some thing went wrong!');
  }
});

type ProductsState = {
  products: Product[];
  loading: boolean;
};

const initialState: ProductsState = { products: [], loading: false };

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getAllProducts: () => {
      //const { loading, error, data } = useGetProducts();
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getProducts.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getProducts.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       console.log('state: ', state);
  //       console.log('payload: ', payload);
  //       //state.products = payload;
  //     })
  //     .addCase(getProducts.rejected, (state) => {
  //       state.loading = false;
  //     });
  // },
});

export const { getAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
