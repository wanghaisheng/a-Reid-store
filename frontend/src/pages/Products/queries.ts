import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(pagination: { limit: 16 }) {
      data {
        attributes {
          product_id
          name
          desc
          img
          price
          rating
          isLiked
        }
      }
    }
  }
`;
