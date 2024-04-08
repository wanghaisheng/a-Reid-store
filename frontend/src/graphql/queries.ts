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
    $target: String
  ) {
    updateProduct(
      id: $id
      data: {
        isLiked: $isLiked
        isAddedToCart: $isAddedToCart
        size: $size
        color: $color
        cartCounter: $cartCounter
        target: $target
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
          target
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

export const PRODUCTS_ITEMS_COUNT = gql`
  query GetProductsItemsCount($isLiked: BooleanFilterInput, $isAddedToCart: BooleanFilterInput) {
    products(
      pagination: { limit: 100 }
      filters: { isLiked: $isLiked, isAddedToCart: $isAddedToCart }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;
