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
          size
          color
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
          size
          color
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
                size
                color
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

export const GET_ORDERS = gql`
  query GetOrders($userId: String!) {
    orders(
      filters: { userId: { eq: $userId }, customOrderId: { notNull: true } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          amount
          items
          stripeId
          userId
          customOrderId
          createdAt
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

export const GET_USER_WISHLIST = gql`
  query GetUserWishlist($userId: IDFilterInput) {
    wishlists(filters: { users_permissions_user: { id: $userId } }) {
      data {
        id
        attributes {
          products {
            data {
              id
              attributes {
                name
                desc
                img
                price
                size
                color
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_USER_WISHLIST = gql`
  mutation CreateWishlist($data: WishlistInput!) {
    createWishlist(data: $data) {
      data {
        id
        attributes {
          products {
            data {
              id
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_WISHLIST = gql`
  mutation UpdateWishlist($id: ID!, $data: WishlistInput!) {
    updateWishlist(id: $id, data: $data) {
      data {
        id
        attributes {
          products {
            data {
              id
              attributes {
                name
                desc
                img
                price
                size
                color
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_CART = gql`
  query GetUserCart($userId: IDFilterInput) {
    carts(filters: { users_permissions_user: { id: $userId } }) {
      data {
        id
        attributes {
          cart_products(filters: { users_permissions_user: { id: $userId } }) {
            data {
              id
              attributes {
                users_permissions_user {
                  data {
                    id
                    attributes {
                      email
                    }
                  }
                }
                productId
                name
                size
                color
                cartCounter
                img
                price
                cart {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_USER_CART = gql`
  mutation CreateCart($data: CartInput!) {
    createCart(data: $data) {
      data {
        id
        attributes {
          cart_products {
            data {
              id
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_CART = gql`
  mutation UpdateCart($id: ID!, $data: CartInput!, $userId: IDFilterInput) {
    updateCart(id: $id, data: $data) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
              attributes {
                email
                username
              }
            }
          }
          cart_products(filters: { users_permissions_user: { id: $userId } }) {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART_PRODUCT = gql`
  mutation CreateCartProduct($data: CartProductInput!) {
    createCartProduct(data: $data) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
              attributes {
                email
              }
            }
          }
          productId
          name
          size
          color
          cartCounter
          img
          price
          cart {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_PRODUCT = gql`
  mutation UpdateCartProduct($id: ID!, $data: CartProductInput!) {
    updateCartProduct(id: $id, data: $data) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
          productId
          name
          size
          color
          cartCounter
          cart {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const DELETE_CART_PRODUCT = gql`
  mutation DeleteCartProduct($id: ID!) {
    deleteCartProduct(id: $id) {
      data {
        id
        attributes {
          name
          productId
        }
      }
    }
  }
`;
