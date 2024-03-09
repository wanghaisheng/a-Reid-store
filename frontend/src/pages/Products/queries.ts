import { gql } from '@apollo/client';

// export const GET_PRODUCTS = gql`
//   query GetProducts($limit: Int, $name: String, $categoryId: IDFilterInput) {
//     products(
//       pagination: { limit: $limit }
//       sort: "id:asc"
//       filters: { name: { contains: $name }, categories: { id: { in: [$categoryId] } } }
//     ) {
//       data {
//         id
//         __typename
//         attributes {
//           name
//           desc
//           img
//           price
//           rating
//           isLiked
//           categories
//         }
//       }
//       meta {
//         pagination {
//           page
//           pageSize
//           total
//           pageCount
//         }
//       }
//     }
//   }
// `;

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
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $isLiked: Boolean) {
    updateProduct(id: $id, data: { isLiked: $isLiked }) {
      data {
        id
        attributes {
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
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGINATION = gql`
  query GetProducts($categoryId: ID!, $limit: Int) {
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
