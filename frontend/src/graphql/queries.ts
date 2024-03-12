import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($isLiked: Boolean, $isAddedToCart: Boolean) {
    products(
      filters: { isLiked: { eq: $isLiked }, isAddedToCart: { eq: $isAddedToCart } }
      pagination: { limit: 50 }
    ) {
      data {
        id
        __typename
        attributes {
          name
          desc
          img
          price
          rating
          isLiked
          isAddedToCart
          size
          color
          cartCounter
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      data {
        id
        __typename
        attributes {
          name
          desc
          img
          price
          rating
          isLiked
          isAddedToCart
          size
          color
          cartCounter
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $isLiked: Boolean
    $isAddedToCart: Boolean
    $size: String
    $color: String
    $cartCounter: Int
  ) {
    updateProduct(
      id: $id
      data: {
        isLiked: $isLiked
        isAddedToCart: $isAddedToCart
        size: $size
        color: $color
        cartCounter: $cartCounter
      }
    ) {
      data {
        id
        attributes {
          name
          desc
          img
          price
          rating
          isLiked
          isAddedToCart
          size
          color
          cartCounter
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          categoryName
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!, $limit: Int, $name: String) {
    category(id: $id) {
      data {
        id
        attributes {
          categoryName
          products(
            filters: { name: { contains: $name } }
            pagination: { limit: $limit }
            sort: "id:asc"
          ) {
            data {
              id
              __typename
              attributes {
                name
                desc
                img
                price
                rating
                isLiked
                isAddedToCart
                size
                color
                cartCounter
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGINATION = gql`
  query GetPagination($categoryId: ID!, $limit: Int) {
    products(
      pagination: { limit: $limit }
      filters: { categories: { id: { in: [$categoryId] } } }
    ) {
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;
